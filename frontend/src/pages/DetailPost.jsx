import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components/compIndex";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import useAxios from "../BackendService/useAxios";

function DetailPost() {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const userData = useSelector((state) => state.auth.user);

  const isAuthor =
    article && userData ? article.author_id === userData.user_id : false;
  // console.log(article.author_id , '==' , userData.user_id)

  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      axiosInstance
        .get(`/articles/detail/${slug}`)
        .then((response) => setArticle(response.data))
        .catch((error) => console.error("Error fetching data:", error));
    } else navigate("/");
  }, [slug, navigate, setArticle]);

  const deleteArticle = () => {
    axiosInstance
      .delete(`/articles/delete/${article.id}`)
      .then(navigate("/"))
      .catch((error) => console.error("Error with deleting data:", error));
  };

  return article ? (
    <div className="mt-2 -z-10">
      <Container className="">
        <div className="w-full flex justify-center mb-4 relative">
          <div className="w-full h-2/3">
            {article.featured_image ? (
              <img
                src={article.featured_image}
                alt={article.title}
                className="rounded-xl"
              />
            ) : (
              <img src="" alt={article.title} />
            )}
          </div>
          {isAuthor && (
            <div className="absolute right-2 top-0 divide-x divide-sky-600  text-white">
              <Link to={`/edit/${article.slug}`}>
                <button className=" text w-12 p-2 hover:text-sky-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    // className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
              </Link>
              <button
                className=" w-12 p-2 hover:text-red-600"
                onClick={deleteArticle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                //   className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        <div className="w-full mb-2 text-center ">
          <h1 className="text-4xl font-bold text-gray-800">{article.title}</h1>
        </div>
        <div className="browser-css p-2 text-lg text-gray-900">{parse(article.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default DetailPost;
