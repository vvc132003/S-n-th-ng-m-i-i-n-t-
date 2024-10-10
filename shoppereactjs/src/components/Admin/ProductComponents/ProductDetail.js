import React, { useState, useEffect } from 'react';
import CustomerLayout from '../../Layout/CustomerLayout';
import { Card, Alert, Spinner, Button, InputGroup, FormControl } from 'react-bootstrap';
import CarouselComponent from '../../Layout/CarouselComponent ';
import { addCart, quantity } from '../../../Service/CartService';
import { getProductbyid, checksoluongproduct } from '../../../Service/ProductService';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ProductDetail = () => {
    const [searchParams] = useSearchParams();
    const idproduct = searchParams.get('idproduct');
    const [productDetail, setProductDetail] = useState(null); // Changed to a single object
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [quantity, setQuantity] = useState(1); // State to manage the quantity

    const navigate = useNavigate();

    useEffect(() => {
        fetchProductDetail();
    }, []);

    const fetchProductDetail = async () => {
        try {
            const data = await getProductbyid(idproduct);
            setProductDetail(data);
        } catch (error) {
            console.error('Error fetching product:', error);
            setError('Error fetching product details');
        } finally {
            setLoading(false);
        }
    };

    const handleCartUpdate = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('users'));
            if (user) {
                const response = await quantity(user.id);
                setCartQuantity(response.quantity);
            }
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    };

    const handleAddToCart = async (id) => {
        const user = JSON.parse(sessionStorage.getItem('users'));
        if (user != null) {
            const UserId = user.id;
            const ProductId = id;
            const Quantity = quantity;
            const checksl = await checksoluongproduct(ProductId);
            if (checksl.quantity >= 1) {
                toast.success('Thêm sản phẩm vào giỏ hàng thành công!');
                await addCart(UserId, ProductId, Quantity);
            } else if (checksl.quantity == 0) {
                toast.warning('Sản phẩm này đã hết hàng!');
            }
            await fetchProductDetail();
        } else {
            navigate('/login');;
        }
    };



    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));


    return (
        <>
            <Helmet>
                <title>{productDetail ? productDetail.productName : "Product"}</title>
            </Helmet>
            <CustomerLayout handleCartUpdate={handleCartUpdate}>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="sr-only"></span>
                        </Spinner>
                    </div>
                ) : error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : productDetail ? (
                    <>
                        <div className="py-3">
                            <div className='header-container'>
                                <Card>
                                    <div className='row p-3'>
                                        <div className='col-5 '>
                                            <Card.Img variant="top" src={productDetail.avatar} alt={productDetail.productName} />
                                        </div>
                                        <div className='col-7 '>
                                            <Card.Title>{productDetail.productName}</Card.Title>
                                            <Card.Text>
                                                <div className="price-box" >
                                                    đ {productDetail.price.toLocaleString()}
                                                </div>
                                            </Card.Text>
                                            <div className="product-attributes">
                                                <div className="row mb-4">
                                                    <div className="col-3" style={{ color: '#6c757d' }}>
                                                        <Card.Text>Màu sắc:</Card.Text>
                                                    </div>
                                                    <div className="col-9">
                                                        <Card.Text>{productDetail.color}</Card.Text>
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col-3" style={{ color: '#6c757d' }}>
                                                        <Card.Text>Dung lượng:</Card.Text>
                                                    </div>
                                                    <div className="col-9">
                                                        <Card.Text>{productDetail.size}</Card.Text>
                                                    </div>
                                                </div>
                                                <div className="row mb-5">
                                                    <div className="col-3" style={{ color: '#6c757d' }}>
                                                        <Card.Text>Số lượng:</Card.Text>
                                                    </div>
                                                    <div className="col-9 sl d-flex align-items-center">
                                                        <InputGroup>
                                                            <Button variant="outline-secondary" onClick={decrementQuantity}>-</Button>
                                                            <FormControl
                                                                value={quantity}
                                                                onChange={(e) => setQuantity(Number(e.target.value))}
                                                                style={{ textAlign: 'center' }}
                                                                type="text"
                                                                min="1"
                                                            />
                                                            <Button variant="outline-secondary" onClick={incrementQuantity}>+</Button>
                                                        </InputGroup>
                                                        <Card.Text style={{ fontSize: '0.875rem', marginLeft: '10px', color: '#6c757d' }}>{productDetail.quantity} sản phẩm có sẵn</Card.Text>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-end p-3">
                                                    <Button variant="danger" onClick={() => handleAddToCart(productDetail.id)}>
                                                        Thêm vào giỏ hàng
                                                    </Button>
                                                    <Button variant="danger" onClick={() => handleAddToCart(productDetail.id)}>
                                                        Mua ngay
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div >
                    </>
                ) : (
                    <Alert variant="warning">Không có sản phẩm</Alert>
                )}
            </CustomerLayout >
        </>

    );
};

export default ProductDetail;
