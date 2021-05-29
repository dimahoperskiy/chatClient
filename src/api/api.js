import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8093/",
    withCredentials: true
})

const api = {
    login(formData) {
        return instance.post("login",
            {login: formData.login, password: formData.password})
            .then(response => response.data)
    },
    register(formData) {
        return instance.post("register",
            {login: formData.login, email: formData.email, password: formData.password})
    },
    logout() {
        return instance.get("exit")
    },
    getProfile() {
        return instance.get("users/profile")
            .then(response => response.data)
    },
    getUser(id) {
        return instance.get("users/" + id)
            .then(response => response.data)
    },
    getAllUsers() {
        return instance.get("users")
            .then(response => response.data)
    },
    getPageableUsers(pageSize, currentPage) {
        return instance.get(`users/?size=${pageSize}&page=${currentPage}`)
            .then(response => response.data)
    },
    getChatMessages(id, userId) {
        return instance.get("messages/" + id + "/" + userId)
            .then(response => response.data)
    },
    getMessage(id) {
        return instance.get("messages/" + id)
            .then(response => response.data)
    }
}

export default api