import { createStore } from 'vuex'
import oneArticle from '@/datas/modules/oneArticle/index';
import allArticle from '@/datas/modules/allArticles/index';


export default createStore({
    modules : {
        oneArticle,
        allArticle,
    },
    strict: true
})