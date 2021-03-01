import actions from "@/datas/modules/allArticles/actions";
import getters from "@/datas/modules/allArticles/getters";
import mutations from "@/datas/modules/allArticles/mutations";

export default {
    namespace: true,
    state: () => ({
        all: [],
        error: ""
    }),
    actions,
    getters,
    mutations
}