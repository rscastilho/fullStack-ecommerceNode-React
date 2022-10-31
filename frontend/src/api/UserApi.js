import webApi from './webApi';

import React from 'react'

const GetById = async (id) => {
    try {
        // const token = localStorage.getItem('@token')
        const result = await webApi.get(`/users/details/${id}`)
        // , 
        // {headers:{
        //     'authorization': `bearer ${token}`
        // }})
        return result.data;
    } catch (error) {
        return error.response.data
    }
}

const UpdateAvatar = async (id, data) => {
    try {
        const result = await webApi.put(`/users/updateavatar/${id}`, data)
        return result.data;
    } catch (error) {
        return error.response.data
    }
}

const getAllUsers = async ()=>{
    try {
        const result = await webApi.get('/users/getall');
        return result.data;
    } catch (error) {
        // console.log(error.response.data)
        return error.response.data
        
    }
}

const getUsersByName = async (data)=>{
    try {
        const result = await webApi.get(`/users/nomeusuario/${data}`);
        return result.data;

    } catch (error) {
        return error.response.data
    }
}

export { GetById, UpdateAvatar, getAllUsers, getUsersByName }