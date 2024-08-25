import React, { useState, useEffect } from 'react';
import CustomerLayout from '../Layout/CustomerLayout';
import { Card, Col, Row, Alert, Spinner } from 'react-bootstrap';
import CarouselComponent from '../Layout/CarouselComponent ';
import { addCart } from '../../Service/CartService';
import { FaShoppingCart } from 'react-icons/fa';
import { getProduct, checksoluongproduct } from '../../Service/ProductService';
import { quantity } from '../../Service/CartService';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const CustomerHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

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
      const Quantity = 1;
      const checksl = await checksoluongproduct(ProductId);
      if (checksl.quantity >= 1) {
        toast.success('Thêm sản phẩm vào giỏ hàng thành công!');
        await addCart(UserId, ProductId, Quantity);
        navigate('/');;
      } else if (checksl.quantity == 0) {
        toast.warning('Sản phẩm này đã hết hàng!');
      }
    } else {
      navigate('/login');;
    }
  };



  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <CustomerLayout handleCartUpdate={handleCartUpdate}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Spinner animation="border" role="status" variant="primary">
              <span className="sr-only"></span>
            </Spinner>
          </div>
        ) : (
          <>
            <CarouselComponent />
            <div className="py-3">
              <div className="header-container">
                <Row xs={1} sm={2} md={3} lg={5} className="g-4">
                  {products.map(product => (
                    <Col key={product.id}>
                      <Card className="h-100">
                        <Card.Img variant="top" src={product.avatar} alt={product.productName} />
                        <Card.Body>
                          <Link
                            to={`/product/product?idproduct=${product.id}`}
                            style={{
                              display: 'block',
                              fontSize: '14px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              textDecoration: 'none',
                              color: 'inherit',
                              cursor: 'pointer'
                            }}
                          >
                            {product.productName}
                          </Link>
                          <div className='row'>
                            <div className='col-6'>
                              <Card.Text className="text-danger">
                                đ {product.price.toLocaleString()}
                              </Card.Text>
                            </div>
                            <div className='col-6 text-end text-danger'>
                              <FaShoppingCart
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleAddToCart(product.id)}
                              />
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </>
        )}
      </CustomerLayout>
    </>
  );
};

export default CustomerHome;
