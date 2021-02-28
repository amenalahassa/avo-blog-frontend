export default {

    displayedArticles: (state) => {
        let displayed = []
        for (let i=0; i < process.env.VUE_APP_ARTICLES_DISPLAYED ; i++){
           displayed.push(state.articles[i])
        }
        return displayed
    },

    findArticles: (state) => (exp) => {
        return state.articles.filter((item) => {
            return item.title.toLowerCase().includes(exp.toLowerCase())
        })
    },

    errors : (state) => {
        return state.error
    }

}