import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Aos from 'aos';
import 'aos/dist/aos.css';

const ManageIndividualProduct = (props) => {
    const { products, setProducts } = props;
    const { name, description, price, quantity,minQuantity, productCode, img, status, _id } = props.product;
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();

    const deleteProduct = () => {
        const url = `https://vast-tor-89247.herokuapp.com/products?id=${_id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    const remaining = products.filter(item => item._id !== _id);
                    toast.success('Successfully Deleted');
                    setProducts(remaining);
                }
            })
    }

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, [])

    const goTo = () => {
        navigate(`/updateProduct/${_id}`);
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
            <div className='card border-0 mb-3'>
                <img src={img} class="card__image w-100" alt="product image" />
                <div class="card__overlay">
                    <div class="card__header">
                        <div class="card__header-text fs-1">
                            <h3 class="card__title">{name.toUpperCase()}</h3>
                        </div>
                    </div>
                    <p className="card__description pb-2 fs-5">{description}</p>
                    <p className="card__description pb-2 fs-5">Price: ${price}</p>
                    <p className="card__description pb-2 fs-5">ProductCode: {productCode}</p>
                    <p className="card__description pb-2 fs-5">Quantity: {quantity}</p>
                    <p className="card__description pb-2 fs-5">Minimum Quantity: {minQuantity}</p>
                    <div className="row">
                        <div className="col-12">
                            <button className='button-33 w-75' variant="primary" onClick={() => goTo()}>
                                Update Product
                            </button>
                        </div>
                        <div className="col-12">
                            <button className='button-33 w-75' variant="primary" onClick={() => setModalShow(true)}>
                                Delete Product
                            </button>
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

export default ManageIndividualProduct;