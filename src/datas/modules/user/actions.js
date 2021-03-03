import axios from "axios";

let url = "http://" + process.env.VUE_APP_SERVER_HOST + '/user'

const instance = axios.create({
    baseURL: url,
});

export default {
    //eslint-disable-next-line
    signup : ({commit}, {name, email, password}) => {
        return instance.post('/signup', {
            name, email, password
        })
    },

    logout : ({rootGetters}) => {
        instance.defaults.headers.common['Authorization'] = "Bearer " + rootGetters.getUserToken;
        return instance.post('/logout', {
            id: rootGetters.getUserId
        })
    },

}