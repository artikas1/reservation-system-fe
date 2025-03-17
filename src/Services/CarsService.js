import axios from 'axios';

const CAR_API_BASE_URL = 'http://localhost:8080/car';  // Backend URL

class CarService {
  async getCars() {
    try {
      const response = await axios.get(CAR_API_BASE_URL);
      console.log('Cars data received:', response.data);  // Logs the response data
      return response.data;
    } catch (error) {
      console.error('Error fetching cars:', error);  // Logs any errors
      throw error;
    }
  }
}

export default new CarService();
