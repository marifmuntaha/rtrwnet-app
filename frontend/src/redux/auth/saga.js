import { all, fork, put, takeEvery, call } from 'redux-saga/effects'
import { SagaIterator } from '@redux-saga/core'

import { Core, setAuthorization } from '../../helpers/api/core'

// helpers
import { login as loginApi, logout as logoutApi, signup as signupApi, forgotPassword as forgotPasswordApi } from '../../helpers/api/auth'

import { authApiResponseSuccess, authApiResponseError } from './actions'

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

const api = new Core();

function* login({ payload: { email, password } }): SagaIterator {
    console.log(email)
    try {
        const response = yield call(loginApi, { email, password })
        const user = response.data.result
        api.setLoggedInUser(user)
        setAuthorization(user['token'])
        yield put(authApiResponseSuccess(LOGIN_USER, user))
    } catch (error) {
        yield put(authApiResponseError(LOGIN_USER, error))
        api.setLoggedInUser(null)
        setAuthorization(null)
    }
}

function* logout(): SagaIterator {
    try {
        yield call(logoutApi)
        api.setLoggedInUser(null)
        setAuthorization(null)
        yield put(authApiResponseSuccess(LOGOUT_USER, {}))
    } catch (error) {
        yield put(authApiResponseError(LOGOUT_USER, error))
    }
}

function* signup({ payload: { fullname, email, password, password_confirmation, phone } }): SagaIterator {
    try {
        const response = yield call(signupApi, { fullname, email, password, password_confirmation, phone })
        const user = response.data
        yield put(authApiResponseSuccess(SIGNUP_USER, user))
    } catch (error) {
        yield put(authApiResponseError(SIGNUP_USER, error))
        api.setLoggedInUser(null)
        setAuthorization(null)
    }
}

function* forgotPassword({ payload: { username } }: UserData): SagaIterator {
    try {
        const response = yield call(forgotPasswordApi, { username })
        yield put(authApiResponseSuccess(FORGOT_PASSWORD, response.data))
    } catch (error) {
        yield put(authApiResponseError(FORGOT_PASSWORD, error))
    }
}
export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login)
}

export function* watchLogout() {
    yield takeEvery(LOGOUT_USER, logout)
}

export function* watchSignup(): any {
    yield takeEvery(SIGNUP_USER, signup)
}

export function* watchForgotPassword(): any {
    yield takeEvery(FORGOT_PASSWORD, forgotPassword)
}

function* authSaga() {
    yield all([fork(watchLoginUser), fork(watchLogout), fork(watchSignup), fork(watchForgotPassword)])
}

export default authSaga