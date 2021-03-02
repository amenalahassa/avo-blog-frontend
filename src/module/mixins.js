import store from "@/datas/store";

export const commentMixin = {
    store,
    data() {
        return {
            message: "",
            commentingResult: undefined,
            commentingMessage: ""
        }
    }
}