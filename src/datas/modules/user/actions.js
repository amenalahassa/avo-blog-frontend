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

}