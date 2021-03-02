import axios from "axios";

let url = "http://" + process.env.VUE_APP_SERVER_HOST + "/article"

const instance = axios.create({
    baseURL: url,
});

export default {
    getArticle : ({commit}, slug) => {
        return instance.get('/' + slug)
            .then((response) => {
                if (response.data.status.success)
                {
                    commit('SET_CONTENT', response.data.data.content)
                    commit('SET_ABOUT', response.data.data.article)
                    console.log(response.data.data)
                }
                else {
                    commit('SET_ERROR', "Something goes wrong on server side. Please try again later.")
                }
            })
            .catch(() => {
                commit('SET_ERROR', "Something goes wrong. Please try again.")
            })
    }

}