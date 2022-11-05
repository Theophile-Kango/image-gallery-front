import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = value => {
    if(!value){
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

const AuthForm = props => {
    const { actionName, link, linkText, auth, redirect, reset } = props;
    let navigate = useNavigate();

    const form = useRef();
    const CheckBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeEmail = e => {
        const email = e.target.value;
        setEmail(email);
    }

    const onChangePassword = e => {
        const password = e.target.value;
        setPassword(password);
    }

    const onChangePasswordConfirmation = e => {
        const passwordConfirmaton = e.target.value;
        setPasswordConfirmation(passwordConfirmaton);
    }

    const handleLogin = e => {
        e.preventDefault();
        setLoading(true);

        form.current.validateAll();

        if(CheckBtn.current.context._errors.length === 0){
            dispatch(auth(email, password))
            .then(() => {
                setLoading(false);
                navigate("/images_gallery");
                if(redirect)  {
                    setEmail("");
                    setPassword("");
                }else{
                    window.location.reload();
                }
            })
            .catch(() => {
                setLoading(false);
            });
        }else{
            setLoading(false);
        }
    }

    const handleReset = e => {
        e.preventDefault();
        setLoading(true);

        form.current.validateAll();

        if(CheckBtn.current.context._errors.length === 0){
            dispatch(auth(password, passwordConfirmation))
            .then(() => {
                setLoading(false);
                navigate("/");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
        }else{
            setLoading(false);
        }
    }

    if(isLoggedIn && !reset) {
        return <Navigate to="/" />;
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <h2>{actionName}</h2>
                <Form onSubmit={!reset ? handleLogin : handleReset} ref={form}>
                    {!reset && (
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input
                                type="email"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={onChangeEmail}
                                validations={[required]}
                            />
                        </div>
                    )}
                        
                    <div className="form-group">
                        <label htmlFor="email">Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>

                    {reset && (
                        <div className="form-group">
                            <label htmlFor="email">Password Confirmation</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password_confirmation"
                                value={passwordConfirmation}
                                onChange={onChangePasswordConfirmation}
                                validations={[required]}
                            />
                        </div>
                    )}
                        

                    <a href={link}>{linkText}</a>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>{actionName}</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={CheckBtn} />
                </Form>
            </div>
        </div>
    )
};

export default AuthForm;