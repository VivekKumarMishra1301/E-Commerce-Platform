// import React from 'react'
import React, { useState, useEffect } from 'react';
import Layout from '../../components/layouts/Layout';
import AdminMenu from '../../components/layouts/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Select } from 'antd';
import { useAuth } from '../../context/auth';
import { useNavigate,useParams } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
const { Option } = Select;

const UpdateProduct = () => {


const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const params=useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState('');
  const [category, setCategory] = useState();
  const [pic, setPic] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [id,setId] = useState('');

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting category');
    }
  };

    
    
    const getSingleProduct = async () => {
        try {

            const { data } = await axios.get(`http://localhost:3000/api/v1/product/get-product/${params.slug}`);
            console.log(data);
            setName(data.products.name);
            setDescription(data.products.description);
            setQuantity(data.products.quantity);
            setShipping(data.products.shipping);
            setCategory(data.products.category._id);
            setPrice(data.products.price);
            setId(data.products._id);

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting')
        }

    }
    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    },[])
    

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/product/update-product/${id}`,
        { name, description, price, category, quantity, shipping, photo: pic },
        {
          headers: {
            Authorization: auth?.token
          }
        }
      );
      if (data?.success) {
        toast.success('Product Update Successfully');
        navigate('/dashboard/admin/products');
      } else {
        toast.error('Product Not created Successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error Occurred');
    }
  };

  const handleImage = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast.warning('Please Select an Image');
      setLoading(false);
      return;
    }
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'chatapp');
      data.append('cloud_name', 'rtca');
      fetch('https://api.cloudinary.com/v1_1/rtca/image/upload', {
        method: 'post',
        body: data
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.secure_url);
          setPic(data.secure_url.toString());
          setImage(pics.name);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast.warning('Please Select an Image');
      setLoading(false);
      return;
    }
  };

    
    
    const handleDelete = async () => {
        try {
            let answer = window.prompt('Are you sure to delete');
            if (!answer) return;
            const { data } = await axios.delete(`http://localhost:3000/api/v1/product/delete-product/${id}`);
            toast.success('deleted successfully');
            navigate('/dashboard/admin/products')
        } catch (error) {
            console.log(error);
            toast.error('delteion failed')
        }
    }

    
    

  return (
<Layout>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <h1>Update Product</h1>
          <div className='m-1 w-75'>
            <Select
              bordered={false}
              placeholder='Select a Category '
              size='large'
              showSearch
              className='form-select mb-3'
              onChange={(value) => {
                setCategory(value);
                          }}
                      
                      value={category}
                      >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>



<Button className="mb-3"
              isLoading={loading}
              colorScheme="blue"
              width="100%"
              style={{ marginTop: 15 }}
            >
              <label className='btn btn-outline-secondary col-md-12'>
                {pic ? image : 'Upload Photo'}
                <Input type="file"
                  name='pic'
                  accept='image/*'
                  onChange={(e) => handleImage(e.target.files[0])}
                  
                  hidden
                />
              </label>
            </Button>




            {/* <label className='btn btn-outline-secondary col-md-12'>
              {pic ? image : 'Upload Photo'}
              <input
                type='file'
                name='pic'
                accept='image/*'
                onChange={(e) => handleImage(e.target.files[0])}
                hidden
              />
            </label> */}
            <div className='mb-3'>
              {pic && (
                <div className='text-center'>
                  <img src={pic} alt='product-pic' height={'200px'} className='img img-responsive' />
                </div>
              )}
            </div>
            <div className='mb-3'>
              <input
                type='text'
                value={name}
                placeholder='Write Name of Product'
                className='form-control mb-3'
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type='text'
                value={description}
                placeholder='Write Description of Product'
                className='form-control mb-3'
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type='number'
                value={price}
                placeholder='Price of Item'
                className='form-control mb-3'
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type='number'
                value={quantity}
                placeholder='Quantity'
                className='form-control mb-3'
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input
                type='text'
                // value={shipping}
                placeholder='Shipping Address'
                className='form-control mb-3'
                onChange={(e) => setShipping(e.target.value)}
                value={shipping?"yes":"NO"}
              />
              <div className='mb-3'>
                <button className='btn btn-primary mb-3' onClick={handleCreate}>
                  Update Product
                </button>
                          </div>
                          <div className='mb-3'>
                <button className='btn btn-danger mb-3' onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct