import React, { useState, useEffect } from 'react';
import CustomerLayout from '../Layout/CustomerLayout';
import { Card, Col, Row, Alert, Spinner, Button, InputGroup, FormControl } from 'react-bootstrap';
import { cartbyiduser, deleteQuantityccart, AddQuantityccart, Deletecarrtdeltal } from '../../Service/CartService';
import { useNavigate, Link } from 'react-router-dom';
import { FaTag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { quantity } from '../../Service/CartService';
import { Helmet } from 'react-helmet-async';


const ListCart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantitys, setQuantity] = useState(1); // State to manage the quantity
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

    const DeleteQuantity = async (ProductId) => {
        const user = JSON.parse(sessionStorage.getItem('users'));
        if (user && user.id) {
            try {
                await deleteQuantityccart(user.id, ProductId);
                toast.success('Xoá sản phẩm khỏi giỏ hàng thành công!');
                await fetchCart();
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        } else {
            navigate('/login');
        }
    };

    const DeleteCart = async (ProductId) => {
        const user = JSON.parse(sessionStorage.getItem('users'));
        if (user && user.id) {
            try {
                await Deletecarrtdeltal(user.id, ProductId);
                toast.success('Xoá sản phẩm khỏi giỏ hàng thành công!');
                await fetchCart();
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        } else {
            navigate('/login');
        }
    };

    const AddQuantity = async (ProductId) => {
        const user = JSON.parse(sessionStorage.getItem('users'));
        if (user && user.id) {
            try {
                await AddQuantityccart(user.id, ProductId);
                toast.success('Thêm sản phẩm vào giỏ hàng thành công!');
                await fetchCart();
            } catch (error) {
                console.error('Error fetching cart:', error);
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
                items: []
            };
        }
        acc[item.shop.id].items.push(item);
        return acc;
    }, {});

    // const allShops = Object.values(groupedCart).map(group => group.shop);

    // console.log(allShops);



    return (
        <>
            <Helmet>
                <title>Giỏ Hàng</title>
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
                                        Giỏ Hàng > Danh Sách Giỏ Hàng
                                        </Card.Text>
                                    </div>
                                    <Row>
                                        <Col md={12} className="mb-3">
                                            <Card className="shadow-sm">
                                                <Card.Body style={{ padding: '20px 40px' }}>
                                                    <Row className="align-items-center">
                                                        <Col md={5}>
                                                            <Row>
                                                                <Col md={1}>
                                                                    <Card.Text className="mb-0">
                                                                        <input
                                                                            type="checkbox"
                                                                            id="productCheckbox"
                                                                            name="productCheckbox"
                                                                            value="product"
                                                                            className="form-check-input"
                                                                        />
                                                                    </Card.Text>
                                                                </Col>
                                                                <Col md={11}>
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
                                                            <Card.Text className="text-muted mb-0">Số Tiền</Card.Text>
                                                        </Col>
                                                        <Col md={1} className="text-center">
                                                            <Card.Text className="text-muted mb-0">Thao tác</Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {Object.keys(groupedCart).map((shopId) => {
                                            const { shop, items } = groupedCart[shopId];
                                            return (
                                                <Col md={12} key={shopId} className="mb-3">
                                                    <Card className="shadow-sm">
                                                        <Card.Text style={{ padding: '20px 40px', marginBottom: '0', borderBottom: '1px solid #d5d6d6' }}>
                                                            <Row className="align-items-center">
                                                                <Col md={4}>
                                                                    <Row>
                                                                        <Col md={1} className="d-flex align-items-center">
                                                                            <Card.Text className="mb-0">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id={`shopCheckbox-${shopId}`}
                                                                                    name="shopCheckbox"
                                                                                    value={shopId}
                                                                                    className="form-check-input"
                                                                                />
                                                                            </Card.Text>
                                                                        </Col>
                                                                        <Col md={2} className="d-flex align-items-center">
                                                                            <Card.Img
                                                                                variant="top"
                                                                                src={shop.avatar || 'avatar.png'}
                                                                                className="img-fluid"
                                                                                style={{ height: '20px', width: '20px', objectFit: 'cover' }}
                                                                            />
                                                                        </Col>
                                                                        <Col md={9} style={{ marginLeft: '-35px' }}>
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
                                                                    <Col md={5}>
                                                                        <Row>
                                                                            <Col md={1} className="d-flex align-items-center">
                                                                                <Card.Text className="mb-0">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id={`productCheckbox-${item.product.id}`}
                                                                                        name="productCheckbox"
                                                                                        value={item.product.id}
                                                                                        className="form-check-input"
                                                                                    />
                                                                                </Card.Text>
                                                                            </Col>
                                                                            <Col md={3} className="text-center">
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
                                                                                        to={`/product/product?idproduct=${item.product.id}`}
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
                                                                        <InputGroup style={{ maxWidth: '140px', margin: '0 auto' }}>
                                                                            <Button
                                                                                variant="outline-secondary"
                                                                                onClick={() => DeleteQuantity(item.product.id)}
                                                                                style={{ fontSize: '1rem', width: '40px', height: '40px' }}
                                                                            >
                                                                                -
                                                                            </Button>
                                                                            <FormControl
                                                                                value={item.cartDetail.quantity}
                                                                                onChange={(e) => setQuantity(Number(e.target.value))}
                                                                                style={{ textAlign: 'center', fontSize: '1rem', border: 'none', marginRight: '3px' }}
                                                                                type="text"
                                                                                min="1"
                                                                            />
                                                                            <Button
                                                                                variant="outline-secondary"
                                                                                onClick={() => AddQuantity(item.product.id)}
                                                                                style={{ fontSize: '1rem', width: '40px', height: '40px' }}
                                                                            >
                                                                                +
                                                                            </Button>
                                                                        </InputGroup>
                                                                    </Col>
                                                                    <Col md={2} className="text-center">
                                                                        <Card.Text className="text-danger mb-0">
                                                                            đ {item.cartDetail.totalPrice.toLocaleString()}
                                                                        </Card.Text>
                                                                    </Col>
                                                                    <Col md={1} className="text-center">
                                                                        <Button
                                                                            variant="link"
                                                                            onClick={() => DeleteCart(item.product.id)}
                                                                            className="text-decoration-none text-black p-0"
                                                                        >
                                                                            Xoá
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            ))}
                                                        </Card.Body>
                                                        <Card.Text style={{ padding: '20px 16px', marginBottom: '0', borderTop: '1px solid #d5d6d6' }}>
                                                            <Row className="align-items-center">
                                                                <Col md={4}>
                                                                    <Row>
                                                                        <Col md={1} className="d-flex align-items-center">
                                                                        </Col>
                                                                        <Col md={2} className="d-flex align-items-center">
                                                                            <FaTag style={{ color: '#ff0000', fontSize: '1.5rem', marginRight: '8px' }} />
                                                                        </Col>
                                                                        <Col md={9} style={{ marginLeft: '-35px' }}>
                                                                            <Link to={`/shop?idshop=${shop.id}`} style={{ textDecoration: 'none', color: '#05a', fontSize: '0.9rem' }}>
                                                                                Thêm mã giảm giá của Shop
                                                                            </Link>
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
                                                        <Col md={7}>
                                                        </Col>
                                                        <Col md={5}>
                                                            <Row>
                                                                <Col md={8}>
                                                                    <Row>
                                                                        <Col md={2} className="d-flex align-items-center">
                                                                            <FaTag style={{ color: '#007bff', fontSize: '1.5rem' }} />
                                                                        </Col>
                                                                        <Col md={10} style={{ marginLeft: '-20px' }}>
                                                                            <Card.Text className="mb-0">
                                                                                Shopee Voucher
                                                                            </Card.Text>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                                                        <Link to={`/`} style={{ textDecoration: 'none', color: '#05a', fontSize: '0.9rem' }}>
                                                                            Chọn hoặc nhập mã
                                                                        </Link>
                                                                    </Link>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card.Text>
                                                <Card.Body style={{ padding: '20px 40px' }}>
                                                    <Row className="justify-content-end">
                                                        <Col md={7}>
                                                        </Col>
                                                        <Col md={5}>
                                                            <Row>
                                                                <Col md={8}>
                                                                    <Row>
                                                                        <Col md={2} className="d-flex align-items-center">
                                                                            <Card.Text className="mb-0">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="productCheckbox"
                                                                                    name="productCheckbox"
                                                                                    value="product"
                                                                                    className="form-check-input"
                                                                                />
                                                                            </Card.Text>
                                                                        </Col>
                                                                        <Col md={10} style={{ marginLeft: '-20px' }}>
                                                                            <Card.Text className="mb-0">
                                                                                Bạn chưa chọn sản phẩm
                                                                            </Card.Text>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Card.Text className="mb-0">
                                                                        -0đ
                                                                    </Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                                <Card.Text style={{ padding: '20px 40px', marginBottom: '0', borderTop: '1px solid #d5d6d6' }}>
                                                    <Row className="align-items-center">
                                                        <Col md={6}>
                                                            <Row>
                                                                <Col md={1} className="d-flex align-items-center">
                                                                    <Card.Text className="mb-0">
                                                                        <input
                                                                            type="checkbox"
                                                                            id="productCheckbox"
                                                                            name="productCheckbox"
                                                                            value="product"
                                                                            className="form-check-input"
                                                                        />
                                                                    </Card.Text>
                                                                </Col>
                                                                <Col md={5} className="d-flex align-items-center">
                                                                    <Card.Text className="mb-0 " style={{ fontSize: '18px' }}>
                                                                        Chọn Tất Cả (1)
                                                                    </Card.Text>
                                                                </Col>
                                                                <Col md={2} style={{ marginLeft: '-35px' }}>
                                                                    <Card.Text className="mb-0 " style={{ fontSize: '18px' }}>
                                                                        Xóa
                                                                    </Card.Text>
                                                                </Col>
                                                                <Col md={4} style={{ color: 'red', cursor: 'pointer' }}>
                                                                    <Card.Text className="mb-0 " style={{ fontSize: '18px' }}>
                                                                        Lưu vào...
                                                                    </Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col md={1}>
                                                        </Col>
                                                        <Col md={5}>
                                                            <Row>
                                                                <Col md={8} className="d-flex align-items-center" style={{ fontSize: '18px' }}>
                                                                    Tổng thanh toán:
                                                                    <Card.Text className="mb-0 " style={{ fontSize: '18px', marginLeft: '10px', color: 'red' }}>
                                                                        đ {calculateTotal().toLocaleString()}
                                                                    </Card.Text>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Button variant="danger" style={{ width: '100%', padding: '10px 20px' }}>
                                                                        Mua hàng
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
                                        Giỏ hàng của bạn còn trống
                                    </Card.Text>
                                    <Link to="/" style={{ textDecoration: 'none' }}>
                                        <Button variant="danger" style={{ padding: '10px 60px', marginTop: '10px' }}>
                                            Mua ngay
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

export default ListCart;
