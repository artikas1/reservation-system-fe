import axiosInstance from './axiosConfig'; // Import the centralized Axios instance

const CAR_API_BASE_URL = '/car';
const CAR_RESERVATION_API_URL = 'car-reservation';

class CarService {
  async getCarById(carId: string): Promise<any> {
    try {
      const response = await axiosInstance.get(`${CAR_API_BASE_URL}/${carId}`);
      console.log('Car details received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching car by ID:', error);
      throw error;
    }
  }
  async getAllCarHistoryReservations(status?: string, startTime?: string, endTime?: string): Promise<any> {
    try {
      const response = await axiosInstance.get(`${CAR_RESERVATION_API_URL}/user/history`, {
        params: {reservationStatus: status, startTime, endTime}
      });
      console.log('All car reservation history received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching car reservation history:', error);
      throw error;
    }
  }

  async getAvailableCars(startTime: string, endTime: string, bodyType?: string, address?: string): Promise<any> {
    try {
      const response = await axiosInstance.get(`${CAR_API_BASE_URL}/available`, {
        params: {startTime, endTime, bodyType: bodyType, address: address}
      });
      console.log('Available cars received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching available cars:', error);
      throw error;
    }
  }

  async getAvailableEcoCars(startTime: string, endTime: string, bodyType?: string, address?: string): Promise<any> {
    try {
      const response = await axiosInstance.get(`${CAR_API_BASE_URL}/available/eco`, {
        params: {startTime, endTime, bodyType: bodyType, address: address}
      });
      console.log('Available eco-friendly cars received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching available eco-friendly cars:', error);
      throw error;
    }
  }

  async getCarReservations(): Promise<any> {
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
        params: {carReservationId},
      });
      console.log('Car reservation deleted successfully');
    } catch (error) {
      console.error('Error deleting car reservation:', error);
      throw error;
    }
  }

  async getReservedTimeRanges(carId: string, excludeReservationId?: string): Promise<any> {
    try {
      const response = await axiosInstance.get(
        `${CAR_RESERVATION_API_URL}/car/${carId}/time-ranges`,
        {
          params: excludeReservationId ? {excludeReservationId} : {}
        }
      );
      console.log('Reserved time ranges received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching reserved time ranges:', error);
      throw error;
    }
  }

  async reserveCar(carId: string, startTime: string, endTime: string): Promise<any> {
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

  async updateReservation(reservationId: string, newStartTime: string, newEndTime: string): Promise<any> {
    try {
      const response = await axiosInstance.put(
        `${CAR_RESERVATION_API_URL}/${reservationId}`,
        null,
        {
          params: {
            newStartTime,
            newEndTime
          },
        }
      );
      console.log('Car reservation updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating car reservation:', error);
      throw error;
    }
  }

  async getAllCars(): Promise<any> {
    try {
      const response = await axiosInstance.get('/car/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching all cars:', error);
      throw error;
    }
  }

  async createCar(carData: FormData): Promise<any> {
    try {
      const response = await axiosInstance.post('/car/create', carData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Car created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating car:', error);
      throw error;
    }
  }

  async deleteCarById(carId: string): Promise<void> {
    try {
      await axiosInstance.delete(`${CAR_API_BASE_URL}/${carId}`);
      console.log('Car deleted successfully');
    } catch (error) {
      console.error('Error deleting car:', error);
      throw error;
    }
  }

}

export default new CarService();
