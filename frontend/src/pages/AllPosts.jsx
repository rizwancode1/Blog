import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components/compIndex";
import useAxios from "../BackendService/useAxios";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.user);
  const axiosInstance = userData ? useAxios() : null;
  useEffect(() => {
    if (userData) {
      axiosInstance
        .get("/articles/")
        .then((response) => setPosts(response.data))

        .catch((error) => console.error("Error fetching data:", error));
    }
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="">
          <div className="grid grid-cols-2 gap-1  md:grid-cols-3 lg:grid-cols-4 md:gap-1 w-full">
            {posts.map((post) => (
              <div className="" key={post.id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
