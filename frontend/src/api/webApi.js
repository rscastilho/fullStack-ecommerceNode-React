import axios from 'axios'

const webApi = axios.create({
    baseURL: 'http://localhost:5000/api/'
})



export default webApi;