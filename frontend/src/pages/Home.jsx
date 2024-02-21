import React, { useEffect, useState } from "react";
import useAxios from "../BackendService/useAxios";
import { PostCard, Container } from "../components/compIndex";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.user);
  const axiosInstance = userData? useAxios():null 

  
  useEffect(() => {
    if (userData) {
      axiosInstance
        .get("/articles/")
        .then((response) => setPosts(response.data))

        .catch((error) => console.error("Error fetching data:", error));
    }
  }, []);

  if (!userData) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full h-full my-6">
      <Container>
      <div className="my-5">
        <h1 className=" text-3xl lg:text-5xl text-indigo-500">Hello welcome to  Blog site.. </h1>
      </div>

        <div className="grid grid-cols-2 gap-1  md:grid-cols-3 lg:grid-cols-4 md:gap-1 w-full">
          {posts.map((post) => (
            <div className="" key={post.id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
