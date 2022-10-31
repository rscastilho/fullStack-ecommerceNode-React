import webApi from './webApi' 

const RegisterApi = async(data) => {
    try {
        const register = await webApi.post('/users/register', data)
        return register.data;
    } catch (error) {
        return error.response.data
    }
}

export default RegisterApi