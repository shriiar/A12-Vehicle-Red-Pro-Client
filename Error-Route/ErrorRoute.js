import React from 'react';
import './ErrorRoute.css'
import errorVid from '../../../vid/yt1s.com - Carregando 99   Error  Gato Gif XD XD XD_360p.mp4'
import HelmetTitle from '../../Shared/HelmetTitle/HelmetTitle';

const ErrorRoute = () => {
    return (
        <div>
            <HelmetTitle title='Not Found'></HelmetTitle>
            <div className='error-div text-center'>
                <h1 className='my-5 error-header button-1 w-50 mx-auto'>404 Page Not Found</h1>
                <video class="my-5" src={errorVid}
                    autoPlay loop muted></video>
            </div>
        </div>
    );
};

export default ErrorRoute;