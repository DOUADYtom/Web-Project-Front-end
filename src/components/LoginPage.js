import '../style/App.css'
import '../style/Form.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/AuthSlice';
import { useLoginMutation } from '../features/auth/AuthApiSlice';

const LoginPage = () => {

    const [seePassword, setSeePassword] = useState(false);
    const [emailError, setEmailError] = useState(0);
    const [passwordError, setPasswordError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checkLogin, {isLoading}] = useLoginMutation();

    if (isLoading) {
        return <p>Loading...</p>
    }

    //eslint-disable-next-line
    const emailExp = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

    const login = async () => {
        let emailErrorValue = 0;
        let passwordErrorValue = false;

        if(email === ""){
            emailErrorValue = 1;
        }else if(!emailExp.test(email)){
            emailErrorValue = 2;
        }

        if(password === ""){
            passwordErrorValue = true;
        }
        if(!passwordErrorValue && !emailErrorValue){
            try{
                const { accessToken } = await checkLogin({ email, password }).unwrap();
                dispatch(setCredentials({ accessToken }))
                navigate("/");
            } catch (err) {
                emailErrorValue=3;
            }
        }
        setEmailError(emailErrorValue);
        setPasswordError(passwordErrorValue);
        setPassword("");
        
    };

    const changeEmail = (e) => {
        if(emailError){
            setEmailError(0);
        }
        setEmail(e.target.value.toLowerCase());
    }

    const changePassword = (e) => {
        if(passwordError){
            setPasswordError(false);
        }
        setPassword(e.target.value);
    }

    return (
    <div className="login-page">
        <div className="login-page-form">
            <div className="form">

                <div className="form-input-text">
                    <div className="form-input-text-label">
                        <label className="form-input-text-label-text">Email:</label>
                    </div>
                    <div className={"form-input-text-textarea"+(emailError?" form-input-text-textarea-incorrect":"")}>
                        <input className="form-input-text-textarea-input" type="text" value={email} onChange={changeEmail} tabIndex="1"/>
                        {emailError?
                        <div className="form-input-text-textarea-iconarea">
                            <FontAwesomeIcon className="form-input-text-textarea-icon-incorrect" icon={faExclamationCircle}/>
                        </div>:<></>}
                    </div>
                    {emailError===1?<p className="form-input-text-incorrect">Email cannot be empty</p>:<></>}
                    {emailError===2?<p className="form-input-text-incorrect">The email is not a valid email address</p>:<></>}
                    {emailError===3?<p className="form-input-text-incorrect">The email or password is incorrect</p>:<></>}
                </div>

                <div className="form-input-text">
                    <div className="form-input-text-label">
                        <label className="form-input-text-label-text">Password:</label>
                        <Link to="/forgot_password" className="form-input-text-label-link" tabIndex="4">Forgot password?</Link>
                    </div>
                    <div className={"form-input-text-textarea"+(passwordError?" form-input-text-textarea-incorrect":"")}>
                        <input className="form-input-text-textarea-input" type={seePassword?"text":"password"} value={password} onChange={changePassword} tabIndex="2"/>
                        <button className="form-input-text-textarea-iconarea" onClick={() => setSeePassword((previous) => !previous)} tabIndex="5">
                            { seePassword?
                                <FontAwesomeIcon className="form-input-text-textarea-icon-eye" icon={faEyeSlash}/>
                                :
                                <FontAwesomeIcon className="form-input-text-textarea-icon-eye" icon={faEye}/>
                            }
                        </button>
                        {passwordError?
                        <div className="form-input-text-textarea-iconarea">
                            <FontAwesomeIcon className="form-input-text-textarea-icon-incorrect" icon={faExclamationCircle}/>
                        </div>:<></>}
                    </div>
                    {passwordError?<p className="form-input-text-incorrect">Password cannot be empty</p>:<></>}
                </div>

                <button className="form-button" onClick={()=>{login();}} tabIndex="3">Log in</button>
            </div>
        </div>

        <div className="login-to-register">
            <p>Don’t have an account?</p>
            <Link to="/register" tabIndex="6">Sign up</Link>
        </div>
    </div>
    );
};

export default LoginPage;