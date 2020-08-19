import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burgerproject-d29cf.firebaseio.com/'
});

export default instance;