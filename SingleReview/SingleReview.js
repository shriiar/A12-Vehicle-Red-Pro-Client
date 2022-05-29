import React, { useEffect } from 'react';
import './SingleReview.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import defaultImg from '../../../img/icons8-account-100.png'

const SingleReview = (props) => {
    const { userName, name, email, description, _id, img, rating } = props.review;
    // console.log(rating, email);

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, [])
    return (
        <div data-aos='fade-up' className='p-5'>
            <div class="container-review">
                <div class="card-review">
                    <div class="card-header-review">
                        {
                            img ? <img src={img} alt="rover" />
                            : <img src={defaultImg} alt="rover" />
                        }
                    </div>
                    <div class="card-body-review">
                    <h2 className='fs-4 my-3'>{userName}</h2>
                        <span class="tag-review tag-teal-review">Review on {name}</span>
                        <h2 className='fs-4 my-3'>{description}</h2>
                        <span class="tag-review tag-teal-review fs-5">Rating: <span className='text-success fs-5'>{rating}</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleReview;