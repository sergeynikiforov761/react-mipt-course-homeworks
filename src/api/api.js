import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://react-mipt-course-server.herokuapp.com/'

})

export const LoginAPI = {

    postLogin(login, password) {
        let cred = {login, password}
        return instance.post("auth/login", cred)
            .then(response => {
                return response;
            })

    }
}