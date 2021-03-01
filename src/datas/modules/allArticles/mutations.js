
export default {
    SET_ARTICLES (state, articles) {
        state.all = articles
    },
    SET_ERROR (state, message) {
        state.error = message
    },
}