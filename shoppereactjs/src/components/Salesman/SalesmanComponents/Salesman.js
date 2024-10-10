import React from 'react';
import { Card, Col, Row, Button, Container } from 'react-bootstrap';
import { FaShoppingCart, FaBox, FaClipboardList, FaChartLine, FaCog } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import SalesmanLayout from '../../Layout/SalesmanLayout';

const Salesman = () => {
    const navigate = useNavigate();

    const handleAddProduct = () => {
        navigate('/salesman/add-product');
    };

    const handleShopSettings = () => {
        navigate('/salesman/shop-settings');
    };

    return (
        <SalesmanLayout>
            <Container fluid className="p-4 header-container">
                <h2 className="mb-4 text-center">Chào mừng đến với MyShop - Kênh người bán</h2>
                <Row className="g-4">
                    <Col md={4} lg={4}>
                        <Card className="text-center shadow-lg border-light">
                            <Card.Body>
                                <FaShoppingCart size={60} className="mb-3 text-primary" />
                                <Card.Title className="h5">Đơn Hàng</Card.Title>
                                <Card.Text>
                                    Quản lý đơn hàng, theo dõi việc vận chuyển và cập nhật trạng thái đơn hàng.
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate('/salesman/orders')} className="w-100">
                                    Đơn Hàng
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} lg={4}>
                        <Card className="text-center shadow-lg border-light">
                            <Card.Body>
                                <FaBox size={60} className="mb-3 text-success" />
                                <Card.Title className="h5">Sản Phẩm</Card.Title>
                                <Card.Text>
                                    Thêm sản phẩm mới, cập nhật thông tin chi tiết sản phẩm và quản lý hàng tồn kho.
                                </Card.Text>
                                <Link
                                    to="/salesman/shop-listproduct"
                                    className="btn btn-success w-100" 
                                >
                                    Sản Phẩm
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} lg={4}>
                        <Card className="text-center shadow-lg border-light">
                            <Card.Body>
                                <FaClipboardList size={60} className="mb-3 text-warning" />
                                <Card.Title className="h5">Doanh thu</Card.Title>
                                <Card.Text>
                                    Xem báo cáo chi tiết về hiệu suất bán hàng và doanh thu của bạn.
                                </Card.Text>
                                <Button variant="warning" onClick={() => navigate('/salesman/shop-statistical')} className="w-100">
                                    Doanh Thu
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} lg={4}>
                        <Card className="text-center shadow-lg border-light">
                            <Card.Body>
                                <FaChartLine size={60} className="mb-3 text-info" />
                                <Card.Title className="h5">Phân tích</Card.Title>
                                <Card.Text>
                                    Phân tích hiệu suất của cửa hàng bằng công cụ phân tích toàn diện.
                                </Card.Text>
                                <Button variant="info" onClick={() => navigate('/salesman/analytics')} className="w-100">
                                    Xem và Phân Tích
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} lg={4}>
                        <Card className="text-center shadow-lg border-light">
                            <Card.Body>
                                <FaCog size={60} className="mb-3 text-secondary" />
                                <Card.Title className="h5">Thiết lập Shop</Card.Title>
                                <Card.Text>
                                    Cấu hình thông tin và cài đặt cho cửa hàng của bạn.
                                </Card.Text>
                                <Button variant="secondary" onClick={handleShopSettings} className="w-100">
                                    Cài Đặt Shop
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </SalesmanLayout>
    );
};

export default Salesman;
