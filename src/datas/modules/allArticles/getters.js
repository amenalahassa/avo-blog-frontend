export default {

    displayedArticles: (state) => {
        let displayed = []
        for (let i=0; i < process.env.VUE_APP_ARTICLES_DISPLAYED ; i++){
           displayed.push(state.all[i])
        }
        return displayed
    },

    findArticles: (state) => (exp) => {
        return state.all.filter((item) => {
            return item.title.toLowerCase().includes(exp.toLowerCase())
        })
    },

    getError : (state) => {
        return state.error
    },

    getAll: (state) => {
        return state.all
    }

}