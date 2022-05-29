import React, { useEffect, useState } from 'react';
import './Home.css'
import { Carousel } from 'react-bootstrap';
import InvididualItems from '../Invididual Items/InvididualItems';
import SingleReview from '../SingleReview/SingleReview';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../../img/kindpng_595124.png'
import Loading from '../../Shared/Loading/Loading';
import { IoIosPeople } from 'react-icons/io';
import useAdmin from '../../../Hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import HelmetTitle from '../../Shared/HelmetTitle/HelmetTitle';
import vid1 from '../../../vid/Upskill - Nomenclature of parts of a vehicle Animation.mp4'


const Home = () => {
    const [products, setProducts] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
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
    console.log(products?.reverse());

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

    console.log(reviews);

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, [])

    const goTo = (path) => {
        navigate(path);
    }

    return (
        <div>
            <HelmetTitle title='Home'></HelmetTitle>
            <div data-aos='fade-right' style={{ margin: "150px 0" }} className="row align-items-center">
                <div className="col-lg-7 col-md-12 col-sm-12 order-2 order-sm-2 order-md-2 order-lg-1 text-start ps-5 mt-5">
                    <h1 style={{ fontSise: "80px" }} className='text-glow'>LA Customs</h1>
                    <p className='fs-3'>World class customized parth for imported cars. From top to tires we got your back. Make your car the look and power it deserves.</p>
                    <button className='button-49' onClick={() => goTo('/about')}>LA Customs</button>
                </div>
                <div data-aos='fade-right' className="col-lg-5 col-md-12 order-1 col-sm-12 order-sm-1 order-md-1 order-lg-2">
                    <section className='container carousel'>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 img-fluid"
                                    src='https://i.ibb.co/yNmw8Wb/img1.jpg'
                                    alt="Second slide"
                                />

                                <Carousel.Caption>
                                    <h3>Engine Oil Filter</h3>
                                    <p>Oil filter that keeps the car smooth on the road</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 img-fluid"
                                    src='https://i.ibb.co/2hkDhwt/img2.jpg'
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <h3>Speed Meter</h3>
                                    <p>A tool used for checking the speed of the car in real time</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 img-fluid"
                                    src='https://i.ibb.co/KzhSjXh/img3.jpg'
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <h3>Automatic Transmition Fluid</h3>
                                    <p>Fluid supplier in the transmition</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 img-fluid"
                                    src='https://i.ibb.co/VMRpvmY/img4.jpg'
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <h3>Heat Exchangers</h3>
                                    <p>Keeps the car temparature steady</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 img-fluid"
                                    src='https://i.ibb.co/0JNhpTH/img6.jpg'
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <h3>Rim</h3>
                                    <p>Skeleton of tires</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </section>
                </div>
            </div>

            <div data-aos='fade-up' class="container-flip w-100" style={{ margin: "100px 0" }}>
                <div class="card-flip w-75 my-5 mx-auto">
                    <div class="front-flip img-fluid mx-auto">
                        <div style={{ backgroundImage: `url(${logo})` }} class="logo-flip"><span></span></div>
                    </div>
                    <div class="back-flip">
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <h1 className='text-glow'>LA Customs</h1>
                            <p className='text-center px-5'>From imported cars to custom we got your back. A mordern car inventory with world class Auto Pilot System .Give your car the intelligence it needs. PEACE</p>
                        </div>
                        <ul className='row align-items-center'>
                            <div className='col-sm-12 col-md-12 col-lg-4 d-flex justify-content-center pb-2'><li>50K+ Customers</li></div>
                            <div className='col-sm-12 col-md-12 col-lg-4 d-flex justify-content-center pb-2'><li>180M+ Annual revenue</li></div>
                            <div className='col-sm-12 col-md-12 col-lg-4 d-flex justify-content-center'><li>30+ Tools</li></div>
                        </ul>
                    </div>
                </div>
            </div>

            <h1 className='text-center button-85 w-50 fs-3 mx-auto' style={{ margin: "400px 0 0 0" }}>Products</h1>
            <div>
                {
                    products.length === 0 && <Loading></Loading>
                }
                <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
                    {
                        products?.slice(0, 6).map(items => <InvididualItems key={items._id} items={items}></InvididualItems>)
                    }
                </div>
                <button onClick={() => goTo('/allProducts')} className='button-33'>All Products</button>
            </div>

            <div data-aos='fade-right' className='w-100 mx-auto' style={{ margin: "100px 0" }}>
                <h3 className='text-center button-85 w-50 mx-auto'>Tired Of scrolling? <br />Put a review on us</h3>
                <div className="birds w-50 mx-auto mb-4">
                    <div className="birds__hatdove">
                        <div className="birds__hatdove-shadow"></div>
                        <div className="birds__hatdove-head">
                            <div className="birds__hatdove-hat"></div>
                            <div className="birds__hatdove-forehead"></div>
                            <div className="birds__hatdove-eye"></div>
                            <div className="birds__hatdove-eye"></div>
                            <div className="birds__hatdove-beak"></div>
                        </div>
                        <div className="birds__hatdove-backwing"></div>
                        <div className="birds__circles-1"></div>
                        <div className="birds__hatdove-backleg">
                            <div className="birds__curly"></div>
                        </div>
                        <div className="birds__hatdove-body"></div>
                        <div className="birds__hatdove-frontleg">
                            <div class="birds__curly"></div>
                        </div>
                        <div className="birds__hatdove-frontwing"></div>
                        <div className="birds__circles-2"></div>
                        <div className="birds__hatdove-frontwing-finger"></div>
                        <div className="birds__hatdove-frontwing-finger"></div>
                        <div className="birds__hatdove-frontwing-finger"></div>
                    </div>
                    <div className="birds__table">
                        <div className="birds__table-shadow"></div>
                    </div>
                    <div className="birds__laptop"></div>
                    <div className="birds__laptop">
                        <div className="birds__monitor">
                            <div className="birds__code"></div>
                        </div>
                    </div>
                    <div className="birds__coffee"></div>
                    <div className="birds__feather"></div>
                    <div className="birds__feather"></div>
                    <div className="birds__rundove-shadow"></div>
                    <div className="birds__rundove">
                        <div className="birds__rundove-backwing">
                            <div className="birds__finger"></div>
                            <div className="birds__finger"></div>
                            <div className="birds__finger"></div>
                            <div className="birds__circles"></div>
                        </div>
                        <div className="birds__rundove-head">
                            <div className="birds__rundove-eye"></div>
                            <div className="birds__rundove-eye"></div>
                            <div className="birds__rundove-beak"></div>
                        </div>
                        <div className="birds__rundove-backleg">
                            <div className="birds__curly"></div>
                        </div>
                        <div className="birds__rundove-body"></div>
                        <div className="birds__rundove-frontleg">
                            <div className="birds__curly"></div>
                        </div>
                        <div className="birds__rundove-frontwing">
                            <div className="birds__finger"></div>
                            <div className="birds__finger"></div>
                            <div className="birds__finger"></div>
                            <div className="birds__circles"></div>
                        </div>
                    </div>
                </div>
                <button onClick={() => goTo('/dashboard/addReviews')} className='button-33'>Add a review</button>
            </div>
            <h1 style={{ margin: "10px 0 0 0" }} className='text-center fs-3 button-85 w-50 mx-auto'>Reviews</h1>
            {
                reviews.length === 0 && <Loading></Loading>
            }
            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
                {
                    reviews?.map(review => <SingleReview key={review._id} review={review}></SingleReview>)
                }
            </div>
            <div style={{ margin: "100px 0 0 0" }}>
                <h3 className='button-85 w-50 mx-auto my-5 text-center'>Glance At Our Inventory</h3>
                <div className='grid-img-div'>
                    <div className="row p-0">
                        <div className="col-lg-6 col-md-12 col-sm-12 p-0 d-flex justify-content-center">
                            <video className="w-75" src={vid1}
                                autoPlay loop muted></video>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 p-0">
                            <div className="row">
                                <div className="col-6 p-0">
                                    <div className="img-div">
                                        <img src='https://i.ibb.co/r4gSvvv/img7.jpg' className="img-fluid" alt="" />
                                    </div>
                                </div>
                                <div className="col-6 p-0">
                                    <div className="img-div">
                                        <img src='https://i.ibb.co/gz0KfQB/img11.jpg' className="img-fluid" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 p-0">
                                    <div className="img-div">
                                        <img src='https://i.ibb.co/2yzbH9c/img10.jpg' className="img-fluid" alt="" />
                                    </div>
                                </div>
                                <div className="col-6 p-0">
                                    <div className="img-div">
                                        <img src='https://i.ibb.co/2hkDhwt/img2.jpg' className="img-fluid" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 p-0">
                            <div className="img-div">
                                <img src='https://i.ibb.co/7yc2xPs/img6.jpg' className="img-fluid" alt="" />
                            </div>
                        </div>
                        <div className="col-4 p-0">
                            <div className="img-div">
                                <img src='https://i.ibb.co/VMRpvmY/img4.jpg' className="img-fluid" alt="" />
                            </div>
                        </div>
                        <div className="col-4 p-0">
                            <div className="img-div">
                                <img src='https://i.ibb.co/yNmw8Wb/img1.jpg' className="img-fluid" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;