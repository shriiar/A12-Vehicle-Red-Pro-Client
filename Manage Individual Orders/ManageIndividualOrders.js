import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import Aos from 'aos';
import 'aos/dist/aos.css';

const ManageIndividualOrders = (props) => {
    const { orders, setOrders } = props;
    const { name, description, price, totalPrice, quantity, productCode, img, status, _id, paid, email, userName, adress, phone } = props.order;
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, [])

    const changeStatus = () => {

        const updatedProduct = {
            name, description, price, totalPrice, quantity, productCode, img, status: 'Shipped', userName, adress, phone, email, paid, transaction: props?.order?.transaction
        }

        fetch(`https://vast-tor-89247.herokuapp.com/orders?id=${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                for (let i = 0; i < orders.length; i++) {
                    if (orders[i]._id === _id) {
                        orders[i].status = 'Shipped';
                        console.log(orders[i]);
                    }
                }
                setOrders(orders);
            })

        fetch(`https://vast-tor-89247.herokuapp.com/orders`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setOrders(data))
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
                    const remaining = orders.filter(item => item._id !== _id);
                    setOrders(remaining);
                }
            })
    }
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
        <div data-aos='fade-up'>
            <div className='card border-0'>
                <img src={img} class="card__image w-100" alt="product image" />
                <div class="card__overlay my-2">
                    <div class="card__header">
                        <div class="card__header-text fs-1">
                            <h3 class="card__title fs-2">{name.toUpperCase()}</h3>
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
                    <p className="card__description pb-2 fs-5">{description}</p>
                    <p className="card__description pb-2 fs-5">Ordered by {userName}</p>
                    <p className="card__description pb-2 fs-5">Email: {email}</p>
                    <p className="card__description pb-2 fs-5">Contact: {phone}</p>
                    <p className="card__description pb-2 fs-5">Price Per Product: ${price}</p>
                    <p className="card__description pb-2 fs-5">Total Price: ${totalPrice}</p>
                    <p className="card__description pb-2 fs-5">ProductCode: {productCode}</p>
                    <p className="card__description pb-2 fs-5">Quantity: {quantity}</p>
                    <div className="row">
                        {
                            status === 'Pending' && <div className="col-12">
                                <button onClick={() => changeStatus()} className='button-33 mx-auto w-75 mb-3'>Shipped</button>
                            </div>
                        }
                        <div className="col-12">
                            {
                                paid === false && <button className='button-33 w-75 mb-3' variant="primary" onClick={() => setModalShow(true)}>
                                    Delete Product
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
};

export default ManageIndividualOrders;