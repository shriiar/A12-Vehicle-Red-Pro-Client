import React, { useEffect } from 'react';
import './MyPortfolio.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import HelmetTitle from '../../Shared/HelmetTitle/HelmetTitle';

const MyPortfolio = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, [])

    return (
        <div>
            <HelmetTitle title='My Portfolio'></HelmetTitle>
            <div className='myPortfolio'>
                <div class="portfoliocard-user">
                    <div class="coverphoto-user"></div>
                    <div data-aos='fade-right' class="profile_picture-user" style={{
                        backgroundImage: `url(https://i.ibb.co/pwBWFK1/279968941-2228875843931944-1567536795354962025-n.jpg)`
                    }}></div>
                    <div class="left_col-user">
                        <div data-aos='fade-right' class="following-user">
                            <div class="follow_count-user">Github</div>
                            <a href="https://github.com/shriiiar">Visit Github</a>
                        </div>
                        <div data-aos='fade-left' class="following-user">
                            <div class="follow_count-user">LinkedIn</div>
                            <a href="https://www.linkedin.com/in/fahim-shahriar-sajid-139757235/">Visit LinkedIn</a>
                        </div>
                        <div data-aos='fade-left' class="following-user">
                            <div class="follow_count-user">Skills</div>
                            <h6>Competitive Programmer</h6>
                            <h6>Data Structures & Algorithmn</h6>
                            <h6>FrontEnd Developer</h6>
                            <h6>Mern Stack Developer</h6>
                        </div>
                    </div>
                    <div class="right_col-user">
                        <h2 data-aos='fade-right' class="name-user">Fahim Shahriar Sajid</h2>
                        <h3 data-aos='fade-right' class="location-user">Nasirabad, Chittagong</h3>
                        <h3 data-aos='fade-left' class="location-user">fahimshariar13@gmail.com</h3>
                        <h3 data-aos='fade-left' class="location-user">Education: Bsc In CSE, IIUC</h3>
                        <h3 class="location-user">Best Three Projetcs:</h3>
                        <div data-aos='fade-right' className='row ps-5'>
                            <div className="col-12">Project 1: <a href="https://al-quran-shriiar.netlify.app/">Al-Quran Site</a></div>

                            <div className="col-12">Project 2: <a href="https://adhan-time-shriiar.netlify.app/">Adhan Time's</a></div>
                            <div className="col-12">Project 3: <a href="https://assignment11-4b728.web.app/">Car Inventory</a></div>
                        </div>

                        <h3 data-aos='fade-left' class="location-user mt-4">Tools that i've used so far:</h3>
                        <div data-aos='fade-left' className='row ps-5'>
                            <div className="col-12">FrontEnd:<span className='text-success'> Html5, Css3, Bootstrap, Tailwind, ES6, Material UI, JS, React</span></div>
                            <div className="col-12">BackEnd:<span className='text-success'> MongoDb, Node, Express Js</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPortfolio;