import { NextResponse } from "next/server";
import pgConnection from "../../../database";
import Monster from "../../../database/dao/monster";
import {
  convertFilter,
  convertOrders,
} from "../../../utils/sequelizeFormatters";

export async function POST(req) {
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

    const where = convertFilter(filters?.[0]);
    const order = convertOrders(conn, sorts);

    const result = await Monster.getFull(conn, where, columns, order);

    const data = {
      count: result?.length || 0,
      page: page || 0,
      limit: limit || 10,
      data: result,
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
