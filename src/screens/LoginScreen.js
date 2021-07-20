import React, {useEffect, useState} from 'react'
import { Row, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

function LoginScreen({location, history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);

    const { error, loading, userInfo } = userLogin;

    const redirect = location.search ? location.search.split("=")[1] : '/'

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault();

        dispatch (login(email, password));
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>

            {loading ? <Loader /> 
            : error ? <Message variant={'danger'}>{error}</Message>
                : "" }
    <Form onSubmit={submitHandler}>
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
    <Button type="submit" variant="primary">Sign In</Button>

    <Row className="py-3">
        No account? <Link to={ redirect? `/register?>redirect=${redirect}`: '/register'}>Sign Up</Link>
    </Row>
</Form>
        </FormContainer>
    )
}

export default LoginScreen
