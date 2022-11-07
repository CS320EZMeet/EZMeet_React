import axios from "axios";

const API_URL = "https://ezmeet2022.herokuapp.com/user/";

class AuthService {
    login(username: String) {
        return axios
            .post(API_URL + "login/" + username + "/", {
            username,
        })
            .then(response => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log(response.data);
        }
        return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    // register(username: string, email: string, password: string) {
    //     return axios.post(API_URL + "register", {
    //         username,
    //         email,
    //         password
    //     });
    // }

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);

        return null;
    }
}

export default new AuthService();