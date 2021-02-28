
export default {
    SET_ARTICLES: (state, articles) => {
        for (const article of articles) {
            state.articles.push(article)
        }
    },
    SET_ERROR: (state, message) => {
        state.error = message
    },
}