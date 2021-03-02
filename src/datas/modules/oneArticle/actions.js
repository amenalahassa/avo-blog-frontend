import axios from "axios";

let url = "http://" + process.env.VUE_APP_SERVER_HOST

const instance = axios.create({
    baseURL: url,
});

export default {
    getArticle : ({commit}, slug) => {
        return instance.get('/article/' + slug)
            .then((response) => {
                if (response.data.status.success)
                {
                    commit('SET_CONTENT', response.data.data.content)
                    commit('SET_ABOUT', response.data.data.article)
                }
                else {
                    commit('SET_ERROR', "Something goes wrong on server side. Please try again later.")
                }
            })
            .catch((err) => {
                commit('SET_ERROR', "Something goes wrong. Please try again. Details : " + err)
            })
    },

    makeComment: ({getters}, message) => {
        return instance.post('/comment', {
            article : getters.getArticleId,
            user : '602bc9e154acff5cd190d9c1',
            message
        })
    },

    replyComment: ({rootGetters}, {message, commentId}) => {
        return instance.post('/comment/reply/' + commentId, {
            article : rootGetters.getArticleId,
            user : '602bc9e154acff5cd190d9c1',
            message
        })
    },

    getComment: ({commit}, id) => {
        console.log(commit)
        return instance.get('/comment/' + id)
    }


}