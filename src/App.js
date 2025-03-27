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
import { useTranslation } from './context/TranslationContext'
import { loadCSV } from './utils/csvLoader'

function App() {
    const t = useTranslation()
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
        // Update document title
        document.title = t('Wholesale Abruzzo - Premium Italian Products')

        // Try the main approach with Papa.parse and process.env.PUBLIC_URL
        const csvPath =
            process.env.PUBLIC_URL + '/csv/Wholesale Products - Sheet.csv'
        console.log('Attempting to load CSV from:', csvPath)

        // First attempt with Papa.parse direct download
        Papa.parse(csvPath, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                console.log('CSV parsing successful:', results)
                processCSVData(results.data)
            },
            error: (error) => {
                console.error(
                    'Error with direct Papa.parse, trying fetch approach:',
                    error
                )

                // Fallback to fetch approach if direct parsing fails
                loadCSV(csvPath)
                    .then((data) => {
                        console.log('CSV loaded with fetch approach:', data)
                        processCSVData(data)
                    })
                    .catch((fetchError) => {
                        console.error(
                            'Both CSV loading methods failed:',
                            fetchError
                        )
                        setLoading(false)
                    })
            },
        })
    }, [t])

    // Helper function to process the CSV data
    const processCSVData = (productsData) => {
        // Extract unique categories and target customers
        const uniqueCategories = [
            ...new Set(
                productsData.map((product) => product.Category).filter(Boolean)
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
    }

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
                <h2>{t('Loading product catalog...')}</h2>
            </Container>
        )
    }

    return (
        <div className='App'>
            <header className='bg-dark text-white py-4 mb-4'>
                <Container>
                    <h1 className='display-5'>
                        {t('Wholesale Product Catalog')}
                    </h1>
                    <p className='lead'>
                        {t('Browse our selection of premium Italian products')}
                    </p>
                </Container>
            </header>

            <Container>
                <Row className='mb-4'>
                    <Col md={4}>
                        <div className='mb-3'>
                            <InputGroup>
                                <Form.Control
                                    placeholder={t('Search products...')}
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
                                <option value=''>{t('All Categories')}</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {t(category)}
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
                                <option value=''>
                                    {t('All Customer Types')}
                                </option>
                                {targetCustomers.map((customer, index) => (
                                    <option key={index} value={customer}>
                                        {t(customer)}
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
                            {t('Clear Filters')}
                        </Button>
                    </Col>
                </Row>

                <Row className='mb-3'>
                    <Col>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h2 className='h4'>
                                <FaFilter className='me-2' />
                                {t('Products')} ({filteredProducts.length})
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
                                                {t('No image available')}
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
                                                {t(product.Category)}
                                            </span>
                                        )}
                                        {product.Target_Customer && (
                                            <span className='badge bg-secondary'>
                                                {t(product.Target_Customer)}
                                            </span>
                                        )}
                                    </div>
                                    <Card.Text className='product-description mt-2'>
                                        {product.Description ||
                                            t('No description available')}
                                    </Card.Text>
                                    <hr />
                                    <div className='product-details'>
                                        {product.Code && (
                                            <p className='mb-1'>
                                                <strong>{t('Code')}:</strong>{' '}
                                                {product.Code}
                                            </p>
                                        )}
                                        {product.Size && (
                                            <p className='mb-1'>
                                                <strong>{t('Size')}:</strong>{' '}
                                                {product.Size}
                                            </p>
                                        )}
                                        {product.Stagionatura && (
                                            <p className='mb-1'>
                                                <strong>{t('Aging')}:</strong>{' '}
                                                {product.Stagionatura}
                                            </p>
                                        )}
                                        {product.Expiring_Date && (
                                            <p className='mb-1'>
                                                <strong>{t('Expires')}:</strong>{' '}
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
                        <h3>{t('No products match your search')}</h3>
                        <p>{t('Try adjusting your filters or search term')}</p>
                        <Button variant='primary' onClick={clearFilters}>
                            {t('Clear All Filters')}
                        </Button>
                    </div>
                )}
            </Container>

            <footer className='bg-dark text-white py-4 mt-auto'>
                <Container className='text-center'>
                    <p className='mb-0'>
                        © {new Date().getFullYear()}{' '}
                        {t('Wholesale Abruzzo - Premium Italian Products')}
                    </p>
                </Container>
            </footer>
        </div>
    )
}

export default App
