"use client";

import GroupFilter from "@/components/GroupFilter";
import SortList from "@/components/SortList";
import { useMemo, useState } from "react";

export default function Home() {
  const [filters, setFilters] = useState([
    {
      id: 1,
      field: "",
      operator: "",
      value: "",
      logic: "and",
    },
  ]);

  const [sorts, setSorts] = useState([]);

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
      <GroupFilter filters={filters} onChange={setFilters} />

      <SortList sorts={sorts} onChange={setSorts} />
    </main>
  );
}
