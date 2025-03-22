import axiosInstance from './axiosConfig'; // Import the centralized Axios instance

const EQUIPMENT_API_BASE_URL = '/equipment';

class EquipmentService {
  async getEquipment(): Promise<any> {
    try {
      const response = await axiosInstance.get(EQUIPMENT_API_BASE_URL);
      console.log('Equipment data received', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching equipment:', error);
      throw error;
    }
  }
}

export default new EquipmentService();
