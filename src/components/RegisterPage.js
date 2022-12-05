import '../style/App.css'
import '../style/Form.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useAddNewUserMutation } from '../features/user/UserApiSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(0);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(0);
    const [seePassword, setSeePassword] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(0);
    const [sendUser] = useAddNewUserMutation();
    const naviagte = useNavigate();
    
    //eslint-disable-next-line
    const emailExp = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

    const changeName = (e) => {
        if(nameError){
            setNameError(0);
        }
        setName(e.target.value);
    }

    const changeEmail = (e) => {
        if(emailError){
            setEmailError(0);
        }
        setEmail(e.target.value.toLowerCase());
    }

    const changePassword = (e) => {
        if(passwordError){
            setPasswordError(0);
        }
        setPassword(e.target.value);
    }

    const register = () => {
        try{
            sendUser({username:name, email, password});
            naviagte("/login");
        } catch(err){
            setNameError(1);
        }
    }

    return (
    <div className="login-page">
        <div className="login-page-form">
            <div className="form">

                <div className='form-title'>Register:</div>

                <div className="form-input-text">
                    <div className="form-input-text-label">
                        <label className="form-input-text-label-text">Name:</label>
                    </div>
                    <div className={"form-input-text-textarea"+(nameError?" form-input-text-textarea-incorrect":"")}>
                        <input className="form-input-text-textarea-input" type="text" value={name} maxLength="30" onChange={changeName} tabIndex="1"/>
                        {nameError?
                        <div className="form-input-text-textarea-iconarea">
                            <FontAwesomeIcon className="form-input-text-textarea-icon-incorrect" icon={faExclamationCircle}/>
                        </div>:<></>}
                    </div>
                    {nameError===1?<p className="form-input-text-incorrect">Name cannot be empty</p>:<></>}
                    {nameError===2?<p className="form-input-text-incorrect">Name must be at least 4 characters long</p>:<></>}
                    {nameError===3?<p className="form-input-text-incorrect">Name must be max 30 characters long</p>:<></>}
                    {nameError===4?<p className="form-input-text-incorrect">The name is already taken</p>:<></>}
                </div>

                <div className="form-input-text">
                    <div className="form-input-text-label">
                        <label className="form-input-text-label-text">Email:</label>
                    </div>
                    <div className={"form-input-text-textarea"+(emailError?" form-input-text-textarea-incorrect":"")}>
                        <input className="form-input-text-textarea-input" type="text" value={email} onChange={changeEmail} tabIndex="2"/>
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
                    </div>
                    <div className={"form-input-text-textarea"+(passwordError?" form-input-text-textarea-incorrect":"")}>
                        <input className="form-input-text-textarea-input" type={seePassword?"text":"password"} value={password} onChange={changePassword} tabIndex="3"/>
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

                <button className="form-button" onClick={()=> register()} tabIndex="4">Create account</button>
            </div>
        </div>
    </div>
    );
};

export default RegisterPage;