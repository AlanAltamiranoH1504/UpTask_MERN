import axios from 'axios';
const ClienteAxios = axios.create({
    baseURL: "http://localhost:3000",
});
export default ClienteAxios;