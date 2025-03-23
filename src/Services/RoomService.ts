import axiosInstance from './axiosConfig'; // Import the centralized Axios instance

const ROOM_API_BASE_URL = '/room';
const ROOM_RESERVATION_API_URL = 'room-reservation/user';

class RoomService {
  async getRooms(): Promise<any> {
    try {
      const response = await axiosInstance.get(ROOM_API_BASE_URL);
      console.log('Rooms data received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  }

  async getRoomReservations(): Promise<any> {
    try {
      const response = await axiosInstance.get(ROOM_RESERVATION_API_URL);
      console.log('Rooms data received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching room reservations:', error);
      throw error;
    }
  }
}

export default new RoomService();
