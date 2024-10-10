import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Helmet } from 'react-helmet-async';
import SidebarSale from '../../Layout/SidebarSale';
import SalesmanLayout from '../../Layout/SalesmanLayout';
import { Card, Col, Row, Container } from 'react-bootstrap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Statistical = () => {
    // Dữ liệu cho biểu đồ cột thống kê doanh thu theo tháng
    const barData = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                label: "Doanh thu (triệu VND)",
                backgroundColor: "rgba(75,192,192,0.6)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(75,192,192,0.8)",
                hoverBorderColor: "rgba(75,192,192,1)",
                data: [300, 400, 350, 500, 600, 700, 650, 800, 750, 900, 850, 950],
            },
        ],
    };

    // Dữ liệu cho biểu đồ tròn
    const pieData = {
        labels: ["Product A", "Product B", "Product C", "Product D"],
        datasets: [
            {
                label: "Doanh thu theo sản phẩm",
                backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"],
                data: [300, 500, 200, 400],
            },
        ],
    };

    // Cấu hình biểu đồ cột
    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            title: {
                display: true,
                text: "Thống kê doanh thu theo tháng trong năm",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return value + " triệu VND"; // Hiển thị đơn vị triệu VND trên trục Y
                    },
                },
            },
        },
    };

    // Cấu hình biểu đồ tròn
    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            title: { display: true, text: "Phân bố dân số theo khu vực" },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw} triệu VND`;
                    },
                },
            },
        },
    };

    return (
        <>
            <Helmet>
                <title>Thống kê doanh thu</title>
            </Helmet>
            <SalesmanLayout>
                <Container fluid className="p-4 header-container">
                    <Row>
                        {/* Sidebar Bên Trái */}
                        <Col md={3}>
                            <SidebarSale />
                        </Col>

                        {/* Nội dung Bên Phải */}
                        <Col md={9}>
                            <Card className="shadow-lg b-light">
                                <Card.Text style={{ padding: '20px 40px', marginBottom: '10px', borderBottom: '1px solid #d5d6d6' }}>
                                    <h2 className="" style={{ fontSize: '20px' }}>> Doanh Thu</h2>
                                </Card.Text>
                                <Card.Body>
                                    <div className="container" style={{ marginBottom: '10px', borderBottom: '1px solid #d5d6d6' }}>
                                        <Bar data={barData} options={barOptions} />
                                    </div>
                                </Card.Body>
                                <Card.Body>
                                    <div className="container">
                                        <Row>
                                            <Col md={5}>
                                                <Pie data={pieData} options={pieOptions} />
                                            </Col>
                                            <Col md={7}>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </SalesmanLayout>
        </>
    );
};

export default Statistical;
