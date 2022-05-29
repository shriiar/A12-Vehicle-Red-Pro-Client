// import React, { useEffect, useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import auth from '../../../firebase.init';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useForm } from 'react-hook-form';

// const CheckoutForm = (props) => {
//     const [newUser, setNewUser] = useState([]);
//     const [user] = useAuthState(auth);
//     const stripe = useStripe();
//     const elements = useElements();
//     const [cardError, setCardError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [processing, setProcessing] = useState(false);
//     const [transactionId, setTransactionId] = useState('');
//     const [clientSecret, setClientSecret] = useState('');

//     const { _id, price, name, productCode } = props?.item;
//     let newPrice = parseInt(price);

//     console.log(newPrice, typeof newPrice);

//     useEffect(() => {
//         fetch(`https://vast-tor-89247.herokuapp.com/users?email=${user?.email}`, {
//             method: 'GET',
//             headers: {
//                 'content-type': 'application/json',
//                 authorization: `Bearer ${localStorage.getItem('accessToken')}`
//             }
//         })
//             .then(res => res.json())
//             .then(data => {
//                 setNewUser(data);
//             })
//     }, [user]);

//     console.log(newUser);

//     useEffect(() => {
//         fetch('https://vast-tor-89247.herokuapp.com/create-payment-intent', {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json',
//                 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
//             },
//             body: JSON.stringify({ price })
//         })
//             .then(res => res.json())
//             .then(data => {
//                 if (data?.clientSecret) {
//                     console.log(data);
//                     setClientSecret(data.clientSecret);
//                 }
//             });

//     }, [newPrice])

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         const card = elements.getElement(CardElement);

//         if (card === null) {
//             return;
//         }

//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: 'card',
//             card
//         });

//         setCardError(error?.message || '');
//         setSuccess('');
//         setProcessing(true);

//         const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
//             clientSecret,
//             {
//                 payment_method: {
//                     card: card,
//                     billing_details: {
//                         name: newUser[0]?.name,
//                         productName: name,
//                         productCode: productCode,
//                         email: newUser[0]?.email
//                     },
//                 },
//             },
//         );

//         if (intentError) {
//             setCardError(intentError?.message);
//             setProcessing(false);
//         }
//         else {
//             setCardError('')
//             console.log(paymentIntent);
//             setTransactionId(paymentIntent.id);
//             setSuccess('Your payment is completed');

//             const payment = {
//                 appointment: _id,
//                 transactionId: paymentIntent.id
//             }
//             fetch(`https://vast-tor-89247.herokuapp.com/payment/${_id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'content-type': 'application/json',
//                     'authorization': `Bearer ${localStorage.getItem('accessToken')}`
//                 },
//                 body: JSON.stringify(payment)
//             }).then(res => res.json())
//                 .then(data => {
//                     setProcessing(false);
//                     console.log(data);
//                 })
//         }
//     }
//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <CardElement
//                     options={{
//                         style: {
//                             base: {
//                                 fontSize: '16px',
//                                 color: '#424770',
//                                 '::placeholder': {
//                                     color: '#aab7c4',
//                                 },
//                             },
//                             invalid: {
//                                 color: '#9e2146',
//                             },
//                         },
//                     }}
//                 />
//                 <button className='button-33' type="submit" disabled={!stripe || !clientSecret || success}>
//                     Pay
//                 </button>
//             </form>
//             {
//                 cardError && <p className='text-red-500'>{cardError}</p>
//             }
//             {
//                 success && <div className='text-green-500'>
//                     <p>{success}  </p>
//                     <p>Your transaction Id: <span className="text-orange-500 font-bold">{transactionId}</span> </p>
//                 </div>
//             }
//         </>
//     );
// };

// export default CheckoutForm;

import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast, ToastContainer } from 'react-toastify';

const CheckoutForm = ({ product }) => {
    console.log(product);
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const { _id, userName, email, description, img, name, paid, phone, price, productCode, quantity, status, totalPrice, adress} = product;

    useEffect(() => {
        fetch('https://vast-tor-89247.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ totalPrice })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    console.log(data);
                    setClientSecret(data.clientSecret);
                }
            });

    }, [totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        setCardError(error?.message || '')
        setSuccess('');
        setProcessing(true);
        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: userName,
                        email: email
                    },
                },
            },
        );

        if (intentError) {
            setCardError(intentError?.message);
            setProcessing(false);
        }
        else {
            setCardError('');
            setTransactionId(paymentIntent.id);
            console.log(paymentIntent);
            toast.success('Congrats! Your payment is completed.')

            //store payment on database

            const updatedProduct = {
                name, description, price, totalPrice, quantity, productCode, img, status, userName, adress, phone, email, paid: true, transactionId: paymentIntent.id
            }

            // fetch(`https://vast-tor-89247.herokuapp.com/orders?id=${_id}`, {
            //     method: 'PUT',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     body: JSON.stringify(updatedProduct)
            // })
            //     .then(res => res.json())
            //     .then(data => {
            //         console.log(data);
            //         for (let i = 0; i < orders.length; i++) {
            //             if (orders[i]._id === _id) {
            //                 orders[i].status = 'Shipped';
            //                 console.log(orders[i]);
            //             }
            //         }
            //         setOrders(orders);
            //     })

            fetch(`https://vast-tor-89247.herokuapp.com/orders?id=${_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            }).then(res => res.json())
                .then(data => {
                    setProcessing(false);
                    console.log(data);
                })

        }
    }
    return (
        <>
            <form className='px-4 mb-4' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-success btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-danger fs-5 text-center'>{cardError}</p>
            }
            {
                success && <div className='text-success fs-5 text-center mt-3'>
                    <p>{success}  </p>
                    <p>Transaction Id: <span className="text-orange-500 fw-bold">{transactionId}</span> </p>
                </div>
            }
            <ToastContainer></ToastContainer>
        </>
    );
};

export default CheckoutForm;