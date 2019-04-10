import Axios from "axios";

const api = process.env.REACT_APP_RECORDS_API_URL || "http://localhost:5000"

//嵌套模板  +   undefined错误
export const getAll = ()=>
    Axios.get(`${api}/api/v1/records`)

export const create = (body) => 
    Axios.post(`${api}/api/v1/records`,body)

export const update = (id,body) => 
    Axios.put(`${api}/api/v1/records/${id}`,body)

export const remove = (id) => 
    Axios.delete(`${api}/api/v1/records/${id}`)