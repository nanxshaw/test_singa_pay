import axios from 'axios';
const apiUrl = 'https://dummyapi.io/data/v1';


const ApiGet = async (http) => {
    let options = {
        headers: {
            'Content-Type': 'application/json',
            'app-id': '64eeffa7f12e9e0b068da348'
        }
    };
    const request = await axios.get(apiUrl + http, options)
        .then(response => response)
        .catch(error => error.response.data);
    return request;
};

const ApiPost = async (http, payload) => {
    let options = {
        headers: {
            'Content-Type': 'application/json',
            'app-id': '64eeffa7f12e9e0b068da348'
        }
    };
    const req = await axios.post(apiUrl + http, payload, options)
        .then(response => response)
        .catch(error => error.response.data);
    return req;
};

const ApiPut = async (http, payload) => {
    let options = {
        headers: {
            'Content-Type': 'application/json',
            'app-id': '64eeffa7f12e9e0b068da348'
        }
    };
    const req = await axios.put(apiUrl + http, payload, options)
        .then(response => response)
        .catch(error => error.response.data);
    return req;
};

const ApiDelete = async (http) => {
    let options = {
        headers: {
            'Content-Type': 'application/json',
            'app-id': '64eeffa7f12e9e0b068da348'
        }
    };
    const req = await axios.delete(apiUrl + http, options)
        .then(response => response)
        .catch(error => error.response.data);
    return req;
};
export default {
    ApiGet,
    ApiPost,
    ApiPut,
    ApiDelete
}