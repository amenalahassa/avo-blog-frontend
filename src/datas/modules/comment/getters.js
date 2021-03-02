import {formatDateTimeInLocal} from "@/module/biblio";

export default {

    getCommentId: (state) => {
        return state.id
    },

    getCommentAuthor: (state) => {
        return state.user
    },

    getCommentAuthorLogo: (state) => {
        let all =  state.user.split(' ')
        let name = all[0]
        let surname = all.splice(1).join(' ')
        return `https://eu.ui-avatars.com/api/?name=${name}+${surname}`
    },

    getCommentMessage: (state) => {
        return state.message
    },

    getCommentReply: (state) => {
        return state.reply
    },

    getCommentDate: (state) => {
        return formatDateTimeInLocal(state.date)
    },




}