//This file will help us to create a reusable search logic
import { useMemo, useState } from "react";

const useSearch = (data, keys) => {
  const [query, setQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!query) return data;
    return data.filter((item) =>
      keys.some((key) =>
        item[key]?.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, data, keys]);

  return { query, setQuery, filteredData };
};

export default useSearch;
