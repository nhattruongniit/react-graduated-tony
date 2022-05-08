class AuthService {
  setAccessToken = value => window.localStorage.setItem('accessToken', value);

  getAccessToken = () => window.localStorage.getItem('accessToken');

  clearStorage = () => window.localStorage.clear();

  isAuthenticated = () => !!this.getAccessToken();

  isValidToken = accessToken => {
    if(!accessToken) return;
    const expireTime = 13213123121;
    const currentTime = Date.now() / 1000;

    return expireTime < currentTime;
  }
}

const authService = new AuthService();

export default authService;