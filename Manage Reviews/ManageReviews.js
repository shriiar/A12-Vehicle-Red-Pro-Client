import React, { useEffect, useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import SingleManageReview from '../Single Manage Review/SingleManageReview';

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch(`https://vast-tor-89247.herokuapp.com/reviews`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    if (reviews === []) {
        return <Loading></Loading>
    }
    return (
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
            {
                reviews.map(review => <SingleManageReview key={review._id} review={review} reviews={reviews} setReviews={setReviews}></SingleManageReview>)
            }
        </div>
    );
};

export default ManageReviews;