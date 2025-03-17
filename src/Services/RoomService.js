import axios from 'axios';

const ROOM_API_BASE_URL = 'http://localhost:8080/room';

class RoomService {
  async GetRooms() {
    try {
      const response = await axios.get(ROOM_API_BASE_URL);
      console.log('Rooms data received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  }
}

export default new RoomService();
