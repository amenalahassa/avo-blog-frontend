import { createStore } from 'vuex'
import oneArticle from '@/datas/modules/oneArticle/index';
import allArticle from '@/datas/modules/allArticles/index';
import user from '@/datas/modules/user/index';


export default createStore({
    modules : {
        oneArticle,
        allArticle,
        user
    },
    strict: true
})