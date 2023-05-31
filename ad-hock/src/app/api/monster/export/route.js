import { NextResponse } from "next/server";

import pgConnection from "../../../../database";
import Monster from "../../../../database/dao/monster";
import {
  convertFilter,
  convertOrders,
} from "../../../../utils/sequelizeFormatters";

export async function POST(req) {
  const body = await req.json();
  const { filters, columns, sorts } = body;

  try {
    const conn = await pgConnection.connect();
    const where = convertFilter(filters?.[0]);
    const order = convertOrders(conn, sorts);

    const result = (
      await Monster.getFull(conn, where, columns, order, {
        raw: true,
      })
    ).rows;

    let file = "";
    const _columns = Object.keys(result[0]);

    _columns.forEach((column) => {
      file += `${column.toString()},`;
    });

    file += "\n";

    result.forEach((row) => {
      _columns.forEach((column) => {
        file += `${row[column]},`;
      });
      file += "\n";
    });

    return NextResponse.json(file, {
      headers: {
        "Content-Type": "application/csv",
      },
      status: 200,
    });
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
