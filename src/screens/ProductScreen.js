import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Image, ListGroup, Card, Form } from 'react-bootstrap'
import { ProductDetails } from '../actions/productActions'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

import Rating from '../components/Rating'

function ProductScreen({match, history}) {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    useEffect(()=>{
        dispatch(ProductDetails(match.params.id)) 
        },
    [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">Go back</Link>

            {
            loading ? <Loader /> 
                : error ? <Message variant={'danger'}>{error}</Message>
                    : <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>${product.price}</strong></Col>
                                    </Row>
    
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{product.countInStock > 0 ? 'In stock': 'Out of stock'}</Col>
                                    </Row>
    
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col className="my-1">Qty:</Col>
                                                            <Col xs="auto" className="my-1">
                                                                <Form.Control
                                                                    as="select"
                                                                    value={qty}
                                                                    onChange={(e) => setQty(e.target.value)}
                                                                >
                                                                    {[...Array(product.countInStock).keys()].map((x)=>(
                                                                        <option key={x+1} value={x + 1}>{x + 1}</option>
                                                                    ))}
                                                                </Form.Control>
                                                            </Col>
                                                        </Row>
                        
                                                    </ListGroup.Item>
                                )}
    
                                <ListGroup.Item>
                                    <Row>
                                        <Button 
                                        onClick={addToCartHandler}
                                        className="btn btn-block rounded" 
                                        disabled={product.countInStock === 0} 
                                        type="button">Add to cart</Button>
                                    </Row>
                                    
                                </ListGroup.Item>
                                
                            </ListGroup>
                        </Card>
    
                    </Col>
                </Row>
            }
            
            
        </div>
    )
}

export default ProductScreen
