import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import useAdmin from '../../../Hooks/useAdmin';
import HelmetTitle from '../../Shared/HelmetTitle/HelmetTitle';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth)
    const [admin] = useAdmin(user);
    const goTo = (path) => {
        console.log(path);
        navigate(path);
    }
    return (
        <div>
            <HelmetTitle title='Dashboard'></HelmetTitle>
            <div className='row'>
                <div className='col-sm-12 col-md-4 col-lg-4'>
                    <section class="hero-section">
                        <div class="card-grid-dashboard">
                            {
                                !admin && <>
                                    <div class="card-blur-dashboard">
                                        <div class="card__background" style={{
                                            backgroundImage: `url("https://i.ibb.co/gw9bKWK/undraw-Time-management-re-tk5w.png")`
                                        }}>

                                        </div>
                                        <div class="card__content d-flex flex-column">
                                            <h3 class="card__heading">My Orders</h3>
                                            <button className='w-50 mx-auto button-33' onClick={() => goTo('/dashboard/myOrders')}>Orders</button>
                                        </div>
                                    </div>
                                    <div class="card-blur-dashboard">
                                        <div class="card__background" style={{
                                            backgroundImage: `url("https://i.ibb.co/sbpNNXV/undraw-Steps-re-odoy.png")`
                                        }}>

                                        </div>
                                        <div class="card__content d-flex flex-column">
                                            <h3 class="card__heading text-center">Add Review</h3>
                                            <button className='w-50 mx-auto button-33' onClick={() => goTo('/dashboard/addReviews')}>Add</button>
                                        </div>
                                    </div>
                                    <div class="card-blur-dashboard">
                                        <div class="card__background" style={{
                                            backgroundImage: `url("https://i.ibb.co/z6TBDMf/undraw-Organize-resume-re-k45b.png")`
                                        }}>

                                        </div>
                                        <div class="card__content d-flex flex-column">
                                            <h3 class="card__heading text-center">My Reviews</h3>
                                            <button className='w-50 mx-auto button-33' onClick={() => goTo('/dashboard/myReviews')}>Profile</button>
                                        </div>
                                    </div>
                                </>
                            }

                            {
                                admin && <div class="card-blur-dashboard">
                                    <div class="card__background" style={{
                                        backgroundImage: `url("https://i.ibb.co/Y0F1wCj/undraw-Organize-resume-re-k45b.png")`
                                    }}>

                                    </div>
                                    <div class="card__content d-flex flex-column">
                                        <h3 class="card__heading text-center">Manage Site</h3>
                                        <button className='w-50 mx-auto button-33' onClick={() => goTo('/dashboard/manage')}>Manage</button>
                                    </div>
                                </div>
                            }
                            <div class="card-blur-dashboard">
                                <div class="card__background" style={{
                                    backgroundImage: `url("https://i.ibb.co/Fgq2Pm5/undraw-Launching-re-tomg.png")`
                                }}>

                                </div>
                                <div class="card__content d-flex flex-column">
                                    <h3 class="card__heading text-center">My Profile</h3>
                                    <button className='w-50 mx-auto button-33' onClick={() => goTo('/dashboard/myProfile')}>Profile</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className='col-sm-12 col-md-8 col-lg-8'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;