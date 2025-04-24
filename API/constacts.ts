export const API_BASE_URL = "http://10.0.2.2:5000/redeem";

const SIGNUP = `${API_BASE_URL}/auth/signup`; //Signup API endoint
const SIGNIN = `${API_BASE_URL}/auth/signIn`; //Login API endpoint
const FORGOT_PASSWORD = `${API_BASE_URL}/auth/forgot-password`;
const RESET_PASSWORD = `${API_BASE_URL}/auth/reset-password`;
const GET_USER = `${API_BASE_URL}/user/get-user`;
const UPDATE_USER = `${API_BASE_URL}/user/update-user`;
const DELETE_USER = `${API_BASE_URL}/user/delete-user`;

export { SIGNUP, SIGNIN };
