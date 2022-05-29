import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
import auth from '../../../firebase.init'
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Shared/Loading/Loading';
import useToken from '../../../Hooks/useToken';
import carPng from '../../../img/undraw_electric_car_b7hl.png';
import HelmetTitle from '../../Shared/HelmetTitle/HelmetTitle';
import SocialLogin from '../Social Login/SocialLogin';

const Login = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [student, setStudent] = useState([]);


    let from = location.state?.from?.pathname || "/";
    let errorElement = <></>;

    const eventSetEmail = (event) => {
        setEmail(event.target.value);
    }

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    useEffect(() => {
        fetch(`https://vast-tor-89247.herokuapp.com/users?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setStudent(data))
    }, [user])


    const [token] = useToken(user);

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    if (loading) {
        return <Loading></Loading>
    }

    if (token) {
        navigate(from, { replace: true });
    }

    const EventSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await signInWithEmailAndPassword(email, password);
    };

    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email !== "") {
            await sendPasswordResetEmail(email);
            toast("Email Sent");
        } else {
            toast.error("please enter your email address", {
                theme: "colored",
            });
        }
    };
    if (error) {
        errorElement = <div className='my-3'>
            <p className="text-danger"> {error?.message}</p>
        </div>
    }
    return (
        <div>
            <HelmetTitle title='Login'></HelmetTitle>
            <div class="page">
                <div class="container-login">
                    <div class="left">
                        <div class="login">Login</div>
                        <img src={carPng} className='img-fluid' alt="" />
                    </div>
                    <div class="right">
                        <form onSubmit={EventSubmit}>
                            <div className="input-group mb-0 w-75 mx-auto">
                                <label htmlFor='email'>Email</label>
                                <input onBlur={eventSetEmail} ref={emailRef} type="email" name="email" id='email' required />
                            </div>
                            <div className="input-group w-75 mx-auto">
                                <label htmlFor='password'>Password</label>
                                <input ref={passwordRef} type="password" name="password" id='password' />
                            </div>
                            <button className='form-link bg-transparent border-0 mb-3 w-100' onClick={resetPassword}>Reset Password</button>

                            <input className='form-submit button-33 mx-auto w-75' type="submit" required value="Login" />
                        </form>
                    </div>
                    <ToastContainer />
                </div>
                <div className='mx-auto' style={{ margin: "220px 0 0 0" }}>
                    {errorElement}
                    <p className='my-3 fs-5'>
                        New User? <Link className='form-link' to='/signup'>Sign Up</Link>
                    </p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div >
    );

};

export default Login;