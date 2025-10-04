import { useState, useEffect } from "react";

export const useFetch = (url, params) => {
  const [request, setRequest] = useState({
    data: null,
    isLoading: true,
  });

  useEffect(() => {
    fetch(url, params)
      .then((resp) => resp.json())
      .then((data) => setRequest({ data, isLoading: false }));
  }, [url]);

  return {
    data: request.data,
    isLoading: request.isLoading,
  };
};
