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

    makeComment: ({getters, rootGetters}, message) => {
        console.log(rootGetters.getUserId)
        instance.defaults.headers.common['Authorization'] = "Bearer " + rootGetters.getUserToken;
        return instance.post('/comment', {
            article : getters.getArticleId,
            user : rootGetters.getUserId,
            message
        })
    },

    replyComment: ({rootGetters}, {message, commentId}) => {
        instance.defaults.headers.common['Authorization'] = "Bearer " + rootGetters.getUserToken;
        return instance.post('/comment/reply/' + commentId, {
            article : rootGetters.getArticleId,
            user : rootGetters.getUserId,
            message
        })
    },

    //eslint-disable-next-line
    getComment: ({commit}, id) => {
        return instance.get('/comment/' + id)
    },

    like: ({rootGetters}) => {
        instance.defaults.headers.common['Authorization'] = "Bearer " + rootGetters.getUserToken;
        return instance.post('/article/' + rootGetters.getArticleId + '/like' , {
            id : rootGetters.getUserId,
        })
    },

    unlike: ({rootGetters}) => {
        instance.defaults.headers.common['Authorization'] = "Bearer " + rootGetters.getUserToken;
        return instance.post('/article/' + rootGetters.getArticleId + '/unlike' , {
            id : rootGetters.getUserId,
        })
    }


}