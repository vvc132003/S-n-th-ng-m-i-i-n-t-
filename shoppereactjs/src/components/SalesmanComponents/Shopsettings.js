import React, { useState } from 'react';
import { Card, Col, Row, Container, Form, Button } from 'react-bootstrap';
import SidebarSale from '../Layout/SidebarSale'; // Adjust the path as needed
import SalesmanLayout from '../Layout/SalesmanLayout';
import { addShop } from '../../Service/ShopService';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Shopsettings = () => {
    const [shopName, setShopName] = useState('');
    const [description, setDescription] = useState('');
    const [addresses, setAddresses] = useState('');
    const [avatar, setAvatar] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);


    const handleClick = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const user = JSON.parse(sessionStorage.getItem('users'));
            const formData = new FormData();
            formData.append('ShopName', shopName);
            formData.append('Description', description);
            formData.append('Addresses', addresses);
            formData.append('Phonenumber', phoneNumber);
            formData.append('UserId', user.id);
            if (avatar) {
                formData.append('avatarFile', avatar);
            }
            await addShop(formData);
            toast.success(`Thêm ${shopName} thành công!`);
        } catch (error) {
            console.error('Error adding shop:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleFileChange = (event) => {
        setAvatar(event.target.files[0]);
    };
    return (
        <SalesmanLayout>
            <Container fluid className="p-4 header-container">
                <Row>
                    <Col md={3}>
                        <SidebarSale />
                    </Col>
                    <Col md={9}>
                        <Card className="shadow-lg b-light">
                            <Card.Text style={{ padding: '20px 40px', marginBottom: '10px', borderBottom: '1px solid #d5d6d6' }}>
                                <h2 className="" style={{ fontSize: '30px' }}>Hồ sơ shop</h2>
                            </Card.Text>
                            <Card.Body>
                                <Row>
                                    <Col md={4}>
                                        <div className="text-center">
                                            <img
                                                src="https://via.placeholder.com/150"
                                                alt="Shop"
                                                style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                                            />
                                            <h3 className="mb-0 p-4">{shopName}</h3>
                                        </div>
                                    </Col>
                                    <Col md={8}>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Tên Shop</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={shopName}
                                                    onChange={(e) => setShopName(e.target.value)}
                                                    style={{ borderRadius: "0" }}

                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Mô Tả Shop</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    value={description}
                                                    style={{ borderRadius: "0" }}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Địa Chỉ Shop</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={addresses}
                                                    style={{ borderRadius: "0" }}
                                                    onChange={(e) => setAddresses(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Logo</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    id="avatar"
                                                    style={{ borderRadius: "0" }}
                                                    onChange={handleFileChange}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Số Điện Thoại</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={phoneNumber}
                                                    style={{ borderRadius: "0" }}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                />
                                            </Form.Group>
                                            <div className="text-center">
                                                <Button
                                                    disabled={loading}
                                                    onClick={handleClick}
                                                    style={{ background: 'red', border: 'none', width: '200px', height: '40px',borderRadius: "0"  }}
                                                >
                                                    {loading ? <FaSpinner className="spinner" /> : <FaPlus style={{ marginRight: '0px' }} />}
                                                    {loading ? ' Thêm Shop' : ' Thêm Shop'}
                                                </Button>
                                            </div>
                                        </Form>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </SalesmanLayout>
    );
};

export default Shopsettings;
