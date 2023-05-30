"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import ButtonRequest from "../components/Atoms/ButtonRequest";
import GroupFilter from "../components/Molecules/Filter";
import SortList from "../components/Molecules/Sort";
import ColumnList from "../components/Molecules/Column";
import Monsters from "../components/Molecules/Monsters";

export default function Home() {
  const [data, setData] = useState({
    metadata: {},
    data: [],
  });

  // const query = useMemo(() => {
  //   let query_result = "";

  //   const recursive = (filters) => {
  //     if (filters.length) {
  //       query_result += "(";
  //       for (let i = 0; i < filters.length; i++) {
  //         const filter = filters[i];
  //         if (filter.length) {
  //           recursive(filter);
  //         } else {
  //           if (filter.field?.value && filter.operator && filter.value) {
  //             query_result += `${filter.field.value} ${filter.operator} ${filter.value}`;
  //             if (i < filters.length - 1) {
  //               query_result += ` ${filter.logic} `;
  //             }
  //           }
  //         }
  //       }
  //       query_result += ")";
  //     }
  //   };

  //   recursive(filters);

  //   return query_result;
  // }, [filters]);

  return (
    <div className="h-full w-full flex flex-col justify-start items-start">
      <div className="flex flex-row items-center w-full justify-center">
        <div className="mr-2">
          <Image
            src="/img/logo.png"
            alt="logo"
            width={70}
            height={70}
            className="rounded-full"
          />
        </div>
        <h1 className="text-2xl font-bold">Ad-Hock Monster</h1>
      </div>
      <div className="bg-white p-2 rounded-md shadow-md md:w-5/6 w-full mx-auto mt-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-2">
            <GroupFilter />
            <SortList />
            <ColumnList />

            <ButtonRequest setData={setData} />
          </div>
          <div className="flex flex-row items-center space-x-2">
            <h1 className="text-sm font-bold text-gray-500">
              {data.metadata?.count} data
            </h1>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <Monsters data={data.data} />
        </div>
      </div>
    </div>
  );
}
