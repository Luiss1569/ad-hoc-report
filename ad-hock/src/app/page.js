"use client";

import GroupFilter from "@/components/Molecules/Filter";
import SortList from "@/components/Molecules/Sort";
import ColumnList from "@/components/Molecules/Column";
import { useMemo, useState } from "react";
import { useFiltersContext } from "@/contexts/Filters";

export default function Home() {
  const [sorts, setSorts] = useState([]);

  const [filters] = useFiltersContext();

  const [columns, setColumns] = useState([]);

  const query = useMemo(() => {
    let query_result = "";

    const recursive = (filters) => {
      if (filters.length) {
        query_result += "(";
        for (let i = 0; i < filters.length; i++) {
          const filter = filters[i];
          if (filter.length) {
            recursive(filter);
          } else {
            if (filter.field?.value && filter.operator && filter.value) {
              query_result += `${filter.field.value} ${filter.operator} ${filter.value}`;
              if (i < filters.length - 1) {
                query_result += ` ${filter.logic} `;
              }
            }
          }
        }
        query_result += ")";
      }
    };

    recursive(filters);

    return query_result;
  }, [filters]);

  return (
    <main className="">
      <GroupFilter />

      <SortList />

      <ColumnList />
    </main>
  );
}
