import React, { useState, useEffect } from 'react';
import CustomerLayout from '../../Layout/CustomerLayout';
import { Card, Col, Row, Spinner, Button, InputGroup, FormControl, Form, Nav, NavItem, NavLink } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaTag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { quantity } from '../../../Service/CartService';
import { AddOrder, ListOrderUserId } from '../../../Service/OrderService';
import { Helmet } from 'react-helmet-async';
import { FaList, FaClock, FaTruck, FaBox, FaCheckCircle, FaTimesCircle, FaUndo, FaSpinner, FaShoppingCart } from 'react-icons/fa';
import Sidebarpurchase from '../../Layout/Sidebarpurchase';


const Purchase = () => {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadings, setLoadings] = useState(false);

    const [error, setError] = useState(null);
    const [quantitys, setQuantity] = useState(1);
    const [cartQuantity, setCartQuantity] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        fetchOrder(0);
    }, []);

    const fetchOrder = async (type) => {
        setLoading(true);
        try {
            const user = JSON.parse(sessionStorage.getItem('users'));
            if (user && user.id) {
                if (type > 0) {
                    const data = await ListOrderUserId(user.id, type);
                    setOrder(data);
                } else {
                    const data = await ListOrderUserId(user.id, 0);
                    setOrder(data);
                }

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

    const handleClick = (type) => {
        fetchOrder(type);
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
    const groupedOrders = order.reduce((acc, item) => {
        const { orderId } = item.orderDetailDTO;

        if (!acc[orderId]) {
            acc[orderId] = {
                orderId,
                items: [],
                totalPrice: 0,
                shopDto: item.shopDto,
                status: item.orderDTO.status

            };
        }

        acc[orderId].items.push(item);
        acc[orderId].totalPrice += item.productDto.price * item.orderDetailDTO.quantity;

        return acc;
    }, {});

    const sortedGroupedOrders = Object.values(groupedOrders).sort((a, b) => b.orderId - a.orderId);

    return (
        <>
            <Helmet>
                <title>Hàng đã mua</title>
            </Helmet>
            <CustomerLayout handleCartUpdate={handleCartUpdate}>

                <div className="py-4">
                    <div className="header-container">

                        <div style={{ paddingBottom: '20px' }}>
                            <Card.Text className="text-muted mb-0">
                                        > Hàng Đã Mua
                            </Card.Text>
                        </div>
                        <Row>
                            <Col md={3}>
                                <Sidebarpurchase />
                            </Col>
                            <Col md={9}>
                                <Row>
                                    <Col md={12} className="mb-3">
                                        <Card className="shadow-sm">
                                            <Card.Body >
                                                <nav className="navbar navbar-expand-lg navbar-light">
                                                    <div className="container-fluid">
                                                        <ul className="navbar-nav">
                                                            <li className="nav-item">
                                                                <Link
                                                                    to="/user/purchase"
                                                                    className="nav-link"
                                                                    onClick={() => handleClick(0)}
                                                                >
                                                                    Tất cả
                                                                </Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link
                                                                    to="/user/purchase/?type=9"
                                                                    className="nav-link"
                                                                    onClick={() => handleClick(9)}
                                                                >
                                                                    Chờ thanh toán
                                                                </Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link
                                                                    to="/user/purchase/?type=7"
                                                                    className="nav-link"
                                                                    onClick={() => handleClick(7)}
                                                                >
                                                                    Vận chuyển
                                                                </Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link
                                                                    to="/user/purchase/?type=8"
                                                                    className="nav-link"
                                                                    onClick={() => handleClick(8)}
                                                                >
                                                                    Chờ giao hàng
                                                                </Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link
                                                                    to="/user/purchase/?type=3"
                                                                    className="nav-link"
                                                                    onClick={() => handleClick(3)}
                                                                >
                                                                    Hoàn thành
                                                                </Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link
                                                                    to="/user/purchase/?type=4"
                                                                    className="nav-link"
                                                                    onClick={() => handleClick(4)}
                                                                >
                                                                    Đã huỷ
                                                                </Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link
                                                                    to="/user/purchase/?type=12"
                                                                    className="nav-link"
                                                                    onClick={() => handleClick(12)}
                                                                >
                                                                    Trả/hoàn tiền
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </nav>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    {loading ? (

                                        <div className="text-center">
                                            <Spinner animation="border" role="status" variant="primary">
                                                <span className="sr-only"></span>
                                            </Spinner>
                                        </div>
                                    ) : (
                                        <>
                                            {order && order.length > 0 ? (
                                                <>
                                                    {sortedGroupedOrders.map((order) => {
                                                        const { orderId, items, totalPrice, shopDto, status } = order;
                                                        return (
                                                            <Col md={12} key={orderId} className="mb-3">
                                                                <Card className="shadow-sm">
                                                                    <Card.Text
                                                                        style={{
                                                                            padding: '20px 40px',
                                                                            marginBottom: '0',
                                                                            borderBottom: '1px solid #d5d6d6',
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            alignItems: 'center'
                                                                        }}
                                                                    >
                                                                        <div className="d-flex align-items-center">
                                                                            <Card.Img
                                                                                variant="top"
                                                                                src={shopDto.avatar || 'avatar.png'}
                                                                                className="img-fluid"
                                                                                style={{ height: '20px', width: '20px', objectFit: 'cover', marginRight: '10px' }}
                                                                            />
                                                                            <Link
                                                                                to={`/shop?idshop=${shopDto.id}`}
                                                                                style={{ textDecoration: 'none', color: 'inherit' }}
                                                                            >
                                                                                <span style={{ fontSize: '1rem' }}>
                                                                                    {shopDto.shopName}
                                                                                </span>
                                                                            </Link>
                                                                        </div>

                                                                        <div style={{ textAlign: 'right' }}>
                                                                            {/* <div style={{ color: '#28a745', marginBottom: '5px' }}>
                                                                                {status === 'Chờ lấy hàng' ? 'Chờ lấy hàng' : status === 'Đang vận chuyển' ? 'Đang vận chuyển' : 'Trạng thái đơn hàng không xác định'}
                                                                            </div> */}
                                                                            <div style={{ color: 'RED' }}>
                                                                                {status === 'Chờ lấy hàng' ? 'Chờ lấy hàng' : status === 'Đang vận chuyển' ? 'Đang vận chuyển' : 'Trạng thái đơn hàng không xác định'}
                                                                            </div>
                                                                        </div>
                                                                    </Card.Text>

                                                                    <Card.Body style={{ padding: '20px 40px' }}>
                                                                        {items.map((item, index) => (
                                                                            <Row
                                                                                key={item.productDto.id}
                                                                                className="align-items-center"
                                                                                style={{
                                                                                    padding: '20px 0px',
                                                                                    marginBottom: '0',
                                                                                    borderBottom: index < items.length - 1 ? '1px solid #d5d6d6' : 'none',
                                                                                }}
                                                                            >
                                                                                <Col md={4}>
                                                                                    <Row>
                                                                                        <Col md={4} className="text-start">
                                                                                            <Card.Img
                                                                                                variant="top"
                                                                                                src={item.productDto.avatar || 'default-avatar.png'}
                                                                                                className="img-fluid"
                                                                                                style={{ height: '80px', width: '100px', objectFit: 'cover', borderRadius: '8px' }}
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
                                                                                                    to={`/product/product?idproduct=${item.productDto.id}`}
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
                                                                                                    {item.productDto.productName}
                                                                                                </Link>
                                                                                            </Card.Title>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col md={8} className="text-end">
                                                                                    <Card.Text className="text-danger mb-0">
                                                                                        đ {(item.productDto.price * item.orderDetailDTO.quantity).toLocaleString()}
                                                                                    </Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                        ))}
                                                                    </Card.Body>
                                                                    <Card.Text style={{ padding: '20px 40px', marginBottom: '0', borderTop: '1px solid #d5d6d6', backgroundColor: '' }}>
                                                                        <Row className="align-items-center">
                                                                            <Col md={7}>
                                                                                <Card.Text className="mb-0"></Card.Text>
                                                                            </Col>
                                                                            <Col md={5} className='text-end'>
                                                                                <Row>
                                                                                    <Col md={8} >
                                                                                        <Row>
                                                                                            <Col md={12} style={{ marginLeft: '-0px' }}>
                                                                                                <Card.Text className="mb-4">
                                                                                                    Thành tiền:
                                                                                                </Card.Text>
                                                                                            </Col>
                                                                                        </Row>
                                                                                    </Col>
                                                                                    <Col md={4}>
                                                                                        <Card.Text className="mb-0 text-end" style={{ color: 'red', fontWeight: 'bold' }}>
                                                                                            đ {totalPrice.toLocaleString()}
                                                                                        </Card.Text>
                                                                                    </Col>
                                                                                </Row>
                                                                                <div className='d-flex text-end'>
                                                                                    <Button
                                                                                        style={{ backgroundColor: '#f44336', color: 'white', border: 'none', }}
                                                                                    >
                                                                                        Mua Lại
                                                                                    </Button>
                                                                                    <Button
                                                                                        style={{ backgroundColor: 'white', color: 'black', border: '1px solid #d5d6d6', }}
                                                                                    >
                                                                                        Liên Hệ Người Bán
                                                                                    </Button>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </Card.Text>
                                                                </Card>
                                                            </Col>
                                                        );
                                                    })}
                                                </>
                                            ) : (
                                                <Col md={12} className="mb-3">
                                                    <Card className="shadow-sm" style={{ width: '100%', height: '500px' }}>
                                                        <Card.Body
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                height: '100%',
                                                                padding: '20px 40px',
                                                            }}
                                                        >
                                                            <div className="text-center">
                                                                Chưa có đơn hàng
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            )}
                                        </>
                                    )}
                                </Row>
                            </Col>
                        </Row>

                    </div>
                </div>
            </CustomerLayout>
        </>
    );
};

export default Purchase;
