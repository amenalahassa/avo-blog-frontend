import axios from "axios";

let url = "http://" + process.env.VUE_APP_SERVER_HOST + "/article"

const instance = axios.create({
    baseURL: url,
});

export default {
    getArticles: ({commit}) => {
        return instance.get("")
            .then((res) => {
                if (res.data.status.success)
                {
                    commit('SET_ARTICLES', res.data.data)
                }
                else {
                    commit('SET_ERROR', "Something goes wrong on server side. Please try again later.")
                }
            })
            .catch((err) => {
                commit('SET_ERROR', "Something goes wrong. Please try again.  Details :" + err )
            })
    }
}