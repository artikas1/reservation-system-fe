import axiosInstance from './axiosConfig'; // Import the centralized Axios instance

const ROOM_API_BASE_URL = '/room';
const ROOM_RESERVATION_API_URL = 'room-reservation';

class RoomService {
  async getAllRoomHistoryReservations(status?: string, startTime?: string, endTime?: string): Promise<any> {
    try {
      const response = await axiosInstance.get(`${ROOM_RESERVATION_API_URL}/user/history`, {
        params: {reservationStatus: status, startTime, endTime}
      });
      console.log('All room reservation history received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching room reservation history:', error);
      throw error;
    }
  }

  async getAvailableRooms(startTime: string, endTime: string, roomType?: string, address?: string): Promise<any> {
    try {
      const response = await axiosInstance.get(`${ROOM_API_BASE_URL}/available`, {
        params: {startTime, endTime, roomType: roomType, address: address }
      });
      console.log('Available rooms received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching available rooms:', error);
      throw error;
    }
  }

  async getRoomReservations(): Promise<any> {
    try {
      const response = await axiosInstance.get(`${ROOM_RESERVATION_API_URL}/user`);
      console.log('Rooms data received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching room reservations:', error);
      throw error;
    }
  }

  async deleteReservationByRoomReservationId(roomReservationId: string): Promise<void> {
    try {
      await axiosInstance.delete(`room-reservation/delete`, {
        params: {roomReservationId},
      });
      console.log('Room reservation deleted successfully');
    } catch (error) {
      console.error('Error deleting room reservation:', error);
      throw error;
    }
  }

  async getReservedTimeRanges(roomId: string, excludeReservationId?: string): Promise<any> {
    try {
      const response = await axiosInstance.get(
        `${ROOM_RESERVATION_API_URL}/room/${roomId}/time-ranges`,
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

  async reserveRoom(roomId: string, startTime: string, endTime: string): Promise<any> {
    try {
      const response = await axiosInstance.post(
        `${ROOM_RESERVATION_API_URL}/${roomId}`,
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
      console.log('Room reserved successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error reserving room:', error);
      throw error;
    }
  }

  async updateReservation(reservationId: string, newStartTime: string, newEndTime: string): Promise<any> {
    try {
      const response = await axiosInstance.put(
        `${ROOM_RESERVATION_API_URL}/${reservationId}`,
        null,
        {
          params: {
            newStartTime,
            newEndTime
          },
        }
      );
      console.log('Room reservation updated successfully', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating room reservation', error);
      throw error;
    }
  }

}

export default new RoomService();
