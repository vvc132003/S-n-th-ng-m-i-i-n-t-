import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HubConnectionBuilder } from '@microsoft/signalr';

const SearchRoom = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://192.168.0.125:7027/api/khachsan/KhachSanList');
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();

    const connection = new HubConnectionBuilder()
      .withUrl('http://192.168.0.125:7027/thuephonghub')
      .withAutomaticReconnect()
      .build();
    connection.start()
      .then(() => {
        console.log('Connected to SignalR hub.');

        connection.on('ReceiveThuePhong', (idkhachsan) => {
          fetphongidks(idkhachsan);
        });
      })
      .catch(error => console.error('SignalR connection error:', error));

    return () => {
      connection.stop();
    };

  }, []);

  const handleHotelChange = async (e) => {
    const selectedHotelId = e.target.value;
    console.log(selectedHotelId);
    setSelectedHotel(selectedHotelId);
    fetphongidks(selectedHotelId);

  };
  const fetphongidks = async (selectedHotelId) => {
    if (selectedHotelId) {
      try {
        const selectedHotelData = hotels.find(hotel => hotel.id === selectedHotelId);
        if (selectedHotelData) {
          const response = await axios.get(`http://192.168.0.125:7027/api/khachsan/GetPhongbyidKhachsan?idkhachsan=${selectedHotelData.id}`);
          setRooms(response.data);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    } else {
      setRooms([]);
    }
  };


  return (
    <div className="container mt-5">
      <div className="form-group">
        <label htmlFor="hotelName">Chọn khách sạn</label>
        <select
          className="form-control"
          id="hotelName"
          value={selectedHotel}
          onChange={handleHotelChange}
        >
          <option value="">Chọn khách sạn</option>
          {hotels.map(hotel => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.tenkhachsan}
            </option>
          ))}
        </select>
      </div>

      {rooms.length > 0 && (
        <div className="mt-4">
          <h3>Danh sách phòng:</h3>
          <div className="row">
            {rooms.map(room => (
              <div className="col-md-4" key={room.id}>
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Phòng {room.sophong}</h5>
                    <p className="card-text">Giá: {room.giatientheogio} VNĐ</p>
                    <p className="card-text">Mô tả: {room.giatientheongay}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchRoom;
