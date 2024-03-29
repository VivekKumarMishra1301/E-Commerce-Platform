import React, { useState, useEffect } from 'react';
import Layout from '../../components/layouts/Layout';
import AdminMenu from '../../components/layouts/AdminMenu';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/v1/product/get-product');
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error('Error fetching products');
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Products List</h1>
                    <div className="d-flex">

                    {products.map((p) => (
                        <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                            <img src={p.photo} className="card-img-top" alt={p.name} />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Products;
