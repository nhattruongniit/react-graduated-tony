import httpRequest from "services/httpRequest";

export const loginUser = async(url, bodyData = {}) => {
  return httpRequest.post(url, bodyData, {
    showLoading: true
  });
}

export const authenticated = async(url, accessToken) => {
  return httpRequest.post(url, {}, {
    headers: {
      'x-auth-token': accessToken
    }
  })
}

