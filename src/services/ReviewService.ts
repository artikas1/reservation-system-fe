import axiosInstance from './axiosConfig';
import { EntityType } from "@/types/EntityType";

const REVIEW_API_BASE_URL = '/review';

class ReviewService {

  async getReviewsByEntity(entityId: string, entityType: EntityType):Promise<{ content: string, createdAt: string }[]> {
    try {
      const response = await axiosInstance.get(`${REVIEW_API_BASE_URL}/get`, {
        params: {
          reviewedEntityId: entityId,
          entityType
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews for entity:', error);
      throw error;
    }
  }

  async createReview(content: string, reviewedEntityId: string, entityType: EntityType, anonymous: boolean): Promise<any> {
    try {
      const response = await axiosInstance.post(`${REVIEW_API_BASE_URL}/create`, {
        content,
        reviewedEntityId,
        entityType,
        anonymous
      });

      console.log('Review created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  }

}

export default new ReviewService();
