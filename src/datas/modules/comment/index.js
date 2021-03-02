import actions from "@/datas/modules/comment/actions";
import getters from "@/datas/modules/comment/getters";
import mutations from "@/datas/modules/comment/mutations";

export default {
    namespace: true,
    state: () => ({
        id: "",
        user : "",
        date: "",
        message: "",
        reply: []
    }),
    actions,
    getters,
    mutations
}