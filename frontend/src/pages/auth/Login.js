import React, {useEffect, useState} from "react";
import Logo from "../../images/limitless/logo.png";
import LogoDark from "../../images/limitless/logo-dark.png";
import Head from "../../layout/head";
import AuthFooter from "./AuthFooter";
import {
    Block,
    BlockContent,
    BlockDes,
    BlockHead,
    BlockTitle,
    Button,
    Icon,
    PreviewCard, toastError, toastSuccess,
} from "../../components";
import {Spinner} from "reactstrap";
import {Link, Navigate, useLocation} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {loginUser, resetAuth} from "../../redux/auth/actions";

const Login = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => {
        return state.Auth
    });
    const [passState, setPassState] = useState(false);
    const {
        register,
        handleSubmit,
        getValues,
        formState: {errors}
    } = useForm();
    const onFormSubmit = () => {
        dispatch(loginUser(getValues('email'), getValues('password')));
    }
    const redirectUrl = '/'

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    return (
        <>
            {(state.userLoggedIn || state.user) && <Navigate to={redirectUrl}/>}
            {state.error && toastError(state.error)}
            <Head title="Masuk"/>
            <Block className="nk-block-middle nk-auth-body  wide-xs">
                <div className="brand-logo pb-4 text-center">
                    <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                        <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo"/>
                        <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark"/>
                    </Link>
                </div>
                <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                    <BlockHead>
                        <BlockContent>
                            <BlockTitle tag="h4">Masuk</BlockTitle>
                            <BlockDes>
                                <p>Masuk ke aplikasi menggunakan email & kata sandi anda.</p>
                            </BlockDes>
                        </BlockContent>
                    </BlockHead>
                    <form
                        className={{'form-validate': true, 'is-alter': ''}}
                        onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="form-group">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="email">
                                    Alamat Email
                                </label>
                            </div>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="Masukkan alamat email anda"
                                    className="form-control-lg form-control"
                                    {...register("email", {
                                        required: true,
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Alamat email tidak valid",
                                        },
                                    })}
                                />
                                {errors.email && errors.email.type === "required" &&
                                    <span className="invalid">Kolom tidak boleh kosong.</span>}
                                {errors.email && errors.email.type === "pattern" && (
                                    <span className="invalid">{errors.email.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="password">
                                    Kata Sandi
                                </label>
                                <Link className="link link-primary link-sm"
                                      to={`${process.env.PUBLIC_URL}/reset-sandi`}>
                                    Lupa Sandi?
                                </Link>
                            </div>
                            <div className="form-control-wrap">
                                <a
                                    href="#password"
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        setPassState(!passState);
                                    }}
                                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                                >
                                    <Icon name="eye" className="passcode-icon icon-show"></Icon>
                                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                                </a>
                                <input
                                    type={passState ? "text" : "password"}
                                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                                    id="password"
                                    placeholder="Masukkan Kata Sandi anda"
                                    {...register('password', {
                                        required: true
                                    })}
                                />
                                {errors.password && <span className="invalid">Kolom tidak boleh kosong.</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <Button size="lg" className="btn-block" type="submit" color="primary">
                                {state.loading ? <Spinner size="sm" color="light"/> : "MASUK"}
                            </Button>
                        </div>
                    </form>
                    <div className="form-note-s2 text-center pt-4">
                        Belum punya akun? <Link to={`${process.env.PUBLIC_URL}/pendaftaran`}>Buat Akun</Link>
                    </div>
                </PreviewCard>
                <ToastContainer/>
            </Block>
            <AuthFooter/>
        </>
    );
};
export default Login;
