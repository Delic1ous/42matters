import { useState } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);

  const execute = () => {
    setLoading(true);
    fetch(url)
      .then((data) => data.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  };

  return { execute, data, loading };
};