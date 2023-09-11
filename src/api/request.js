import axios from 'axios'
import Cookies from 'js-cookie'
const client = axios.create({baseURL : 'http://127.0.0.1:8000/api'})
export const  request = async ({...options}) => {
    client.defaults.headers.common.Authorization = `Bearer ${Cookies.get('_le_salon_token')}`
    return client(options)
    .then((res) => res)
}

export const imageBaseURL = 'http://127.0.0.1:8000'