import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import SingleProduct from '../Single Product/SingleProduct';

const MyOrders = () => {
    const [products, setProducts] = useState([]);
    const [user] = useAuthState(auth);

    console.log(user?.email);
    useEffect(() => {
        fetch(`https://vast-tor-89247.herokuapp.com/orders?email=${user?.email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [user])

    console.log(products);
    if (!products) {
        return <Loading></Loading>;
    }
    return (
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
            {
                products?.map(product => <SingleProduct key={product._id} product={product} products={products} setProducts={setProducts}></SingleProduct>)
            }
        </div>
    );
};

export default MyOrders;