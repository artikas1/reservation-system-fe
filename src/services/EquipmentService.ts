import axiosInstance from './axiosConfig'; // Import the centralized Axios instance

const EQUIPMENT_API_BASE_URL = '/equipment';
const EQUIPMENT_RESERVATION_API_URL = '/equipment-reservation/user';

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

  async getEquipmentReservations() : Promise<any> {
    try {
      const response = await axiosInstance.get(EQUIPMENT_RESERVATION_API_URL);
      console.log('Equipment reservations received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching equipment reservations:', error);
      throw error;
    }
  }

  async deleteReservationByEquipmentId(equipmentId: string): Promise<void> {
    try {
      await axiosInstance.delete(`equipment-reservation/delete`, {
        params: { equipmentId },
      });
      console.log('Equipment reservation deleted successfully');
    } catch (error) {
      console.error('Error deleting equipment reservation:', error);
      throw error;
    }
  }
}

export default new EquipmentService();
