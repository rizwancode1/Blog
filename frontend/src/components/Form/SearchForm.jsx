import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxios from "../../BackendService/useAxios";
import { Link } from "react-router-dom";

function SearchForm() {
  const { register, handleSubmit, watch, setValue, getValues } = useForm();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const axiosInstance = user ? useAxios() : null;
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const search = async () => {
    navigate(`/search/${getValues("q")}`);
    setValue("q", "");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!axiosInstance || watch("q") === "") {
        // Check if the search query is empty
        setShowResults(false);
        return;
      }
      try {
        const response = await axiosInstance.get("/articles/search/", {
          params: { q: watch("q") },
        });

        setResults(response.data);
        setShowResults(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const typingTimeout = setTimeout(fetchData, 500); // debounce time

    // Clear timeout if the user starts typing again
    return () => clearTimeout(typingTimeout);
  }, [watch("q"), axiosInstance]);

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(search)}
        className="flex items-center justify-between px-2 py-2 lg:max-w-xl"
      >
        <input
          type="text"
          placeholder="search here"
          className="focus-visible:outline-none"
          {...register("q", {
            required: true,
          })}
          onChange={(e) => setValue("q", e.target.value)}
          onBlur={() => setShowResults(false)}
        />
        <button
          type="submit"
          className="w-6 h-6 hover:text-indigo-500 hover:font-bold text-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className=""
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>
      {showResults && (
        <div className="absolute top-12 rounded-md p-2 2/4 bg-white w border border-gray-300 text-base mt-2 z-10">
          <ul className="">
            {results.slice(0, 7).map((result) => (
              <Link to={`detail/${result.slug}`}>
                <li
                  className="border-t text-xl text-black/85 w-full hover:bg-gray-100"
                  key={result.id}
                >
                  {result.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchForm;
