import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { logins } from '../../Service/UserService'; // Ensure this import is correct
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await logins(email, password);
            if (response.status === 200) {
                const userData = {
                    id: response.data.id,
                    userName: response.data.userName,
                    email: response.data.email,
                    role: response.data.role,
                };
                sessionStorage.setItem('users', JSON.stringify(userData));
                toast.success("Đăng nhập thành công!");
                navigate(userData.role === 'Quản lý' ? '/admin' : '/');
            } else {
                toast.error("Sai email hoặc mật khẩu.");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi đăng nhập.");
            console.error("Login error:", error);
        }
    };

    const handleGoogleLogin = () => {
        // Handle Google login
        console.log("Google login clicked");
    };

    const handleFacebookLogin = () => {
        // Handle Facebook login
        console.log("Facebook login clicked");
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow-lg">
                    <Card.Img
                        variant="top"
                        src="https://phuongnamvina.com/img_data/images/design-logo-ban-hang-online.jpg"
                        className="mb-4 mx-auto"
                        style={{ width: '150px' }}
                    />
                    <Card.Title className="text-center mb-4">Đăng Nhập</Card.Title>
                    <Form onSubmit={handleLoginSubmit}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Control
                                type="email"
                                placeholder='Nhập email'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                style={{ borderRadius: "0" }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Control
                                type="password"
                                placeholder='Nhập mật khẩu'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                                style={{ borderRadius: "0" }}
                            />
                        </Form.Group>
                        <Button style={{ background: '#e64a19', border: 'none', width: '97%' }} type="submit">
                            Đăng Nhập
                        </Button>
                    </Form>
                    <div className="text-center mt-3">
                        <a href="/forgot-password" className="text-decoration-none">Quên mật khẩu?</a>
                    </div>
                    <div className="text-center mt-4">
                        <Button style={{ width: '166px', background: 'none', border: '1px solid #ccc' }} className="me-2" onClick={handleGoogleLogin}>
                            <FaGoogle style={{ color: 'e64a19' }} size={20} />
                        </Button>
                        <Button style={{ width: '161px', background: 'none', border: '1px solid #ccc' }} onClick={handleFacebookLogin}>
                            <FaFacebook style={{ color: 'blue' }} size={20} />
                        </Button>
                    </div>
                </Card>
                <ToastContainer />
            </Container>
        </>
    );
};

export default Login;
