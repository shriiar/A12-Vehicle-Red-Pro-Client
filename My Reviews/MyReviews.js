import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import MySingleReview from '../My Single Review/MySingleReview';

const MyReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [user] = useAuthState(auth);
    useEffect(() => {
        fetch(`https://vast-tor-89247.herokuapp.com/reviews?email=${user?.email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    console.log(reviews);
    if(!reviews){
        return <Loading></Loading>
    }
    return (
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
            {
                reviews.map(review => <MySingleReview key={review._id} review={review} reviews={reviews} setReviews={setReviews}></MySingleReview>)
            }
        </div>
    );
};

export default MyReviews;