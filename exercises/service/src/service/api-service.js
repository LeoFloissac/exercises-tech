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

  async post(path, body) {
    try {
      const response = await fetch(`/api${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `JWT ${this.token}` },
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async put(path, body) {
    try {
      const response = await fetch(`/api${path}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `JWT ${this.token}` },
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

const api = new ApiService();
export default  api;