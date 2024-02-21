import useAxios from '../BackendService/useAxios';

class ArticleService {
  constructor() {
    this.axiosInstance = useAxios();
    this.baseUrl = 'http://localhost:8000/articles'; 
  }

  async createArticle({ title, slug, content, featuredImage, isPublic, author, userId }) {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('content', content);
        formData.append('featured_image', featuredImage); // Append the file object
        formData.append('is_public', isPublic);
        formData.append('author', author);
        formData.append('user_id', userId);
  
        const response = await this.axiosInstance.post(this.baseUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data' 
          }
        });
        return response.data;
      } catch (error) {
        console.error("Error creating article:", error);
        throw error;
      }
  }

  async getArticle(articleId) {
    try {
      const response = await this.axiosInstance.get(`${this.baseUrl}/${articleId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  }

  async updateArticle(articleId, { title, slug, content, featuredImage, isPublic }) {
    try {
      const response = await this.axiosInstance.put(`${this.baseUrl}/${articleId}`, {
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
  }

  async deleteArticle(articleId) {
    try {
      await this.axiosInstance.delete(`${this.baseUrl}/${articleId}`);
    } catch (error) {
      console.error("Error deleting article:", error);
      throw error;
    }
  }
}

export default new ArticleService();

