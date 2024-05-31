import {Core} from "./core";

const api = new Core()

// account
function login(params= {email, password}) {
    const baseUrl = '/login/'
    return api.create(`${baseUrl}`, params)
}

function logout() {
    const baseUrl = '/logout/'
    return api.create(`${baseUrl}`, {})
}

function signup(params = { name, email, password, password_confirmation }) {
    const baseUrl = '/register/'
    return api.create(`${baseUrl}`, params)
}

function forgotPassword(params= { email }) {
    const baseUrl = '/forgot-password/'
    return api.create(`${baseUrl}`, params)
}

export { login, logout, signup, forgotPassword }