import useAxios from '../BackendService/useAxios';
import axios from 'axios';

const baseUrl = 'http://localhost:8000/articles';

const axiosInstance = useAxios();

export const createArticle = async ({ title, slug, content, featuredImage, isPublic, author, userId }) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('content', content);
    formData.append('featured_image', featuredImage); // Append the file object
    formData.append('is_public', isPublic);
    formData.append('author', author);
    formData.append('user_id', userId);

    const response = await axiosInstance.post(baseUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' 
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

export const getArticle = async (articleId) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/detail/${articleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

export const updateArticle = async (articleId, { title, slug, content, featuredImage, isPublic }) => {
  try {
    const response = await axiosInstance.put(`${baseUrl}/${articleId}`, {
      title,
      slug,
      content,
      featured_image: featuredImage, // Adjust the field names according to your backend model
      is_public: isPublic
    });
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

export const deleteArticle = async (articleId) => {
  try {
    await axiosInstance.delete(`${baseUrl}/${articleId}`);
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};
