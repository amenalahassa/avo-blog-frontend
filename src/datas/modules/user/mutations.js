import {saveUserInLocal} from "@/module/biblio";

export default {

    SET_USER : (state, {token, name, id}) => {
        state.token = token
        state.name = name
        state.id = id
        saveUserInLocal({token, name, id})
    },

    DISCONNECT_USER : (state) => {
        state.token = ""
        state.name = ""
        localStorage.removeItem('user')
    }

}