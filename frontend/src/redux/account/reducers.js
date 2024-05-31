
// constants
import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_ACCOUNT,
    CREATE_ACCOUNT,
    UPDATE_ACCOUNT,
    DELETE_ACCOUNT,
    RESET,
} from './constants'
import {Core} from "../../helpers/api/core";

const api = new Core()

const INIT_STATE = {
    accounts: [],
    loading: false,
}

const Account = (state: State = INIT_STATE, action: any): any => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_ACCOUNT: {
                    return {
                        ...state,
                        accounts: action.payload.data,
                        loading: false,
                    }
                }
                case CREATE_ACCOUNT: {
                    return {
                        ...state,
                        loading: false,
                        account: action.payload.data,
                    }
                }
                case LOGOUT_USER: {
                    return {
                        ...state,
                        user: null,
                        loading: false,
                        userLogout: true,
                    }
                }
                case FORGOT_PASSWORD: {
                    return {
                        ...state,
                        resetPasswordSuccess: action.payload.data,
                        loading: false,
                        passwordReset: true,
                    }
                }
                default:
                    return { ...state }
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case LOGIN_USER: {
                    return {
                        ...state,
                        error: action.payload.error,
                        userLoggedIn: false,
                        loading: false,
                    }
                }
                case SIGNUP_USER: {
                    return {
                        ...state,
                        registerError: action.payload.error,
                        userSignUp: false,
                        loading: false,
                    }
                }
                case FORGOT_PASSWORD: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                        passwordReset: false,
                    }
                }
                default:
                    return { ...state }
            }

        case LOGIN_USER:
            return { ...state, loading: true, userLoggedIn: false }
        case LOGOUT_USER:
            return { ...state, loading: true, userLogout: false }
        case RESET:
            return {
                ...state,
                loading: false,
                error: false,
                userSignUp: false,
                userLoggedIn: false,
                passwordReset: false,
                passwordChange: false,
                resetPasswordSuccess: null,
            }
        default:
            return { ...state }
    }
}

export default Account;