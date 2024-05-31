import {Core} from "./core";

const api = new Core()

// account
function login(params: {email: string, password: string}) {
    const baseUrl = '/login/'
    return api.create(`${baseUrl}`, params)
}

function logout() {
    const baseUrl = '/logout/'
    return api.create(`${baseUrl}`, {})
}

function signup(params: { fullname: string, email: string, password: string, password_confirmation: string, phone: string }) {
    const baseUrl = '/auth/register'
    return api.create(`${baseUrl}`, params)
}

function forgotPassword(params: { email: string }) {
    const baseUrl = '/forgot-password/'
    return api.create(`${baseUrl}`, params)
}

export { login, logout, signup, forgotPassword }