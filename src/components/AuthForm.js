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
    const { actionName, link, linkText, auth, redirect } = props;
    let navigate = useNavigate();

    const form = useRef();
    const CheckBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    if(isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <h2>{actionName}</h2>
                <Form onSubmit={handleLogin} ref={form}>
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