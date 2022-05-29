import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './SingleProduct.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

const SingleProduct = (props) => {
    const { products, setProducts } = props;
    const { name, description, img, paid, price, productCode, quantity, _id, status, totalPrice, transactionId } = props.product;
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();

    const goTo = (path) => {
        console.log(path);
        navigate(path);
    }

    const deleteProduct = () => {
        const url = `https://vast-tor-89247.herokuapp.com/orders?id=${_id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    const remaining = products.filter(item => item._id !== _id);
                    setProducts(remaining);
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
                    <h4>Price {price}</h4>
                    <p>
                        <span className='text-danger'>{description}</span>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button className='button-33' onClick={() => deleteProduct()}>Delete</button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div data-aos='fade-up' className='p-5'>
            <div className='card border-0'>
                <img src={img} class="card__image" alt="" />
                <div class="card__overlay">
                    <div class="card__header">
                        <div class="card__header-text fs-1">
                            <h3 class="card__title">{name}</h3>
                            {
                                !paid ? <h4 className='card__title'>Payment: <span className='text-danger'>Pending</span></h4>
                                    : <h4 className='card__title'>Payment: <span className='text-success'>Paid</span></h4>
                            }
                            {
                                status === 'Pending' ? <h4 className='card__title'>Status: <span className='text-danger'>{status}</span></h4>
                                    : <h4 className='card__title'>Status: <span className='text-success'>{status}</span></h4>
                            }
                        </div>
                    </div>
                    <h4 className="card__description pb-2 fs-5">{description}</h4>
                    <h5 className="card__description pb-2 fs-5">{productCode}</h5>
                    <h5 className="card__description fs-5 pb-2">Price: ${totalPrice}</h5>
                    <h5 className='card__description mb-3'>Quantity: {quantity}</h5>
                    {
                        transactionId && <h5 className='card__description mb-3'>Transaction ID: <span className='text-success'>{transactionId}</span></h5>
                    }
                    {
                        !paid && <>
                            <button onClick={() => goTo(`/ordered/${_id}`)} className='button-33'>Make Payment</button>
                            <button className='button-33 my-3' variant="primary" onClick={() => setModalShow(true)}>
                                Delete Order
                            </button>
                        </>
                    }
                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
};

export default SingleProduct;