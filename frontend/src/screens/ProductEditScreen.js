import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../component/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  let navigate = useNavigate();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/products");
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setBrand(product.brand);
      }
    }
  }, [product, dispatch, id, navigate, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        brand,
        category,
        image,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to="/admin/products">Go back</Link>

      <h1>Edit Product</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      <FormContainer>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name" className="mb-3">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="price" className="mb-3">
              <FormLabel>Price</FormLabel>
              <FormControl
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="image" className="mb-3">
              <FormLabel>Image</FormLabel>
              <FormControl
                disabled
                type="text"
                placeholder="Enter Image Url"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
              <Form.Control type="file" onChange={uploadFileHandler} />
              {uploading && <Loader />}
            </FormGroup>

            <FormGroup controlId="brand" className="mb-3">
              <FormLabel>Brand</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Brand Name"
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="countInStock" className="mb-3">
              <FormLabel>Count In Stock</FormLabel>
              <FormControl
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => {
                  setCountInStock(e.target.value);
                }}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="category" className="mb-3">
              <FormLabel>Category</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="description" className="mb-3">
              <FormLabel>Description</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></FormControl>
            </FormGroup>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
