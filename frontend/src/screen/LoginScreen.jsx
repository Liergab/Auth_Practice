import { useState } from "react"
import {Link,useNavigate} from 'react-router-dom'
import {Form, Button, Col, Row} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import { useLoginMutation } from "../slices/userApiSlice"
import { setCredentials } from "../slices/authSlice"

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login,{isLoading}] = useLoginMutation()

    const {user}

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submit')
    }
  return (
   <FormContainer>
    <h1>Sign In</h1>

    <Form onSubmit={submitHandler}>
      <Form.Group className="my-2" controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
        type='email'
        placeholder="Enter Email ..."
        value={email}
        onChange={(e) => setEmail(e.target.value) }
        ></Form.Control>
      </Form.Group>
      <Form.Group className="my-2" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
        type='text'
        placeholder="Enter Password ..."
        value={password}
        onChange={(e) => setPassword(e.target.value) }
        ></Form.Control>

        <Button type="submit" variant="primary" className="mt-3">
            Sign In
        </Button>

        <Row className="py-3">
            <Col>
                New Customers? <Link to='/register'>register</Link>
            </Col>
        </Row>
      </Form.Group>

    </Form>
   </FormContainer>
  )
}

export default LoginScreen
