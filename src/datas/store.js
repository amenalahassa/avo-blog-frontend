import { createStore } from 'vuex'
import mutations from "@/datas/mutations";
import actions from "@/datas/actions";
import getters from "@/datas/getters";

export default createStore({
    state () {
        return {
            articles: [],
            error: ""
        }
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
})