import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import defaultImg from '../../../img/icons8-account-100.png';

const MySingleReview = (props) => {
    const { reviews, setReviews } = props;
    const { userName, email, img, name, description, _id } = props.review;

    const [user] = useAuthState(auth);

    const [modalShow, setModalShow] = useState(false);

    const deleteReview = () => {
        const url = `https://vast-tor-89247.herokuapp.com/reviews?id=${_id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    const remaining = reviews.filter(item => item._id !== _id);
                    toast.success('Review successfully deleted');
                    setReviews(remaining);
                }
            })
    }

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, [])

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Name {name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Description {description}</h4>
                    <p>
                        <span className='text-danger'>{description}</span>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button className='button-33' onClick={() => deleteReview()}>Delete</button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div data-aos='fade-up' className='p-5'>
            <div className='card border-0'>
                {
                    img ? <img src={img} class="card__image" alt="" />
                    : <img src={defaultImg} class="card__image" alt="" />
                }
                <div class="card__overlay">
                    <div class="card__header">
                        <div class="card__header-text fs-1">
                            <h3 class="card__title">{user?.displayName}</h3>

                        </div>
                    </div>
                    <h4 className="card__description pb-2 fs-5">{description}</h4>
                    <button className='button-33 my-3' variant="primary" onClick={() => setModalShow(true)}>
                        Delete Review
                    </button>
                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <ToastContainer></ToastContainer>
        </div>
    )
};

export default MySingleReview;