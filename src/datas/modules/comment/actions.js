import axios from "axios";

let url = "http://" + process.env.VUE_APP_SERVER_HOST

const instance = axios.create({
    baseURL: url,
});

export default {

    replyComment: ({rootGetters}, message) => {
        return instance.post('/comment/reply/' + rootGetters.getCommentId, {
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