import axiosInstance from './axiosConfig'; // Import the centralized Axios instance

const CAR_API_BASE_URL = '/car';
const CAR_RESERVATION_API_URL = 'car-reservation/user';

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

  async getCarReservations() : Promise<any>  {
    try {
      const response = await axiosInstance.get(CAR_RESERVATION_API_URL);
      console.log('Car reservations received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching car reservations:', error);
      throw error;
    }
  }

}

export default new CarService();
