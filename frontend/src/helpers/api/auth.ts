import { APICore } from './apiCore'

const api = new APICore()

// account
function login(params: { username: string; password: string }) {
    const baseUrl = '/api/login'
    return api.create(`${baseUrl}`, params)
}

function logout() {
    const baseUrl = '/api/logout/'
    return api.create(`${baseUrl}`, {})
}

function signup(params: { fullname: string; email: string; password: string }) {
    const baseUrl = '/api/register/'
    return api.create(`${baseUrl}`, params)
}

function forgotPassword(params: { username: string }) {
    const baseUrl = '/api/forgot-password/'
    return api.create(`${baseUrl}`, params)
}

export { login, logout, signup, forgotPassword }
