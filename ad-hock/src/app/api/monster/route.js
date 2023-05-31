import { NextResponse } from "next/server";
import pgConnection from "../../../database";

export async function POST(req) {
  const conn = null;
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");
  const body = await req.json();
  const { filters, columns, sorts } = body;

  try {
    const conn = await pgConnection.connect();

    if (!Object.keys(columns).length) {
      const error = {
        message: "Select at least one column",
        code: 400,
      };

      throw error;
    }

    const where = convertFilterToSequelize(filters?.[0]);
    const order = sorts.map(([column, order]) => {
      const table = column.split(".")[0];
      const field = column.split(".")[1];

      if (table === "monsters") {
        return [field, order];
      }

      return [conn.models?.[table], field, order];
    });

    const result = await conn.models.monsters.findAndCountAll({
      attributes: columns?.monsters || [],
      where,
      include: [
        {
          model: conn.models.actions,
          attributes: columns?.actions || [],
          as: "actions",
        },
        {
          model: conn.models.reactions,
          attributes: columns?.reactions || [],
          as: "reactions",
        },
        {
          model: conn.models.skills,
          attributes: columns?.skills || [],
          as: "skill",
        },
        {
          model: conn.models.speed,
          attributes: columns?.speed || [],
          as: "speed",
        },
        {
          model: conn.models.legendary_actions,
          attributes: columns?.legendary_actions || [],
          as: "legendary_actions",
        },
        {
          model: conn.models.special_abilities,
          attributes: columns?.special_abilities || [],
          as: "special_abilities",
        },
        {
          model: conn.models.spells_list,
          attributes: columns?.spells_list || [],
          as: "spells_lists",
        },
      ],
      subQuery: false,
      order,
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
    return NextResponse.json(
      {
        error: true,
        message: err.message,
      },
      { status: err.code || 500 }
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
