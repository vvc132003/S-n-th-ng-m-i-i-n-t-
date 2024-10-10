import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HubConnectionBuilder } from '@microsoft/signalr';
// import { createSignalRConnection } from '../../../service/signalRConnection';

const ListPhong = () => {
    const [phongList, setPhongList] = useState([]);

    useEffect(() => {
        const fetchPhongList = async () => {
            try {
                const response = await axios.get('http://192.168.0.125:7027/api/phong/ListPhongidkhachsan?idkhachsan=1');
                setPhongList(response.data); // Accessing data property
            } catch (error) {
                console.error('Error fetching room data:', error);
            }
        };

        fetchPhongList();
        const connection = new HubConnectionBuilder()
            .withUrl('http://192.168.0.125:7027/thuephonghub')
            .withAutomaticReconnect()
            .build();
        connection.start()
            .then(() => {
                console.log('Connected to SignalR hub.');

                connection.on('ReceiveThuePhong', () => {
                    fetchPhongList();
                });
                connection.on('ReceiveThanhToan', () => {
                    fetchPhongList();
                });
            })
            .catch(error => console.error('SignalR connection error:', error));

        return () => {
            connection.stop();
        };
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Danh Sách Phòng</h1>
            <table className="table table-bordered table-hover">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Số Phòng</th>
                        <th>Số Người</th>
                        <th>Loại Phòng</th>
                        <th>Tình Trạng Phòng</th>
                        <th>Giá Theo Giờ</th>
                        <th>Giá Theo Ngày</th>
                    </tr>
                </thead>
                <tbody>
                    {phongList.map(phong => (
                        <tr key={phong.id}>
                            <td>{phong.id}</td>
                            <td>{phong.sophong}</td>
                            <td>{phong.songuoi}</td>
                            <td>{phong.loaiphong}</td>
                            <td>{phong.tinhtrangphong}</td>
                            <td>{phong.giatientheogio.toLocaleString()} VND</td>
                            <td>{phong.giatientheongay.toLocaleString()} VND</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default ListPhong;
