import React, { useEffect, useState } from 'react';
import HelmetTitle from '../../Shared/HelmetTitle/HelmetTitle';
import InvididualItems from '../Invididual Items/InvididualItems';

const AllProducts = () => {
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
    return (
        <div>
            <HelmetTitle title='All Products'></HelmetTitle>
            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
            {
                products.map(items => <InvididualItems key={items._id} items={items}></InvididualItems>)
            }
        </div>
        </div>
    );
};

export default AllProducts;