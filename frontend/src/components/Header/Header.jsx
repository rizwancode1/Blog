import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutBtn } from "../compIndex";
import { useForm } from "react-hook-form";
import useAxios from "../../BackendService/useAxios";
import { Link } from "react-router-dom";
import {SearchForm} from "../compIndex";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  ///For Search 
  // const { register, handleSubmit, watch, setValue , getValues} = useForm(); 

  // const user = useSelector((state) => state.auth.user);
  // const axiosInstance = user? useAxios():null 
  // const [results, setResults] = useState([]);
  // const [showResults, setShowResults] = useState(false);


  // const search = async () => {
  //   navigate(`/search/${getValues("q")}`)
  //   setValue('q' , '')
  // }


  // useEffect(() => {
    
  //   const fetchData = async () => {
  //     if (!axiosInstance || watch("q") === "") { // Check if the search query is empty
  //       setShowResults(false); 
  //       return;
  //     }
  //     try {
  //       const response = await axiosInstance.get("/articles/search/", {
  //         params: { q: watch("q") },
  //       });

  //       setResults(response.data);
  //       setShowResults(true);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };


  
  //   const typingTimeout = setTimeout(fetchData, 500); // debounce time
  
  //   // Clear timeout if the user starts typing again
  //   return () => clearTimeout(typingTimeout);
  // }, [watch("q"), axiosInstance]);

  



  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: authStatus,
      icon: [
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
          <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
        </svg>,
      ],
    },
    {
      name: "AllPosts",
      slug: "all-posts",
      active: authStatus,
      icon: [
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>,
      ],
    },
    {
      name: "AddPost",
      slug: "/add-post",
      active: authStatus,
      icon: [
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
        </svg>,
      ],
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: [
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>,
      ],
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      icon: [
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
        </svg>,
      ],
    },
  ];

  return (
    <header className=" w-full py-4 flex items-center justify-between px-3 border-b">
      <div className="items-center space-x-10 hidden lg:flex">
        <div className="text-4xl text-indigo-500 font-sans]">B-Blog</div>
        <div className="Search-lg px-2 hidden lg:flex relative  w-[26vw] justify-between outline-1 outline  outline-gray-900 rounded-full">
          <SearchForm/>
        </div>
      </div>

      <div className="hamburger relative lg:hidden">
        <button onClick={() => setIsNavOpen(!isNavOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12h18M3 6h18M3 18h18"
            />
          </svg>
        </button>

        {/* Navigation menu */}
        <div
          className={`bg-black/65 p-2 text-white divide-black absolute top-5 -left-5 rounded-r-2xl ${
            isNavOpen
              ? "transform translate-x-2"
              : "transform -translate-x-full"
          } transition-transform duration-700 ease-in-out z-10 fixed`}
        >
          <ul className=" divide-y-2 divide-sky-500 w-[30vmin]">
            {navItems.map((item, index) =>
              item.active ? (
                <li key={index} className="hover:bg-gray-50/95">
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-5 py-2 duration-200 flex items-center text-xl justify-center hover:outline-white hover:underline hover:text-indigo-500"
                  >
                    {item.icon.map((icon, index) => (
                      <React.Fragment key={index}>{icon}</React.Fragment>
                    ))}
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </div>
      </div>

      <nav className="NavLg">
        <ul className=" hidden lg:flex">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="inline-bock px-5 py-1.5 duration-200 flex items-center justify-center hover:outline-white hover:underline hover:text-indigo-500"
                >
                  {item.icon.map((icon, index) => (
                    <React.Fragment key={index}>{icon}</React.Fragment>
                  ))}
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>

      <div className="search-Mobile flex space-x-2  lg:hidden">
        <div className="Seach-form-Mobile outline-1 outline outline-sky-600 rounded-full">
          <SearchForm/>
        </div>

      </div>
    </header>
    
  );
}

export default Header;
