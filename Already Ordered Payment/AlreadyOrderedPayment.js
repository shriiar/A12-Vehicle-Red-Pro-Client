import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HelmetTitle from '../../Shared/HelmetTitle/HelmetTitle';
import Loading from '../../Shared/Loading/Loading';
import CheckoutForm from '../Purchase/CheckoutForm';
import './AlreadyOrderedPayment.css'

const stripePromise = loadStripe(process.env.REACT_APP_stripe_key);

const AlreadyOrderedPayment = () => {
    const { id } = useParams();
    // useEffect(() => {
    //     fetch(`https://vast-tor-89247.herokuapp.com/orderedProducts/${id}`, {
    //         method: 'GET',
    //         headers: {
    //             'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => setProduct(data))
    // }, [])

    // console.log(product);

    // if (product === [] || product === undefined) {
    //     return <Loading></Loading>
    // }

    const url = `https://vast-tor-89247.herokuapp.com/orderedProducts/${id}`;
    const { data: product, isLoading } = useQuery(['orderedProducts', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    console.log(product[0]);

    const { userName, name, description, price, totalPrice, img, paid } = product[0];

    return (
        <div>
            <div>
                <HelmetTitle title='Add To Inventory'></HelmetTitle>
                <div style={{ margin: "0 0 1050px 0" }} class="">
                    <div class="">

                        <div class="">
                            <div className='p-5'>
                                <div class="container-order">
                                    <div class="card-order">
                                        <div class="card-header-order">
                                            <img src={img} alt="rover" />
                                        </div>
                                        <div class="card-body-order">
                                            <h2 className='fs-4 my-3'>{userName}</h2>
                                            <span class="tag-order tag-teal-order">{name}</span>
                                            <h2 className='fs-4 my-3'>{description}</h2>
                                            <h2 className='fs-6 my-3'>Price: ${totalPrice}</h2>
                                        </div>
                                        <Elements className='w-75' stripe={stripePromise}>
                                            <CheckoutForm product={product[0]} />
                                        </Elements>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default AlreadyOrderedPayment;