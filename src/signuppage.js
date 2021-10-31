// import axios from 'axios'
import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router'
import './signup.css'
function SignUpPage() {

    const [userName, setUserName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [userId, setUserId] = React.useState('')
    const [isAdmin, setIsAdmin] = React.useState(false)

    const [message, setMessage] = React.useState('')
    const [formErrors, setFormErrors] = React.useState({})

    const error = {}

    const handleChangeUserName = (e) => {
        const data = e.target.value;
        setUserName(data)
    }

    const handleChangePassword = (e) => {
        const data = e.target.value;
        setPassword(data)
    }

    const handleChangeUserId = (e) => {
        const data = e.target.value;
        setUserId(data)
    }

    const handleChangeIsAdmin = (e) => {
        const data = e.target.checked;
        setIsAdmin(data)
    }

    const handleValidate = () => {
        if (userName.length === 0) {
            error.userName = 'user name can not be empty'
        }
        if (password.length === 0) {
            error.password = 'password can not be empty'
        }
        if (userId.length === 0) {
            error.userId = 'user Id can not be empty'
        }
    }

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            userName: userName,
            password: password,
            userId: userId,
            isAdmin: isAdmin
        }
        handleValidate()
        // fetch('https://iam-cisco.herokuapp.com/api/register', {
        //     method: 'POST',
        //     body: JSON.stringify(formData),
        //     headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         "Content-Type": "application/json"
        //     },
        // })
        //     .then((res) => {
        //         const resMessage = res.message
        //         if (resMessage) {
        //             setMessage(resMessage)
        //         } else {
        //             setMessage('')
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err.message)
        //     })
        if (Object.keys(error).length === 0) {
            setFormErrors({})
            axios.post('https://iam-cisco.herokuapp.com/api/register', formData)
                .then((res) => {
                    const data = res.data
                    if (data) {
                        setMessage(data.message)
                        setUserId('')
                        setUserName('')
                        setPassword('')
                        history.push('/')
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
        <div className="signup-page">
            <div className="form">
                <div className="signup">
                    <div className="signup-header">
                        <h3>SIGNUP</h3>
                    </div>
                </div>
                <p style={{ color: "green" }}>{message ? message : ""}</p>
                <form
                    className="signup-form"
                    onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="username"
                        value={userName}
                        onChange={handleChangeUserName} />
                    {formErrors.userName && <span style={{ color: 'red' }}>{formErrors.userName}</span>}
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={handleChangePassword} />
                    {formErrors.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}
                    <input
                        type="text"
                        placeholder="user id"
                        value={userId}
                        onChange={handleChangeUserId} />
                    {formErrors.userId && <span style={{ color: 'red' }}>{formErrors.userId}</span>}
                    <div className="signup__checkbox">
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={handleChangeIsAdmin} />
                        <label>Admin</label>
                    </div>
                    <button>signup</button>
                </form>
            </div>
        </div>
    )
}
export default SignUpPage