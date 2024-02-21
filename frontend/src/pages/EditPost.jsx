import React, { useEffect, useState } from 'react'
import { Container, Form } from '../components/compIndex'
import { useNavigate, useParams } from 'react-router-dom'
import useAxios from '../BackendService/useAxios'

function EditPost() {
  const [article, setArticle] = useState()
  // console.log(article.slug)
  const {slug} = useParams()
  const navigate = useNavigate()

  const axiosInstance = useAxios()

  useEffect(()=>{
    if (slug) {
      axiosInstance
      .get(`/articles/detail/${slug}`)
      .then(response => setArticle(response.data))
      .catch(error => console.error('Error fetching data:', error));
  } else navigate('/');


}, [slug, navigate])

return article? (
    <div className="py-8">
        <Container>
            <Form article={article}/>
        </Container>
    </div>
  ): null
}


export default EditPost