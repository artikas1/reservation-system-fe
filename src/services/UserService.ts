import axiosInstance from "./axiosConfig";

const USER_API_BASE_URL = '/user/me';


class UserService {
  async getCurrentUser(): Promise<{ firstName: string; lastName: string; isAdmin: boolean }> {
    try {
      const response = await axiosInstance.get(USER_API_BASE_URL);
      const user = response.data;

      return {
        firstName: user.firstName,     // iš backend'o ateina `firstName`
        lastName: user.lastName,       // iš backend'o ateina `lastName`
        isAdmin: user.admin            // 🔁 ČIA YRA SVARBIAUSIA
      };
    } catch (error) {
      console.log('Error fetching current user:', error);
      throw error;
    }
  }
}


export default new UserService();
