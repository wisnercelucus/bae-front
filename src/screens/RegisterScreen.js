import React, {useEffect, useState} from 'react'
import { Row, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

function RegisterScreen({location, history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);

    const { error, loading, userInfo } = userRegister;

    const redirect = location.search ? location.search.split("=")[1] : '/'

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch (register(name, email, password));
        }
        
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>

            {message &&  <Message variant={'danger'}>{message}</Message>}

            {loading ? <Loader /> 
            : error ? <Message variant={'danger'}>{error}</Message>
                : "" }
    <Form onSubmit={submitHandler}>
    <Form.Group controlId="name">
        <Form.Label>
            Full name
        </Form.Label>
        <Form.Control
        required
        type="text"
        placeholder="Enter your fullname..."
        value={name}
        onChange={(e)=>setName(e.target.value)}
        >
        </Form.Control>
    </Form.Group>

    <Form.Group controlId="email">
        <Form.Label>
            Email
        </Form.Label>
        <Form.Control
        required
        type="email"
        placeholder="Enter email..."
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        >
        </Form.Control>
    </Form.Group>

    <Form.Group controlId="password">
        <Form.Label>
            Password
        </Form.Label>
        <Form.Control
        required
        type="password"
        placeholder="Enter password..."
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        >
        </Form.Control>
    </Form.Group>


    <Form.Group controlId="confirmPassword">
        <Form.Label>
         Confirm Password
        </Form.Label>
        <Form.Control
        required
        type="password"
        placeholder="Confirm password..."
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        >
        </Form.Control>
    </Form.Group>

    <Button type="submit" variant="primary">Register</Button>

    <Row className="py-3">
        Have an account? <Link to={ redirect? `/login?>redirect=${redirect}`: '/login'}>Login</Link>
    </Row>
</Form>
        </FormContainer>
    )
}
export default RegisterScreen
