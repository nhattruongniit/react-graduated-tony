import httpRequest from "services/httpRequest";

export const getTodos = async (page = 1, limit = 10) => {
  return httpRequest.get(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`)
}

