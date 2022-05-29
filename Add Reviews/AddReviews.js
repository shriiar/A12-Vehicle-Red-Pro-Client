import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import HelmetTitle from '../../Shared/HelmetTitle/HelmetTitle';
import addImg from '../../../img/undraw_Add_files_re_v09g.png';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const AddReviews = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [user, loading] = useAuthState(auth);
    const [newUser, setNewUser] = useState([]);
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
                console.log(data);
                setNewUser(data);
            })
    }, [user])

    if (loading) {
        return <Loading></Loading>
    }

    const onSubmit = async data => {

        console.log(newUser);

        const review = {
            userName: user?.displayName,
            email: newUser[0]?.email,
            img: newUser[0]?.img,
            name: data.name,
            description: data.description,
            rating: data.rating
        }

        console.log(review);

        fetch(`https://vast-tor-89247.herokuapp.com/reviews`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                toast.success(`Review have been added`)
            });

        reset();

    }
    return (
        <div>
            <HelmetTitle title='Add To Inventory'></HelmetTitle>
            <div style={{ margin: "0 0 1050px 0" }} class="page-add">
                <div class="container-add">
                    <div class="left-add">
                        <div class="login">Add Reviews</div>
                        <img src={addImg} className='img-fluid' alt="" />
                    </div>

                    <div class="right-add d-flex align-items-center justify-content-center">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="input-group w-100 mx-auto px-2">
                                <label className="label">
                                    <span className="label-text">Review On</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Product Name is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div>

                            <div className="input-group w-100 mx-auto px-2">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    type="text"
                                    placeholder="Product Description"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("description", {
                                        required: {
                                            value: true,
                                            message: 'Product Description is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.description?.type === 'required' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
                                </label>
                            </div>

                            <div className="input-group w-100 mx-auto px-2">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Rating"
                                    min={1}
                                    max={5}
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("rating", {
                                        required: {
                                            value: true,
                                            message: 'rating is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.rating?.type === 'required' && <span className="label-text-alt text-red-500">{errors.rating.message}</span>}
                                </label>
                            </div>

                            <input className='form-submit button-33 w-100 mx-auto mt-4' type="submit" value="Add Review" />
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AddReviews;