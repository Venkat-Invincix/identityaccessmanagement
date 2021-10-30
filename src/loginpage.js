import axios from 'axios'
import React from 'react'
import './login.css'
function LoginPage(props) {

    const [userId, setUserId] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [formErrors, setFormErrors] = React.useState({})
    const [message, setMessage] = React.useState('')
    const error = {}

    const handleChangeUserId = (e) => {
        const data = e.target.value;
        setUserId(data)
    }

    const handleChangePassword = (e) => {
        const data = e.target.value;
        setPassword(data)
    }

    const handleValidate = () => {
        if (userId.length === 0) {
            error.userId = 'user Id can not be empty'
        }
        if (password.length === 0) {
            error.password = 'password can not be empty'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            userId: userId,
            password: password
        }

        handleValidate()

        if (Object.keys(error).length === 0) {
            setFormErrors({})
            axios.post('https://iam-cisco.herokuapp.com/api/login', formData)
                .then((res) => {
                    const data = res.data
                    if (data) {
                        setMessage(data.message)
                        localStorage.setItem('user', JSON.stringify(data))
                        console.log(data)
                        setUserId('')
                        setPassword('')
                    }
                })
                .catch((err) => {
                    console.log(err.message)
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
                    className="login-form"
                    onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="username"
                        value={userId}
                        onChange={handleChangeUserId} />
                    {formErrors.userId && <span style={{ color: 'red' }}>{formErrors.userId}</span>}
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={handleChangePassword} />
                    {formErrors.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}
                    <button>login</button>
                    <p className="message">
                        Not registered?
                        <a href="/">Create an account</a>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default LoginPage