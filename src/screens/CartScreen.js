import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Image, ListGroup, Card, Form } from 'react-bootstrap';
import Message  from '../components/Message';
import { addToCart, removeItemFromCart } from '../actions/cartActions';
import { useDispatch, useSelector} from 'react-redux';


function CartScreen({match, location, history}) {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart


    const checkOutHandler = ()=>{
        history.push('/login?redirect=shipping')
    }

    const removeFromCart = (id)=>{
        dispatch(removeItemFromCart(id))
    }

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping cart</h1>
                {cartItems?.length === 0 ? (
                    <Message variant="info">
                        Your cart is empty <Link to="/">Go bact</Link>.
                    </Message>
                ): (
                    <ListGroup
                        variant="flush"
                    >
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link  to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={3}>
                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            >
                                            {[...Array(item.countInStock).keys()].map((x)=>(
                                                <option key={x+1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Button
                                        type="button"
                                        variant="light"
                                        onClick={ () => removeFromCart(item.product) }
                                        >
                                            <i className="fas fa-trash"></i>

                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}

            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce( (acc, item) => acc + item.qty, 0)})</h2>
                            ${cartItems.reduce( (acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Button
                             type="button"
                             className="btn-block"
                             disabled={cartItems?.length === 0}
                             onClick={checkOutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
