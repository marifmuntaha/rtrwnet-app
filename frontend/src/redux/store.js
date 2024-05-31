import createSagaMiddleware from 'redux-saga';
import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import Auth from "./auth/reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
export const store = configureStore({
    reducer: {
        Auth: Auth
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>