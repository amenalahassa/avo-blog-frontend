import { formatDateInLocal } from "@/module/biblio";

export default {
    getBackgroundImage: (state) => {
        let baseURL = "http://" + process.env.VUE_APP_SERVER_HOST
        return baseURL + state.about.img
    },

    getTitle: (state) => {
        return state.about.title
    },

    getSlug: (state) => {
        return state.about.slug
    },

    getArticleId: (state) => {
        return state.about._id
    },

    getAuthor: (state) => {
        return state.about.author
    },

    getAuthorLogo: (state) => {
        let all =  state.about.author.split(' ')
        let name = all[0]
        let surname = all.splice(1).join(' ')
        return `https://eu.ui-avatars.com/api/?name=${name}+${surname}`
    },

    getPubDate: (state) => {
        return formatDateInLocal(state.about.datePub)
    },

    getCommentsLength: (state) => {
        return state.content.comments.length
    },

    getComments: (state) => {
        return state.content.comments
    },

    getLikes: (state) => {
        return state.about.like
    },

    getTags: (state) => {
        return state.content.tags
    },

    getContent: (state) => {
        return state.content.section
    },





}