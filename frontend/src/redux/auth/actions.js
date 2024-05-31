// constants
import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    SIGNUP_USER,
    LOGIN_USER,
    LOGOUT_USER,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_CHANGE,
    RESET,
} from './constants'

// common success
export const authApiResponseSuccess = (actionType: string, data: UserData | {}): AuthActionType => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
})
// common error
export const authApiResponseError = (actionType: string, error: string): AuthActionType => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
})

export const loginUser = (username: string, password: string): AuthActionType => ({
    type: LOGIN_USER,
    payload: { username, password },
})

export const logoutUser = (): AuthActionType => ({
    type: LOGOUT_USER,
    payload: {},
})

export const signupUser = (fullname: string, email: string, password: string, password_confirmation: string, phone: string) => ({
    type: SIGNUP_USER,
    payload: { fullname, email, password, password_confirmation, phone},
})

export const forgotPassword = (username: string): AuthActionType => ({
    type: FORGOT_PASSWORD,
    payload: { username },
})

export const resetAuth = (): AuthActionType => ({
    type: RESET,
    payload: {},
})