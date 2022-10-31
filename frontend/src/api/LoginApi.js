import webApi from './webApi';

const LoginApi = async (data) => {
    try {
        const result = await webApi.post('users/login', data);
        
        return result.data;
    } catch (error) {
        return error.response.data
    }
}

export default LoginApi