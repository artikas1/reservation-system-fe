import axiosInstance from './axiosConfig'; // Import the centralized Axios instance

const CAR_API_BASE_URL = '/car';
const CAR_RESERVATION_API_URL = 'car-reservation';

class CarService {
  async getCars(): Promise<any> {
    try {
      const response = await axiosInstance.get(CAR_API_BASE_URL/all);
      console.log('Cars data received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  }

  async getAvailableCars(startTime: string, endTime: string): Promise<any> {
    try {
      const response = await axiosInstance.get(`${CAR_API_BASE_URL}/available`, {
        params: { startTime, endTime },
      });
      console.log('Available cars received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching available cars:', error);
      throw error;
    }
  }

  async getCarReservations() : Promise<any>  {
    try {
      const response = await axiosInstance.get(`${CAR_RESERVATION_API_URL}/user`);
      console.log('Car reservations received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching car reservations:', error);
      throw error;
    }
  }

  async deleteCarReservationByCarReservationId(carReservationId: string): Promise<void> {
    try {
      await axiosInstance.delete(`car-reservation/delete`, {
        params: { carReservationId },
      });
      console.log('Car reservation deleted successfully');
    } catch (error) {
      console.error('Error deleting car reservation:', error);
      throw error;
    }
  }

  async reserveCar(carId: string, startTime: string, endTime: string): Promise<any>{
    try {
      const response = await axiosInstance.post(
        `${CAR_RESERVATION_API_URL}/${carId}`, // Note: carId in URL path
        null, // No request body
        {
          params: { // These become query parameters
            startTime,
            endTime
          },
          headers: {
            'Accept': '*/*' // Match the curl example
          }
        }
      );
      console.log('Car reserved successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error reserving car:', error);
      throw error;
    }
  }

}

export default new CarService();
