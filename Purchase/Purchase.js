import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import HelmetTitle from '../../Shared/HelmetTitle/HelmetTitle';
import addImg from '../../../img/undraw_Add_files_re_v09g.png';
import { useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import Loading from '../../Shared/Loading/Loading';
import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import './Purchase.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

const stripePromise = loadStripe(process.env.REACT_APP_stripe_key);

const Purchase = () => {
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, [])

    const [newUser, setNewUser] = useState([]);
    useEffect(() => {
        fetch(`https://vast-tor-89247.herokuapp.com/users?email=${user?.email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setNewUser(data))
    }, [user]);

    useEffect(() => {
        fetch(`https://vast-tor-89247.herokuapp.com/products?id=${id}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    // console.log(products);

    const { data: item, isLoading } = useQuery(['products', id], () => fetch(`https://vast-tor-89247.herokuapp.com/products?&id=${id}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    const { name, description, price, productCode, quantity, img, minQuantity } = item[0];

    const onSubmit = async data => {
        console.log(data);

        const prevQuantity = parseInt(item[0]?.quantity);
        const newQuantity = parseInt(data.quantity);

        console.log(prevQuantity, newQuantity);

        if (data.quantity === '' || data.quantity === undefined) {
            return toast.error('Empty Quantity');
        }

        else if (newQuantity < minQuantity) {
            reset();
            return toast.error('Minimum Quantity has to be 50');
        }

        else if (newQuantity > prevQuantity) {
            reset();
            return toast.error('Quantity exeeded');
        }

        console.log(prevQuantity, newQuantity);

        if (newQuantity > prevQuantity) {
            return toast.error('Quantity Excedded');
        }

        const product = {
            userName: user?.displayName,
            phone: newUser[0]?.phone,
            adress: newUser[0]?.adress,
            name: item[0]?.name,
            email: user?.email,
            description: item[0]?.description,
            price: item[0]?.price,
            totalPrice: parseInt(parseInt(newQuantity) * parseInt(item[0]?.price)),
            productCode: item[0]?.productCode,
            quantity: newQuantity,
            img: item[0].img,
            status: 'Pending',
            paid: false
        }

        const oldProduct = {
            name: item[0]?.name,
            description: item[0]?.description,
            price: item[0]?.price,
            productCode: item[0]?.productCode,
            quantity: parseInt(prevQuantity - newQuantity),
            minQuantity: minQuantity,
            img: item[0].img,
        }

        fetch(`https://vast-tor-89247.herokuapp.com/orders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Order Placed, Check My Orders in Dashboard for payment procedure');
            });

        fetch(`https://vast-tor-89247.herokuapp.com/products/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(oldProduct)
        })
            .then(res => res.json())
            .then(data => {
                fetch(`https://vast-tor-89247.herokuapp.com/products`, {
                    method: 'GET',
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(newData => setProducts(newData))
            });
        reset();
    }

    return (
        <div>
            <div>
                <HelmetTitle title='Add To Inventory'></HelmetTitle>
                <div style={{ margin: "0 0 1050px 0" }} class="page-add">
                    <div data-aos='fate-left' class="container-add-purchase">
                        <div class="left-add-purchase">
                            <div class="login">Purchase {item.name}</div>
                            <img src={addImg} className='img-fluid' alt="" />
                        </div>

                        <div data-aos='fate-right' class="right-add-purchase">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className='p-5'>
                                    <div class="container-purchase">
                                        <div class="card-purchase">
                                            <div class="card-header-purchase">
                                                <img src={img} alt="rover" />
                                            </div>
                                            <div class="card-body-purchase">
                                                <h2 className='fs-4 my-3'>{name}</h2>
                                                <h2 className='fs-5'>Per Product Price: <span class="tag-purchase tag-teal-purchase fs-5">${price}</span></h2>
                                                <h2 className='fs-4 my-3'>{description}</h2>
                                                <h5>Quantity Available <span class="tag-purchase tag-teal-purchase fs-5"> {quantity}</span></h5>
                                                <h5>Minimum Quantity <span class="tag-purchase tag-teal-purchase fs-5"> {minQuantity}</span></h5>
                                            </div>
                                            <div className="input-group w-75 mx-auto">
                                                <label className="label">
                                                    <span className="label-text">Quantity</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Product Quantity"
                                                    min={minQuantity}
                                                    defaultValue={minQuantity}
                                                    className="input input-bordered w-full max-w-xs"
                                                    {...register("quantity", {
                                                        required: {
                                                            value: true,
                                                            message: 'Product Quantity is Required'
                                                        }
                                                    })}
                                                />
                                                <label className="label">
                                                    {errors.quantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.quantity.message}</span>}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <input className='form-submit button-33 w-50 mx-auto mt-4' type="submit" value="Purchase" />
                            </form>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};
export default Purchase;