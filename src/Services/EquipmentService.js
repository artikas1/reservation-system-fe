import axios from 'axios';

const EQUIPMENT_API_BASE_URL = 'http://localhost:8080/equipment';

class EquipmentService {
    async getEquipment() {
        try {
            const response = await axios.get(EQUIPMENT_API_BASE_URL);
            console.log('Equipment data received', response.data)
            return response.data;
        } catch (error) {
            console.error('Error fecting cars:', error);
            throw error;
        }
    }
}

export default new EquipmentService();
