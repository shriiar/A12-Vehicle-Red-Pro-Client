import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Manage.css';

const Manage = () => {
    const navigate = useNavigate();
    const goTo = (path) => {
        navigate(path);
    }
    return (
        <div>
            <section class="hero-section">
                <div class="card-grid-TaskRecords">
                    <div class="card-blur">
                        <div class="card__background" style={{
                            backgroundImage: `url("https://i.ibb.co/Ryh6BcH/undraw-Operating-system-re-iqsc.png")`
                        }}>

                        </div>
                        <div class="card__content d-flex flex-column">
                            <h3 class="card__heading">Add Products</h3>
                            <button className='w-50 mx-auto button-33' onClick={() => goTo('/addProduct')}>Add</button>
                        </div>
                    </div>
                    <div class="card-blur">
                        <div class="card__background" style={{
                            backgroundImage: `url("https://i.ibb.co/hCcp7L2/undraw-product-iteration-kjok.png")`
                        }}>

                        </div>
                        <div class="card__content d-flex flex-column">
                            <h3 class="card__heading text-center">Manage Products</h3>
                            <button className='w-50 mx-auto button-33' onClick={() => goTo('/manageProducts')}>Manage</button>
                        </div>
                    </div>
                    <div class="card-blur">
                        <div class="card__background" style={{
                            backgroundImage: `url("https://i.ibb.co/gw9bKWK/undraw-Time-management-re-tk5w.png")`
                        }}>

                        </div>
                        <div class="card__content d-flex flex-column">
                            <h3 class="card__heading text-center">Manage Orders</h3>
                            <button className='w-50 mx-auto button-33' onClick={() => goTo('/manageOrders')}>Manage</button>
                        </div>
                    </div>
                    <div class="card-blur">
                        <div class="card__background" style={{
                            backgroundImage: `url("https://i.ibb.co/hWsZJWN/undraw-add-friends-re-3xte.png")`
                        }}>

                        </div>
                        <div class="card__content d-flex flex-column">
                            <h3 class="card__heading text-center">Add Admin</h3>
                            <button className='w-50 mx-auto button-33' onClick={() => goTo('/addAdmin')}>Add</button>
                        </div>
                    </div>
                    <div class="card-blur">
                        <div class="card__background" style={{
                            backgroundImage: `url("https://i.ibb.co/sbpNNXV/undraw-Steps-re-odoy.png")`
                        }}>

                        </div>
                        <div class="card__content d-flex flex-column">
                            <h3 class="card__heading text-center">Manage Reviews</h3>
                            <button className='w-50 mx-auto button-33' onClick={() => goTo('/manageReviews')}>Add</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Manage;