import axiosInstance from './axiosConfig';

class StatisticService {
  async getReservationStatistics() {
    const response = await axiosInstance.get('/statistics/reservations-count');
    return response.data;
  }

  async getResourceStatistics() {
    const response = await axiosInstance.get('/statistics/resources-count');
    return response.data;
  }

  async getResourceUsageHistory(resourceId, year) {
    const response = await axiosInstance.get('/statistics/resource-usage-history', {
      params: {
        resourceId,
        year,
      },
    });
    return response.data;
  }


}

export default new StatisticService();
