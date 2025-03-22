import axiosInstance from './axiosConfig'; // Import the centralized Axios instance

const CAR_API_BASE_URL = '/car';

class CarService {
  async getCars(): Promise<any> {
    try {
      const response = await axiosInstance.get(CAR_API_BASE_URL);
      console.log('Cars data received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  }
}

export default new CarService();
