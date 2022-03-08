import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const api_live  = "https://api.idisi.in"
// const api_dev   = "http://192.168.43.149"
const api_dev   = "http://192.168.43.149"
const api_url   = Constants.appOwnership==="expo"?api_dev:api_live

const getToken = async () => {
    let token   = ""
    const value = await AsyncStorage.getItem('@token')
    if(value !== null) {
        token   = value
    }
    return token
}

export const post_without_credintial    = ( url, params )=>{
    console.log(`${api_url}${url}`)
    console.log(params)
    return axios.post(`${api_url}${url}`, params)
}

export const get    = async ( url )=>{
    console.log(`${api_url}${url}`)
    return axios.get(`${api_url}${url}`, {
		headers: {"Authorization": await getToken()}
	})
}

export const post   = async ( url , payload)=>{
    console.log(`${api_url}${url}`)
    console.log(await getToken())
    console.log(payload)
    return axios.post(`${api_url}${url}`, payload, {
		headers: {"Authorization": await getToken()}
	})
}
