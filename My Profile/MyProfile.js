import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import './MyProfile.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useForm } from 'react-hook-form';
import addImg from '../../../img/undraw_Add_files_re_v09g.png';
import { toast, ToastContainer } from 'react-toastify';
import defaultImg from '../../../img/icons8-account-100.png';

const MyProfile = () => {
    const [user, loading] = useAuthState(auth);
    const [newUser, setNewUser] = useState([]);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imageStorage_key = process.env.REACT_APP_imageStorage_key;

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, [])
    useEffect(() => {
        fetch(`https://vast-tor-89247.herokuapp.com/users?email=${user?.email}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setNewUser(data);
            })
    }, [user])
    if (loading) {
        return <Loading></Loading>
    }
    console.log(newUser);

    const onSubmit = async data => {

        // console.log(data);

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        console.log(image);

        const url = `https://api.imgbb.com/1/upload?key=${imageStorage_key}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.success) {
                    const img = result.data.url;
                    const updatedUser = {
                        name: newUser[0]?.name,
                        email: newUser[0]?.email,
                        adress: data.adress,
                        phone: data.phone,
                        password: newUser[0]?.password,
                        img: img,
                        role: newUser[0]?.role
                    }
                    console.log(updatedUser);
                    fetch(`https://vast-tor-89247.herokuapp.com/users?id=${newUser[0]?._id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(updatedUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success(`${updatedUser?.name} profile has been updated`);
                            fetch(`https://vast-tor-89247.herokuapp.com/users?email=${user?.email}`, {
                                method: 'GET',
                                headers: {
                                    'content-type': 'application/json',
                                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                                }
                            })
                                .then(res => res.json())
                                .then(data => {
                                    setNewUser(data);
                                })
                        });
                }
                // console.log(data);
                reset();
            })
    }

    return (
        <div data-aos='fade-right'>
            <div class="portfoliocard">
                <div class="coverphoto"></div>
                {
                    newUser[0]?.img ? <div class="profile_picture" style={{
                        backgroundImage: `url(${newUser[0]?.img})`
                    }}></div>
                        : <div class="profile_picture" style={{
                            backgroundImage: `url(${defaultImg})`
                        }}></div>
                }
                <div class="left_col">
                </div>
                <div class="right_col">
                    <h2 data-aos='fade-left' class="name">{user?.displayName}</h2>
                    <h3 data-aos='fade-left' class="location mt-2 fs-4">{newUser[0]?.adress}</h3>
                    <h3 data-aos='fade-left' class="location-user location fs-4">{newUser[0]?.email}</h3>
                    <h3 data-aos='fade-left' class="location-user location fs-4">{newUser[0]?.phone}</h3>
                </div>
            </div>
            <div style={{ margin: "0 0 1050px 0" }} class="page-add">
                <div class="container-add">
                    <div class="left-add">
                        <div class="login">Update Profile</div>
                        <img src={addImg} className='img-fluid' alt="" />
                    </div>

                    <div class="right-add d-flex align-items-center justify-content-center">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="input-group w-75 mx-auto">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Your Phone Number"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("phone", {
                                        required: {
                                            value: true,
                                            message: 'Phone is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.phone?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                                </label>
                            </div>

                            <div className="input-group w-75 mx-auto">
                                <label className="label">
                                    <span className="label-text">Adress</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your Adress"
                                    min={1}
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("adress", {
                                        required: {
                                            value: true,
                                            message: 'Adress is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.adress?.type === 'required' && <span className="label-text-alt text-red-500">{errors.adress.message}</span>}
                                </label>
                            </div>

                            <div className="input-group w-75 mx-auto">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input
                                    type="file"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("image", {
                                        required: {
                                            value: true,
                                            message: ' '
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.file?.type === 'required' && <span className="label-text-alt text-red-500">{errors.file.message}</span>}
                                </label>
                            </div>

                            <input className='form-submit button-33 w-75 mx-auto mt-4' type="submit" value="Update" />
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default MyProfile;