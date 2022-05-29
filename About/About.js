import React from 'react';
import img from '../../../img/kindpng_595124.png';
import HelmetTitle from '../../Shared/HelmetTitle/HelmetTitle';
import './About.css';

const About = () => {
    return (
        <div>
            <HelmetTitle title='About'></HelmetTitle>
            <div style={{ margin: "100px 0 1100px 0" }} className='p-5 row flex-column'>
            <aside className="profile-card-about">
                <header>
                    <h1 className='mt-5'>Red Vehicle Pro</h1>
                </header>
                <div className="profile-bio">
                    <p className='fs-4'>World class customized parth for imported cars. From top to tires we got your back. Make your car the look and power it deserves.<br /><span className='button-49 fs-3 p-3'>PEACE</span></p>
                </div>
                <img src={img} className='img-fluid' alt="" />
            </aside>
        </div>
        </div>
    );
};

export default About;