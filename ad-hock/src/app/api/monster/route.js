import { NextResponse } from "next/server";
import pgConnection from "../../../database";

export async function POST(req) {
  const conn = null;
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");
  const body = await req.json();
  const { sorts, columns, filters } = body;

  try {
    const conn = await pgConnection.connect();

    const where = convertFilterToSequelize(filters?.[0]);

    const result = await conn.models.monsters.findAndCountAll({
      attributes: ["id", "name"],
      where,
      include: [
        {
          model: conn.models.actions,
          attributes: ["name", "description"],
          as: "actions",
        },
        {
          model: conn.models.reactions,
          attributes: ["name", "description"],
          as: "reactions",
        },
        {
          model: conn.models.skills,
          attributes: [],
          as: "skill",
        },
        {
          model: conn.models.speed,
          attributes: [],
          as: "speed",
        },
        {
          model: conn.models.legendary_actions,
          attributes: ["name", "description"],
          as: "legendary_actions",
        },
        {
          model: conn.models.special_abilities,
          attributes: ["name", "description"],
          as: "special_abilities",
        },
        {
          model: conn.models.spells_list,
          attributes: ["name", "description"],
          as: "spells_lists",
        },
      ],
      subQuery: false,
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
  }
}

const { Op } = require("sequelize");

function convertOperatorToSequelize(operator, field, value) {
  field = `$${field}$`;

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

const convertFilterToSequelize = (filter) => {
  const { logic, data } = filter;

  const subQuery = data.map((subFilter) => {
    if (subFilter.groupId) {
      return convertFilterToSequelize(subFilter);
    } else {
      const { field, operator, value } = subFilter;
      const convertedOperator = convertOperatorToSequelize(
        operator,
        field.value,
        value
      );
      return convertedOperator;
    }
  });

  return logic === "or" ? { [Op.or]: subQuery } : { [Op.and]: subQuery };
};