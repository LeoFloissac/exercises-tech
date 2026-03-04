class ApiService {
    async get(path) {
      try {
        const response = await fetch(`/api${path}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `JWT ${this.token}` },
        });
        return await response.json();
      } catch (error) {
        throw error;
      }
    }
  }

const api = new ApiService();
export default  api;