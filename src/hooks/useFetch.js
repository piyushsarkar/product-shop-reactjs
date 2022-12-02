import { useEffect, useState } from 'react';

const useFetch = (URL) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    fetch(URL, { signal: abortController.signal })
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() => setIsLoading(false))
      .catch((err) => setError(err.message));

    return () => abortController.abort();
  }, [URL]);

  return { data, isLoading, error };
};
export default useFetch;
