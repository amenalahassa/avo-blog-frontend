import actions from "@/datas/modules/oneArticle/actions";
import getters from "@/datas/modules/oneArticle/getters";
import mutations from "@/datas/modules/oneArticle/mutations";

export default {
    namespace: true,
    state: () => ({
        content : null,
        about: null,
        error:""
    }),
    actions,
    getters,
    mutations
}