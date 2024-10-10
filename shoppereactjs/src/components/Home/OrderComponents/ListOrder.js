import React, { useState, useEffect } from 'react';
import CustomerLayout from '../../Layout/CustomerLayout';
import { Card, Col, Row, Alert, Spinner, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { cartbyiduser, deleteQuantityccart, AddQuantityccart, Deletecarrtdeltal } from '../../../Service/CartService';
import { useNavigate, Link } from 'react-router-dom';
import { FaTag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { quantity } from '../../../Service/CartService';
import { AddOrder } from '../../../Service/OrderService';

import { Helmet } from 'react-helmet-async';
import { FaSpinner, FaShoppingCart } from 'react-icons/fa';


const ListOrder = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadings, setLoadings] = useState(false);

    const [error, setError] = useState(null);
    const [quantitys, setQuantity] = useState(1);
    const [cartQuantity, setCartQuantity] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('users'));
            if (user && user.id) {
                const data = await cartbyiduser(user.id);
                setCart(data);
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            setError('Failed to load cart.');
        } finally {
            setLoading(false);
        }
    };


    const AddOrders = async () => {
        const user = JSON.parse(sessionStorage.getItem('users'));
        if (user && user.id) {
            setLoadings(true);
            try {
                await AddOrder(user.id);
                toast.success('Thanh toán thành công!');
                await fetchCart();
                navigate('/user/purchase');
            } catch (error) {
                console.error('Error fetching cart:', error);
                toast.error('Đã xảy ra lỗi khi thanh toán.');
            } finally {
                setLoadings(false);
            }
        } else {
            navigate('/login');
        }
    };


    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.cartDetail.totalPrice, 0);
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
    const groupedCart = cart.reduce((acc, item) => {
        if (!acc[item.shop.id]) {
            acc[item.shop.id] = {
                shop: item.shop,
                items: [],
                totalPrice: 0

            };
        }
        acc[item.shop.id].items.push(item);
        acc[item.shop.id].totalPrice += item.product.price * item.cartDetail.quantity;

        return acc;
    }, {});


    return (
        <>
            <Helmet>
                <title>Đặt hàng</title>
            </Helmet>
            <CustomerLayout handleCartUpdate={handleCartUpdate}>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="sr-only"></span>
                        </Spinner>
                    </div>
                ) : (
                    <div className="py-4">
                        <div className="header-container">

                            {cart && cart.length > 0 ? (
                                <>
                                    <div style={{ paddingBottom: '20px' }}>
                                        <Card.Text className="text-muted mb-0">
                                        > Đặt hàng
                                        </Card.Text>
                                    </div>
                                    <Row>
                                        <Col md={12} className="mb-3">
                                            <Card className="shadow-sm">
                                                <Card.Body style={{ padding: '20px 40px' }}>
                                                    <Row className="align-items-center">
                                                        <Col md={6}>
                                                            <Row>
                                                                <Col md={12}>
                                                                    <Card.Text className="mb-0">Sản Phẩm</Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col md={2} className="text-center">
                                                            <Card.Text className="text-muted mb-0">Đơn Giá</Card.Text>
                                                        </Col>
                                                        <Col md={2} className="text-center">
                                                            <Card.Text className="text-muted mb-0">Số Lượng</Card.Text>
                                                        </Col>
                                                        <Col md={2} className="text-center">
                                                            <Card.Text className="text-muted mb-0">Thành Tiền</Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {Object.keys(groupedCart).map((shopId) => {
                                            const { shop, items, totalPrice } = groupedCart[shopId];
                                            return (
                                                <Col md={12} key={shopId} className="mb-3">
                                                    <Card className="shadow-sm">
                                                        <Card.Text style={{ padding: '20px 40px', marginBottom: '0', borderBottom: '1px solid #d5d6d6' }}>
                                                            <Row className="align-items-center">
                                                                <Col md={4}>
                                                                    <Row>
                                                                        <Col md={3} className="d-flex align-items-center">
                                                                            <Card.Img
                                                                                variant="top"
                                                                                src={shop.avatar || 'avatar.png'}
                                                                                className="img-fluid"
                                                                                style={{ height: '20px', width: '20px', objectFit: 'cover' }}
                                                                            />
                                                                        </Col>
                                                                        <Col md={9} style={{ marginLeft: '-60px' }}>
                                                                            <Link to={`/shop?idshop=${shop.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                                                                <Card.Text className="mb-0" style={{ fontSize: '0.9rem' }}>
                                                                                    {shop.shopName}
                                                                                </Card.Text>
                                                                            </Link>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </Card.Text>
                                                        <Card.Body style={{ padding: '20px 40px' }}>
                                                            {items.map((item, index) => (
                                                                <Row
                                                                    key={item.product.id}
                                                                    className="align-items-center"
                                                                    style={{
                                                                        padding: '20px 0px',
                                                                        marginBottom: '0',
                                                                        borderBottom: index < items.length - 1 ? '1px solid #d5d6d6' : 'none',
                                                                    }}
                                                                >
                                                                    <Col md={6}>
                                                                        <Row>
                                                                            <Col md={4} className="text-center">
                                                                                <Card.Img
                                                                                    variant="top"
                                                                                    src={item.product.avatar || 'avatar.png'}
                                                                                    className="img-fluid"
                                                                                    style={{ height: '100px', width: '100px', objectFit: 'cover', borderRadius: '8px' }}
                                                                                />
                                                                            </Col>
                                                                            <Col md={8} className="d-flex align-items-center">
                                                                                <Card.Title
                                                                                    style={{
                                                                                        fontSize: '0.9rem',
                                                                                        whiteSpace: 'nowrap',
                                                                                        overflow: 'hidden',
                                                                                        textOverflow: 'ellipsis',
                                                                                        maxWidth: '100%',
                                                                                    }}
                                                                                >
                                                                                    <Link
                                                                                        to={`/home/product?idproduct=${item.product.id}`}
                                                                                        style={{
                                                                                            display: 'block',
                                                                                            fontSize: '14px',
                                                                                            whiteSpace: 'nowrap',
                                                                                            overflow: 'hidden',
                                                                                            textOverflow: 'ellipsis',
                                                                                            textDecoration: 'none',
                                                                                            color: 'inherit',
                                                                                        }}
                                                                                    >
                                                                                        {item.product.productName}
                                                                                    </Link>
                                                                                </Card.Title>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                    <Col md={2} className="text-center">
                                                                        <Card.Text className="mb-0">
                                                                            đ {item.product.price.toLocaleString()}
                                                                        </Card.Text>
                                                                    </Col>
                                                                    <Col md={2} className="">
                                                                        <FormControl
                                                                            value={item.cartDetail.quantity}
                                                                            onChange={(e) => setQuantity(Number(e.target.value))}
                                                                            style={{ textAlign: 'center', fontSize: '1rem', border: 'none', marginRight: '3px' }}
                                                                            type="text"
                                                                            min="1"
                                                                            disabled
                                                                        />
                                                                    </Col>
                                                                    <Col md={2} className="text-center">
                                                                        <Card.Text className="text-danger mb-0">
                                                                            đ {item.cartDetail.totalPrice.toLocaleString()}
                                                                        </Card.Text>
                                                                    </Col>
                                                                </Row>
                                                            ))}
                                                        </Card.Body>
                                                        <Card.Text style={{ padding: '20px 40px', marginBottom: '0', borderTop: '1px solid #d5d6d6', backgroundColor: '#f5f5f5' }}>
                                                            <Row className="align-items-center">
                                                                <Col md={12}>
                                                                    <Row>
                                                                        <Col md={5}>
                                                                            <Row className='align-items-center'>
                                                                                <Col md={3}>
                                                                                    <Card.Text className="mb-0">
                                                                                        Lời nhắn:
                                                                                    </Card.Text>
                                                                                </Col>
                                                                                <Col md={9}>
                                                                                    <Form.Group className="">
                                                                                        <Form.Control
                                                                                            as="input"
                                                                                            rows={3}
                                                                                            placeholder="Lưu ý cho người bán..."
                                                                                        />
                                                                                    </Form.Group>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                        <Col md={7}>
                                                                            <Row style={{ borderLeft: '1px solid #d5d6d6' }}>
                                                                                <Col md={3}>
                                                                                    <Card.Text className="mb-0">
                                                                                        Đơn vị vận chuyển:
                                                                                    </Card.Text>
                                                                                </Col>
                                                                                <Col md={9}>
                                                                                    <Card.Text className="mb-0">
                                                                                        Đảm bảo nhận hàng từ 30 Tháng 8 - 31 Tháng 8
                                                                                        Nhận Voucher trị giá ₫15.000 nếu đơn hàng được giao đến bạn sau ngày 31 Tháng 8 2024.
                                                                                        (Đơn hàng sẽ được giao trước Lễ)
                                                                                    </Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </Card.Text>
                                                        <Card.Text style={{ padding: '20px 40px', marginBottom: '0', borderTop: '1px solid #d5d6d6', backgroundColor: '#f5f5f5' }}>
                                                            <Row className="align-items-center">
                                                                <Col md={8}>
                                                                    <Card.Text className="mb-0">
                                                                    </Card.Text>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Row>
                                                                        <Col md={8}>
                                                                            <Row>
                                                                                <Col md={12} style={{ marginLeft: '-0px' }}>
                                                                                    <Card.Text className="mb-0">
                                                                                        Tổng số tiền
                                                                                    </Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                        <Col md={4}>
                                                                            <Card.Text className="mb-0" style={{ color: 'red', fontSize: '18px' }}>
                                                                                đ {totalPrice.toLocaleString()}
                                                                            </Card.Text>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </Card.Text>
                                                    </Card>
                                                </Col>
                                            );
                                        })}

                                    </Row>

                                    <Row>
                                        <Col md={12} className="mb-3">
                                            <Card className="shadow-sm">
                                                <Card.Text style={{ padding: '20px 40px', marginBottom: '0', borderBottom: '1px solid #d5d6d6' }}>
                                                    <Row className="justify-content-end">
                                                        <Col md={8}>
                                                            <Card.Text className="mb-0">
                                                                Phương thức thanh toán
                                                            </Card.Text>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Row>
                                                                <Col md={8}>
                                                                    <Row>
                                                                        <Col md={12} style={{ marginLeft: '-0px' }}>
                                                                            <Card.Text className="mb-0">
                                                                                Thanh toán khi nhận hàng
                                                                            </Card.Text>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                                                        <Link to={`/`} style={{ textDecoration: 'none', color: '#05a', fontSize: '0.9rem' }}>
                                                                            Thay đổi
                                                                        </Link>
                                                                    </Link>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card.Text>
                                                <Card.Body style={{ padding: '20px 40px' }}>
                                                    <Row className="justify-content-end">
                                                        <Col md={8}>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Row>
                                                                <Col md={8}>
                                                                    <Row>

                                                                        <Col md={12} style={{ marginLeft: '-0px' }}>
                                                                            <Card.Text className="mb-3">
                                                                                Tổng tiền hàng
                                                                            </Card.Text>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Card.Text className="mb-3">
                                                                        đ {calculateTotal().toLocaleString()}
                                                                    </Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md={8}>
                                                                    <Row>

                                                                        <Col md={12} style={{ marginLeft: '-0px' }}>
                                                                            <Card.Text className="mb-3">
                                                                                Phí vận chuyển
                                                                            </Card.Text>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Card.Text className="mb-3">
                                                                        đ 10
                                                                    </Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md={8}>
                                                                    <Row>

                                                                        <Col md={12} style={{ marginLeft: '-0px' }}>
                                                                            <Card.Text className="mb-0">
                                                                                Tổng thanh toán
                                                                            </Card.Text>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Card.Text className="mb-0" style={{ fontWeight: 'bold', color: 'red', fontSize: '20px' }}>
                                                                        đ {calculateTotal().toLocaleString()}
                                                                    </Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                                <Card.Text style={{ padding: '20px 40px', marginBottom: '0', borderTop: '1px solid #d5d6d6' }}>
                                                    <Row className="align-items-center">
                                                        <Col md={8}>
                                                            <Card.Text className="mb-0">
                                                                Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Shopee
                                                            </Card.Text>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Row>
                                                                <Col md={12}>
                                                                    <Button onClick={AddOrders} variant="danger" style={{ width: '100%', padding: '10px 20px' }}>
                                                                        {loadings ? (
                                                                            <>
                                                                                <FaSpinner className="spinner" style={{ marginRight: '10px' }} />
                                                                                Đặt Hàng...
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <FaShoppingCart style={{ marginRight: '10px' }} />
                                                                                Đặt Hàng
                                                                            </>
                                                                        )}
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card.Text>
                                            </Card>
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                <div className='py-5' style={{ paddingBottom: '20px', textAlign: 'center' }}>
                                    <Card.Img
                                        variant="top"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWfF895uB3WeRR3mlkHcNhz4vvKIcWIgbriQ&s"
                                        alt="Empty Cart"
                                        style={{ width: '10%', height: 'auto', objectFit: 'cover', marginBottom: '10px' }}
                                    />
                                    <Card.Text className="text-muted mb-0">
                                        Không có sản phầm nào để đặt hàng
                                    </Card.Text>
                                    <Link to="/cart/listcart" style={{ textDecoration: 'none' }}>
                                        <Button variant="danger" style={{ padding: '10px 60px', marginTop: '10px' }}>
                                            Giỏ hàng
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </CustomerLayout>
        </>
    );
};

export default ListOrder;
