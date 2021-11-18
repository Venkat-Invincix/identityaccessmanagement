import axios from 'axios'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import './login.css'

function LoginPage(props) {
    // we can access the  handleChangeUser using object destructuring
    const { handleChangeUser } = props
    // useState is used for mannage state in react
    const [userId, setUserId] = React.useState('Paresh123')
    const [password, setPassword] = React.useState('12121212')
    const [formErrors, setFormErrors] = React.useState({})
    const [message, setMessage] = React.useState('')

    // error object to holds form error
    const error = {}

    const handleChangeUserId = (e) => {
        const data = e.target.value;
        // we can get the data from event object 
        setUserId(data)
        // set the id using setUserId function
    }

    const handleChangePassword = (e) => {
        const data = e.target.value;
        setPassword(data)
    }

    // this function is used to validate the form
    const handleValidate = () => {
        if (userId.length === 0) {
            error.userId = 'user Id can not be empty'
        }
        if (password.length === 0) {
            error.password = 'password can not be empty'
        }
    }
    // The useHistory hook gives you access to the history instance that you may use to navigate.
    const history = useHistory()

    // when submit button click handleSubmit function gets called
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            userId: userId,
            password: password
        }

        // it is called to validate the form data
        handleValidate()
        // if error is there do the axios call otherwise 
        if (Object.keys(error).length === 0) {
            setFormErrors({})
            // post() is an http method used for upload the data to the server
            axios.post('https://iam-cisco.herokuapp.com/api/login', formData)
                .then((res) => {
                    const data = res.data
                    // from response we can get the data
                    if (data) {
                        // if data is there then pass the data to the callback
                        handleChangeUser(data)
                        history.push('/dashboard')
                        // after pass the data set user and password value to empty string
                        setUserId('')
                        setPassword('')
                    }
                })
                .catch((err) => {
                    // if error is there then set the error message
                    if (err) {
                        setMessage('user id & password can not match.')
                    }
                })
        } else {
            setFormErrors(error)
        }
    }
    return (
        <div className="login-page">
            <div className="form">
                <div className="login">
                    <div className="login-header">
                        <h3>LOGIN</h3>
                    </div>
                </div>
                <p style={{ color: "green" }}>{message ? message : ""}</p>
                <form
                    className="login-form">
                    {/* in value we are using state value.
                    onchange of event handleChangeUserId() function gets called
                     */}

                    <input
                        type="text"
                        placeholder="username"
                        // userId is a state varibale to store the state data
                        value={userId}
                        // onChange of value handleChangeUserId() function get call
                        onChange={handleChangeUserId} />
                    {/* if we have a form error then it will show */}
                    {formErrors.userId && <span style={{ color: 'red' }}>{formErrors.userId}</span>}
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={handleChangePassword} />
                    {formErrors.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}
                    <button onClick={handleSubmit}>
                        login
                    </button>
                    <p className="message">
                        Not registered?
                        <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default LoginPage