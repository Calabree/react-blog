import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(url) //returns promise
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data for that resouce");
        }
        return res.json(); //passes JSON to JS object and returns its data w/ a promise
      })
      .then((data) => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch((e) => {
        if (e.name === "AbortError") {
          console.log("Aborted");
        } else {
          setIsPending(false);
          setError(e.message);
        }
      });
    return () => {
      abortCont.abort();
    };
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
