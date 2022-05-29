import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import HelmetTitle from '../../Shared/HelmetTitle/HelmetTitle';
import addImg from '../../../img/undraw_Add_files_re_v09g.png';
import { useForm } from 'react-hook-form';
import Loading from '../../Shared/Loading/Loading';

const UpdateProduct = () => {
    const { id } = useParams();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imageStorage_key = process.env.REACT_APP_imageStorage_key;

    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetch(`https://vast-tor-89247.herokuapp.com/products?id=${id}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [])

    console.log(product);
    const onSubmit = async data => {

        console.log(data);

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        console.log(image);

        const url = `https://api.imgbb.com/1/upload?key=${imageStorage_key}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.success) {
                    const img = result.data.url;
                    const updatedProduct = {
                        name: product[0]?.name,
                        description: product[0]?.description,
                        price: data.price,
                        productCode: product[0]?.productCode,
                        quantity: data.quantity,
                        minQuantity: data.minQuantity,
                        img: img
                    }
                    console.log(product);
                    fetch(`https://vast-tor-89247.herokuapp.com/products/${id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(updatedProduct)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success(`${product[0]?.name} have been updated`)
                        });
                }
                console.log(data);
                // reset();
            })
    }
    if(product === []){
        return <Loading></Loading>
    }
    return (
        <div>
            <div style={{ margin: "0 0 1050px 0" }} class="page-add">
                <div class="container-add">
                    <div class="left-add">
                        <div class="login">Restock Product</div>
                        <img src={addImg} className='img-fluid' alt="" />
                    </div>

                    <div class="right-add d-flex align-items-center justify-content-center">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="input-group w-75 mx-auto">
                                <label className="label">
                                    <span className="label-text">Price Per Unit $</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Product Price"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("price", {
                                        required: {
                                            value: true,
                                            message: 'Product Price is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.price?.type === 'required' && <span className="label-text-alt text-red-500">{errors.price.message}</span>}
                                </label>
                            </div>

                            <div className="input-group w-75 mx-auto">
                                <label className="label">
                                    <span className="label-text">Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Product Quantity"
                                    min={1}
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("quantity", {
                                        required: {
                                            value: true,
                                            message: 'Product Quantity is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.quantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.quantity.message}</span>}
                                </label>
                            </div>

                            <div className="input-group w-75 mx-auto">
                                <label className="label">
                                    <span className="label-text">Minimum Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Minimum Quantity"
                                    min={1}
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("minQuantity", {
                                        required: {
                                            value: true,
                                            message: 'Minimum Quantity is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.minQuantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.minQuantity.message}</span>}
                                </label>
                            </div>

                            <div className="input-group w-75 mx-auto">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input
                                    type="file"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("image", {
                                        required: {
                                            value: true,
                                            message: ' '
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.file?.type === 'required' && <span className="label-text-alt text-red-500">{errors.file.message}</span>}
                                </label>
                            </div>

                            <input className='form-submit button-33 w-75 mx-auto mt-4' type="submit" value="Add" />
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default UpdateProduct;