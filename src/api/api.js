import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: '/'

})

export const authAPI = {

    login(email, password) {
        let cred = {email, password}
        return instance.post("auth/login", cred)
            .then(response => {
                return response;
            })

    },
    logout(){
        return instance.delete("auth/login") //на будущее, для удаления куки
    }

}

export const boardAPI = {
    getBoard(boardId){
        let cred = null
        return instance.get("board/"+boardId)
            .then(response => {
                return response;
            })
    }
}