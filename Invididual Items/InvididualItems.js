import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InvididualItems.css'
import Aos from 'aos';
import 'aos/dist/aos.css';

const InvididualItems = (props) => {
    const { items } = props;
    const { name, description, price, img, productCode, quantity, _id, minQuantity } = items;
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    console.log(typeof quantity, typeof minQuantity);

    const goTo = (path) => {
        navigate(path);
    }

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, [])

    return (
        <div data-aos='fade-up' className='p-5'>
            <div className='card border-0'>
                <img src={img} class="card__image" alt="" />
                <div class="card__overlay">
                    <div class="card__header">
                        <div class="card__header-text fs-1">
                            <h3 class="card__title">{name}</h3>
                        </div>
                    </div>
                    <p className="card__description pb-2 fs-5">Price Per Product <span className='text-danger fw-bold'> ${price}</span></p>
                    <p className="card__description fs-5 pb-2">{description}</p>
                    <p className='card__description fs-5'>Quantity <span className='fw-bold text-danger'>{quantity}</span></p>
                    {
                        minQuantity && <p className='card__description fs-5'>Minimum Quantity <span className='fw-bold text-danger'>{minQuantity}</span></p>
                    }
                    {
                        (parseInt(quantity) > parseInt(minQuantity)) && <button onClick={() => goTo(`/purchase/${_id}`)} className='button-33 w-75 my-3'>Purchase</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default InvididualItems;