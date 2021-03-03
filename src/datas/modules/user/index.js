import actions from "@/datas/modules/user/actions";
import getters from "@/datas/modules/user/getters";
import mutations from "@/datas/modules/user/mutations";

export default {
    namespace: true,
    state: () => ({
        id: "",
        name: "",
        token: ""
    }),
    actions,
    getters,
    mutations
}