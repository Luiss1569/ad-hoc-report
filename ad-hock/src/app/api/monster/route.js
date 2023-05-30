import { NextResponse, NextRequest } from "next/server";
import pgConnection from "../../../database";

export async function POST(req) {
  const conn = null;
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");
  const body = await req.json();
  const { sorts, columns, filters } = body;

  try {
    const conn = await pgConnection.connect();

    const where = convertToSequelize(filters);
    console.log(where);

    const result = await conn.models.monsters.findAndCountAll({
      attributes: ["id", "name"],
      where,
      limit: limit || 10,
      offset: page || 0,
      include: [
        {
          model: conn.models.actions,
          attributes: ["name", "description"],
          as: "actions",
        },
      ],
    });

    const data = {
      count: result.count,
      page: page || 0,
      limit: limit || 10,
      data: result.rows,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.log(err.message);
    return NextResponse.error(
      {
        error: err.message,
      },
      { status: 500 }
    );
  } finally {
    await pgConnection.disconnect(conn);
  }
}


const { Op } = require("sequelize");

function convertToSequelize(filters) {
  function processFilter(filter) {
    const { field, operator, value } = filter;
    const sequelizeCondition = convertOperatorToSequelize(operator, field.field, value);

    return sequelizeCondition;
  }

  function convertOperatorToSequelize(operator, field, value) {
    switch (operator) {
      case "contains":
        return { [field]: { [Op.like]: `%${value}%` } };
      case "starts with":
        return { [field]: { [Op.like]: `${value}%` } };
      case "ends with":
        return { [field]: { [Op.like]: `%${value}` } };
      case "not contains":
        return { [field]: { [Op.notLike]: `%${value}%` } };
      case "=":
        return { [field]: { [Op.eq]: value } };
      case "!=":
        return { [field]: { [Op.ne]: value } };
      case ">":
        return { [field]: { [Op.gt]: value } };
      case "<":
        return { [field]: { [Op.lt]: value } };
      case ">=":
        return { [field]: { [Op.gte]: value } };
      case "<=":
        return { [field]: { [Op.lte]: value } };
      default:
        return null;
    }
  }

  function processGroup(group) {
    const groupConditions = [];

    group.forEach((filter) => {
      if (Array.isArray(filter)) {
        groupConditions.push(processGroup(filter));
      } else {
        groupConditions.push(processFilter(filter));
      }
    });

    const groupLogic = group[0].logic.toLowerCase();
    return { [Op[groupLogic]]: groupConditions };
  }

  const conditions = [];

  filters.forEach((filter) => {
    if (Array.isArray(filter)) {
      conditions.push(processGroup(filter));
    } else {
      conditions.push(processFilter(filter));
    }
  });

  const {logic} = filters[0];

  return conditions.length > 1 ? { [Op[logic]]: conditions } : conditions[0];
}