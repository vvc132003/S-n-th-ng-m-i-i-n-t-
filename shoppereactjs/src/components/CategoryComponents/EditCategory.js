import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getCategorybyid, updateCategory } from '../../Service/CategoryService';
import Layout from '../Layout/Layout';
import { FaCheck, FaSpinner } from 'react-icons/fa';

const EditCategory = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('idcategory'); // Get the iduser from the query parameters
    const [categoryName, setCategoryName] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCategorybyid(id);
                setCategoryName(data.categoryName);
            } catch (error) {
                setError('Error fetching user data.');
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('Id', id); 
        formData.append('CategoryName', categoryName);
        try {
            await updateCategory(formData);
            navigate('/admin/listcategory');
        } catch (error) {
            setError('Error updating category.');
            console.error('Error updating category:', error);
        }
    };
    



    return (
        <>
            {loading ? (
                <div className="table-responsive">
                    <div className="overlay">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                </div>
            ) : (
                <Layout>
                    <header className="header">
                        <h1>Category > Edit Category</h1>
                    </header>
                    <main className="main-content container mt-4">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="shopName" className="form-label">Category Name</label>
                                <input
                                    type="text"
                                    id="shopName"
                                    name="shopName"
                                    className="form-control"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-warning"
                                disabled={loading}
                            >
                                {loading ? <FaSpinner className="spinner" /> : <FaCheck style={{ marginRight: '0px' }} />}
                                {loading ? ' Edit' : ' Edit'}
                            </button>
                        </form>
                    </main>
                </Layout>
            )}
        </>
    );
};

export default EditCategory;