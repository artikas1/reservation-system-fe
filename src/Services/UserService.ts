import axiosInstance from "./axiosConfig";

const USER_API_BASE_URL = '/user/me';


class UserService {
  async getCurrentUser(): Promise<{ first_name: string; last_name: string}> {
    try {
      const response = await axiosInstance.get(USER_API_BASE_URL);
      console.log('Current user data received:', response.data);
      return response.data;
    } catch (error) {
      console.log('Error fetching current user:', error);
      throw error;
    }
  }
}

export default new UserService();
