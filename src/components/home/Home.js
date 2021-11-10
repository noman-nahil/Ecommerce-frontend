import { useState, useEffect } from "react";
import { getCategories, getFilterProducts, getProducts } from "../../api/apiProduct";
import { showError, showSuccess } from "../../utils/messages";
import Layout from "../Layout";
import Card from "./Card";
import CheckBox from "./CheckBox";


const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([])
    const [limit, setLimit] = useState(30);
    const [skip, setSkip] = useState()
    const [order, setOrder] = useState('desc');
    const [sortBy, setSortBy] = useState('createdAt')
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [filters, setFilters] = useState({
        category: [],
        price: []
    })

    useEffect(() => {
        getProducts(sortBy, order, limit)
            .then(response => setProducts(response.data))
            .catch(err => setError('Failed to load products'))
        getCategories()
            .then(response => setCategories(response.data))
            .catch(err => setError('Failed to load categories'))
    }, [])

    const handleFilters = (myFilters, filterBy) => {
        const newFilters = { ...filters }
        if (filterBy === 'category') {
            newFilters[filterBy] = myFilters
        }
        setFilters(newFilters);
        getFilterProducts(skip, limit, newFilters, order, sortBy)
            .then(response => setProducts(response.data))
            .catch(err => setError('Failed to load products'))
    }
    const showFilters = () => {
        return (
            <>
                <div className="row">
                    <div className="col-sm-3">
                        <h5>Filter By Categories</h5>
                        <ul><CheckBox categories={categories} handleFilters={myFilters => handleFilters(myFilters, 'category')} /></ul>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div>
            <Layout title="Home Page" className="container-fluid">
                {showFilters()}
                <div style={{ width: "100px" }}>
                    {showError(error, error)}
                    {showSuccess(success, "Added to cart successfully")}
                </div>
                <div className="row">
                    {products && products.map(product => <Card product={product} key={product._id} />)}
                </div>

            </Layout>
        </div>
    )
}

export default Home;
