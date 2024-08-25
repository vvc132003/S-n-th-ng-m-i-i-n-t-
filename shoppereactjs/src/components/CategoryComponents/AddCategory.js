import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { addCategory } from '../../Service/CategoryService';
import { FaPlus, FaSpinner } from 'react-icons/fa';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();



    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            const formData = new FormData();
            formData.append('CategoryName', categoryName);
            const response = await addCategory(formData);
            console.log('Response from server:', response);
            navigate('/admin/listcategory');
        } catch (error) {
            setError('Error adding user.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <Layout>
            <header className="header">
                <h1> > Category > Add Category</h1>
            </header>
            <main className="main-content container mt-4">
                <div className="container mt-4">
                    <form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="mb-3">
                            <label htmlFor="categoryName" className="form-label">Category Name</label>
                            <input
                                type="text"
                                id="categoryName"
                                className="form-control"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? <FaSpinner className="spinner" /> : <FaPlus style={{ marginRight: '0px' }} />}
                            {loading ? ' Add' : ' Add'}
                        </button>
                    </form>
                </div>
            </main>
        </Layout>
    );
};

export default AddCategory;
