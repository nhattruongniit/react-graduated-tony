import { axiosInstance } from './initRequest';

class HttpRequest{ 
  constructor() {
    this.api = axiosInstance
  }

  async get(url, config) {
    return this.api.get(url, config = {})
  }

  async post(url, bodyData, config = {}) {
    return this.api.post(url, bodyData, config)
  }
}

const httpRequest = new HttpRequest();

export default httpRequest;