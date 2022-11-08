import axios from "axios";

const API_URL = "https://ezmeet2022.herokuapp.com/user/";

class AuthService {
    login(username: String) {
        return axios
            .post(API_URL + "login/" + username + "/", {
            username,
        })
            .then(response => {
        if (true) {
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log(response.data);
        }
        return response.data;
        });
    }

    logout() {
        console.log("HELLO")
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

    getCurrentUsername() {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            let userName = JSON.parse(userStr);
            return userName.data[0].username;
        }
        return null;
    }
}

export default new AuthService();