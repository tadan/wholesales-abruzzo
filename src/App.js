import React, { useState, useEffect } from 'react'
import Papa from 'papaparse'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    Container,
    Row,
    Col,
    Form,
    Card,
    InputGroup,
    Button,
} from 'react-bootstrap'
import { FaSearch, FaFilter } from 'react-icons/fa'
import './App.css'

function App() {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [targetCustomers, setTargetCustomers] = useState([])
    const [filters, setFilters] = useState({
        category: '',
        targetCustomer: '',
        searchTerm: '',
    })

    useEffect(() => {
        // Load and parse the CSV file
        Papa.parse('/csv/Wholesale Products - Sheet.csv', {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const productsData = results.data

                // Extract unique categories and target customers
                const uniqueCategories = [
                    ...new Set(
                        productsData
                            .map((product) => product.Category)
                            .filter(Boolean)
                    ),
                ]
                const uniqueTargetCustomers = [
                    ...new Set(
                        productsData
                            .map((product) => product.Target_Customer)
                            .filter(Boolean)
                    ),
                ]

                setProducts(productsData)
                setFilteredProducts(productsData)
                setCategories(uniqueCategories)
                setTargetCustomers(uniqueTargetCustomers)
                setLoading(false)
            },
        })
    }, [])

    useEffect(() => {
        // Apply filters when filter state changes
        const applyFilters = () => {
            let filtered = [...products]

            // Filter by category
            if (filters.category) {
                filtered = filtered.filter(
                    (product) => product.Category === filters.category
                )
            }

            // Filter by target customer
            if (filters.targetCustomer) {
                filtered = filtered.filter(
                    (product) =>
                        product.Target_Customer === filters.targetCustomer
                )
            }

            // Search by name or description
            if (filters.searchTerm) {
                const searchLower = filters.searchTerm.toLowerCase()
                filtered = filtered.filter(
                    (product) =>
                        product.Name?.toLowerCase().includes(searchLower) ||
                        product.Description?.toLowerCase().includes(
                            searchLower
                        ) ||
                        product.Code?.toLowerCase().includes(searchLower)
                )
            }

            setFilteredProducts(filtered)
        }

        applyFilters()
    }, [filters, products])

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSearchChange = (e) => {
        setFilters((prev) => ({
            ...prev,
            searchTerm: e.target.value,
        }))
    }

    const clearFilters = () => {
        setFilters({
            category: '',
            targetCustomer: '',
            searchTerm: '',
        })
    }

    if (loading) {
        return (
            <Container className='text-center my-5'>
                <h2>Loading product catalog...</h2>
            </Container>
        )
    }

    return (
        <div className='App'>
            <header className='bg-dark text-white py-4 mb-4'>
                <Container>
                    <h1 className='display-5'>Wholesale Product Catalog</h1>
                    <p className='lead'>
                        Browse our selection of premium Italian products
                    </p>
                </Container>
            </header>

            <Container>
                <Row className='mb-4'>
                    <Col md={4}>
                        <div className='mb-3'>
                            <InputGroup>
                                <Form.Control
                                    placeholder='Search products...'
                                    name='searchTerm'
                                    value={filters.searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <InputGroup.Text>
                                    <FaSearch />
                                </InputGroup.Text>
                            </InputGroup>
                        </div>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Select
                                name='category'
                                value={filters.category}
                                onChange={handleFilterChange}
                            >
                                <option value=''>All Categories</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Select
                                name='targetCustomer'
                                value={filters.targetCustomer}
                                onChange={handleFilterChange}
                            >
                                <option value=''>All Customer Types</option>
                                {targetCustomers.map((customer, index) => (
                                    <option key={index} value={customer}>
                                        {customer}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Button
                            variant='outline-secondary'
                            className='w-100'
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </Button>
                    </Col>
                </Row>

                <Row className='mb-3'>
                    <Col>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h2 className='h4'>
                                <FaFilter className='me-2' />
                                Products ({filteredProducts.length})
                            </h2>
                        </div>
                    </Col>
                </Row>

                <Row xs={1} md={2} lg={3} className='g-4 mb-5'>
                    {filteredProducts.map((product, idx) => (
                        <Col key={idx}>
                            <Card className='h-100 product-card'>
                                <div className='card-img-container'>
                                    {product.Picture_URL ? (
                                        <Card.Img
                                            variant='top'
                                            src={product.Picture_URL}
                                            alt={product.Name}
                                            className='product-image'
                                        />
                                    ) : (
                                        <div className='placeholder-image d-flex justify-content-center align-items-center bg-light'>
                                            <span className='text-muted'>
                                                No image available
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <Card.Body>
                                    <Card.Title className='product-title'>
                                        {product.Name}
                                    </Card.Title>
                                    <div className='product-meta'>
                                        {product.Category && (
                                            <span className='badge bg-info me-2'>
                                                {product.Category}
                                            </span>
                                        )}
                                        {product.Target_Customer && (
                                            <span className='badge bg-secondary'>
                                                {product.Target_Customer}
                                            </span>
                                        )}
                                    </div>
                                    <Card.Text className='product-description mt-2'>
                                        {product.Description ||
                                            'No description available'}
                                    </Card.Text>
                                    <hr />
                                    <div className='product-details'>
                                        {product.Code && (
                                            <p className='mb-1'>
                                                <strong>Code:</strong>{' '}
                                                {product.Code}
                                            </p>
                                        )}
                                        {product.Size && (
                                            <p className='mb-1'>
                                                <strong>Size:</strong>{' '}
                                                {product.Size}
                                            </p>
                                        )}
                                        {product.Stagionatura && (
                                            <p className='mb-1'>
                                                <strong>Aging:</strong>{' '}
                                                {product.Stagionatura}
                                            </p>
                                        )}
                                        {product.Expiring_Date && (
                                            <p className='mb-1'>
                                                <strong>Expires:</strong>{' '}
                                                {product.Expiring_Date}
                                            </p>
                                        )}
                                    </div>
                                </Card.Body>
                                <Card.Footer className='text-end'>
                                    <span className='h5 mb-0 price-tag'>
                                        €{product.Price}
                                    </span>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {filteredProducts.length === 0 && (
                    <div className='text-center py-5'>
                        <h3>No products match your search</h3>
                        <p>Try adjusting your filters or search term</p>
                        <Button variant='primary' onClick={clearFilters}>
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </Container>

            <footer className='bg-dark text-white py-4 mt-auto'>
                <Container className='text-center'>
                    <p className='mb-0'>
                        © {new Date().getFullYear()} Wholesale Abruzzo - Premium
                        Italian Products
                    </p>
                </Container>
            </footer>
        </div>
    )
}

export default App
