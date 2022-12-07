import axios from "axios";

const API_URL = "https://ezmeet2022.herokuapp.com/user/";

class AuthService {
    login(username: String, password: String) {
        return axios
            .post(API_URL + "login/" + username + "/", {
            username: username,
            password: password
        })
            .then(response => {
        if (response.data.success === true) {
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log(response.data);
        } 
        return response.data;
        });
    }

    logout() {
        console.log("Logging out")
        localStorage.removeItem("user");
        window.location.reload();
    }

    register(username: string, email: string, password: string) {
        return axios.post(API_URL + "register/" + username + "/", {
            username: username,
            email: email,
            password: password
        })
            .then(response => {
        if (response.data.success === true) {
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log("success register" + response.data);
        }
        return response.data;});
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);

        return null;
    }

    getCurrentUsername() {
        const userStr = localStorage.getItem("user");
        console.log("userStr is" + userStr);
        if (userStr) {
            let userNameStr = JSON.parse(userStr);
            if (userNameStr.success === true) {
                return userNameStr.data.username;
            } 
        }
        return null;
    }
}

export default new AuthService();