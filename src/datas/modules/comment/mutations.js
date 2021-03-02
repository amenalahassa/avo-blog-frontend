
export default {

    SET_COMMENT (state, comment) {
        state.user = comment.users_name
        state.date = comment.dateAdd
        state.message = comment.message
        state.reply = comment.reply
        state.id = comment._id
    },

}