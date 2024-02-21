import React, { useEffect, useState } from 'react'
import {Container, PostCard} from '../components/compIndex'
import useAxios from "../BackendService/useAxios";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function Results() {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.user);
    console.log(posts)
    
    const {q} = useParams()
    console.log(q)

    const axiosInstance = userData? useAxios():null 

  
  useEffect(() => {
    axiosInstance
        .get(`/articles/search/?q=${q}`)
        .then((response) => setPosts(response.data))

        .catch((error) => console.error("Error fetching data:", error));
  }, [q]);


  return (
    <div className='w-full py-8'>
    <Container>
      {posts.length >1? 
      <div className="grid grid-cols-2 gap-1  md:grid-cols-3 lg:grid-cols-4 md:gap-1 w-full">
        {posts.map((post)=> (
          <div className="" key={post.id}>
          <PostCard {...post}/>
          </div>
        ))}
      </div>:
      <div className="">
        <h3 className="text-3xl">No results found...</h3>
      </div>
      }
     
    </Container>
  </div>
  )
}

export default Results