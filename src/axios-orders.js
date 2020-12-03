import axios from 'axios';


//https://console.firebase.google.com/u/0/project/burger-builder-89944/database/burger-builder-89944/data/~2F
const instance = axios.create({
    baseURL: 'https://burger-builder-89944.firebaseio.com/'
});

export default instance;