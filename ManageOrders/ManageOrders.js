import { setDate } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import ManageIndividualOrders from '../Manage Individual Orders/ManageIndividualOrders';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('https://vast-tor-89247.herokuapp.com/orders', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setOrders(data));
    }, [])

    if (orders === []) {
        return <Loading></Loading>
    }
    return (
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
            {
                orders.map(order => <ManageIndividualOrders key={order._id} order={order} orders={orders} setOrders={setOrders}></ManageIndividualOrders>)
            }
        </div>
    );
};

export default ManageOrders;