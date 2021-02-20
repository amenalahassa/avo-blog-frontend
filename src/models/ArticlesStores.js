import axios from "axios"

let url = "http://" + process.env.VUE_APP_SERVER_HOST + "/article"

const instance = axios.create({
    baseURL: url,
});

class Articles {

    static http = instance

    static getAll(source, onError){
        this.http.get("")
            .then((res) => {
                if (res.data.status.success)
                {
                    for (const article of res.data.data) {
                        source.push(article)
                    }
                }
                else {
                    onError(res.data.status.message)
                }
            })
            .catch((err) => {
                onError(err)
            })
    }

    // find(name, state)
    // {
    //
    // }
}


export default Articles