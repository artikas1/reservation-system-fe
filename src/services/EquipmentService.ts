import axiosInstance from './axiosConfig'; // Import the centralized Axios instance

const EQUIPMENT_API_BASE_URL = '/equipment';
const EQUIPMENT_RESERVATION_API_URL = '/equipment-reservation';

class EquipmentService {
  async getAllEquipmentHistoryReservations(status?: string, startTime?: string, endTime?: string): Promise<any> {
    try {
      const response = await axiosInstance.get(`${EQUIPMENT_RESERVATION_API_URL}/user/history`, {
        params: { reservationStatus: status, startTime, endTime }
      });
      console.log('All equipment reservation history received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching equipment reservation history:', error);
      throw error;
    }
  }

  async getAvailableEquipment(startTime: string, endTime: string, equipmentType?: string): Promise<any> {
    try {
      const response = await axiosInstance.get(`${EQUIPMENT_API_BASE_URL}/available`, {
        params: { startTime, endTime, equipmentType: equipmentType }
      });
      console.log('Available equipment received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching available equipment:', error);
      throw error;
    }
  }

  async getEquipmentReservations() : Promise<any> {
    try {
      const response = await axiosInstance.get(`${EQUIPMENT_RESERVATION_API_URL}/user`);
      console.log('Equipment reservations received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching equipment reservations:', error);
      throw error;
    }
  }

  async deleteReservationByEquipmentReservationId(equipmentReservationId: string): Promise<void> {
    try {
      await axiosInstance.delete(`equipment-reservation/delete`, {
        params: { equipmentReservationId },
      });
      console.log('Equipment reservation deleted successfully');
    } catch (error) {
      console.error('Error deleting equipment reservation:', error);
      throw error;
    }
  }

  async getReservedTimeRanges(equipmentId: string, excludeReservationId?: string): Promise<any> {
    try {
      const response = await axiosInstance.get(
        `${EQUIPMENT_RESERVATION_API_URL}/equipment/${equipmentId}/time-ranges`,
        {
          params: excludeReservationId ? { excludeReservationId } : {}
        }
      );
      console.log('Reserved time ranges received:', response.data);
      return response.data;
    } catch (error) {
      console.log('Error fetching reserved time ranges:', error);
      throw error;
    }
  }

  async reserveEquipment(equipmentId: string, startTime: string, endTime: string): Promise<any> {
    try {
      const response = await axiosInstance.post(
        `${EQUIPMENT_RESERVATION_API_URL}/${equipmentId}`,
        null,
        {
          params: {
            startTime,
            endTime
          },
          headers: {
            'Accept': '*/*'
          }
        }
      );
      console.log('Equipment reserved successfuly:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error reserving equipment:', error);
      throw error;
    }
  }

  async updateReservation(reservationId: string, newStartTime: string, newEndTime: string): Promise<any> {
    try {
      const response = await axiosInstance.put(
        `${EQUIPMENT_RESERVATION_API_URL}/${reservationId}`,
        null,
        {
          params: {
            newStartTime,
            newEndTime
          },
        }
      );
      console.log('Equipment reservation updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating equipment reservation:', error);
      throw error;
    }
  }

}

export default new EquipmentService();
