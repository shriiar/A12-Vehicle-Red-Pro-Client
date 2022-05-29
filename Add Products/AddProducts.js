import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import HelmetTitle from '../../Shared/HelmetTitle/HelmetTitle';
import Loading from '../../Shared/Loading/Loading';
import addImg from '../../../img/undraw_Add_files_re_v09g.png';
import './AddProducts.css'

const AddProducts = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const imageStorage_key = process.env.REACT_APP_imageStorage_key;
    const onSubmit = async data => {

        // console.log(data);

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
                    const product = {
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        productCode: data.productCode,
                        quantity: data.quantity,
                        minQuantity: data.minQuantity,
                        img: img
                    }
                    console.log(product);
                    fetch(`https://vast-tor-89247.herokuapp.com/products?productCode=${data.productCode}`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                toast.success(`${product.name} have been added`)
                            }
                            else {
                                toast.error(`Product already exist`);
                            }
                        });
                }
                console.log(data);
                reset();
            })
    }
    // if (isLoading) {
    //     return <Loading></Loading>
    // }
    return (
        <div>
            <HelmetTitle title='Add To Inventory'></HelmetTitle>
            <div style={{ margin: "0 0 1050px 0" }} class="page-add">
                <div class="container-add">
                    <div class="left-add">
                        <div class="login">Add Products</div>
                        <img src={addImg} className='img-fluid' alt="" />
                    </div>

                    <div class="right-add d-flex align-items-center justify-content-center">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="input-group w-75 mx-auto">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Product Name is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div>

                            <div className="input-group w-75 mx-auto">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    type="text"
                                    placeholder="Product Description"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("description", {
                                        required: {
                                            value: true,
                                            message: 'Product Description is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.description?.type === 'required' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
                                </label>
                            </div>

                            <div className="input-group w-75 mx-auto">
                                <label className="label">
                                    <span className="label-text">Product Code</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Has to be unique"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("productCode", {
                                        required: {
                                            value: true,
                                            message: 'Product Code is Required'
                                        },
                                        pattern: {
                                            value: /^[A-Za-z0-9_.]+$/,
                                            message: 'Use capital or small alphabets and 0-9 numbers'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.productCode?.type === 'required' && <span className="label-text-alt text-red-500">{errors.productCode.message}</span>}
                                    {errors.productCode?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.productCode.message}</span>}
                                </label>
                            </div>

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
                                    placeholder="Product Quantity"
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
                        <ToastContainer></ToastContainer>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AddProducts;