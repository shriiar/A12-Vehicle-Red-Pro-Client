import React, { useEffect, useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import ManageIndividualProduct from '../Manage Individual Product/ManageIndividualProduct';
import './ManageProducts.css';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`https://vast-tor-89247.herokuapp.com/products`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    console.log(products);
    if(products === []){
        return <Loading></Loading>
    }
    return (
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
            {
                products.map(product => <ManageIndividualProduct key={product._id} product={product} products={products} setProducts={setProducts}></ManageIndividualProduct>)
            }
        </div>
    );
};

export default ManageProducts;