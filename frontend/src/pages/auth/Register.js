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
    PreviewCard,
} from "../../components";
import {Link} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {resetAuth, signupUser} from "../../redux/auth/actions";
import type {RootState} from "../../redux/store";
import classNames from "classnames";
import {useForm} from "react-hook-form";

const Register = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => {
        return state.Auth
    });
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: ''
    })
    const [passState, setPassState] = useState(false);
    const [rePassState, setRePassState] = useState(false);
    const handleFormInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const formClass = classNames({
        "form-validate": true,
        "is-alter": '',
    });
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onFormSubmit = (e) => {
        // dispatch(signupUser(formData.fullname, formData.email, formData.password, formData.password_confirmation, formData.phone));
    }
    // useEffect(() => {
    //     dispatch(resetAuth());
    // }, [dispatch]);
    return (
        <>
            <Head title="Pendaftaran"/>
            <ToastContainer/>
            <Block className="nk-block-middle nk-auth-body  wide-xs">
                <div className="brand-logo pb-4 text-center">
                    <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
                        <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo"/>
                        <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark"/>
                    </Link>
                </div>
                <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                    <BlockHead>
                        <BlockContent>
                            <BlockTitle tag="h4">Pendaftaran</BlockTitle>
                            <BlockDes>
                                <p>Buat akun baru Limitless Apps</p>
                            </BlockDes>
                        </BlockContent>
                    </BlockHead>
                    <form
                        className={{'form-validate': true, 'is-alter': ''}}
                        onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="fullname">
                                Nama Lengkap
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="fullname"
                                    placeholder="Masukkan nama lengkap"
                                    className="form-control-lg form-control"
                                    {...register("fullname", {required: true})}
                                />
                                {errors.fullname && <span className="invalid">Kolom tidak boleh kosong.</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="email">
                                    Email Anda
                                </label>
                            </div>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="email"
                                    bssize="lg"
                                    placeholder="Masukkan alamat email"
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
                                <label className="form-label" htmlFor="phone">
                                    Nomor WA
                                </label>
                            </div>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="phone"
                                    bssize="lg"
                                    className="form-control-lg form-control"
                                    placeholder="Masukkan nomor WA"
                                    {...register('phone', {
                                        required: true
                                    })}
                                />
                                {errors.phone && <span className="invalid">Kolom tidak boleh kosong.</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="password">
                                    Kata Sandi
                                </label>
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
                                    id="password"
                                    placeholder="Masukkan Kata Sandi"
                                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                                    {...register('password', {
                                        required: true
                                    })}
                                />
                                {errors.password && <span className="invalid">Kolom tidak boleh kosong.</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="repassword">
                                    Ulangi Sandi
                                </label>
                            </div>
                            <div className="form-control-wrap">
                                <a
                                    href="#repassword"
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        setRePassState(!rePassState);
                                    }}
                                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                                >
                                    <Icon name="eye" className="passcode-icon icon-show"></Icon>
                                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                                </a>
                                <input
                                    type={rePassState ? "text" : "password"}
                                    id="password_confirmation"
                                    placeholder="Ualngi sandi anda"
                                    className={`form-control-lg form-control ${rePassState ? "is-hidden" : "is-shown"}`}
                                    {...register('password_confirmation', {
                                        required: true,
                                    })}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <Button type="submit" color="primary" size="lg" className="btn-block">
                                DAFTAR
                            </Button>
                        </div>
                    </form>
                    <div className="form-note-s2 text-center pt-4">
                        {" "}
                        Sudah punya akun?{" "}
                        <Link to={`${process.env.PUBLIC_URL}/masuk`}>
                            <strong>Masuk</strong>
                        </Link>
                    </div>
                </PreviewCard>
            </Block>
            <AuthFooter/>
            <ToastContainer/>
        </>
    );
};
export default Register;
