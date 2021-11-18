import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router'
// useHistory is a component of react-router
import './signup.css'

function SignUpPage() {

    // useState is used for manage state in react
    // [stateName, updaterFunction] = React.useState()
    const [userName, setUserName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [userId, setUserId] = React.useState('')
    const [isAdmin, setIsAdmin] = React.useState(false)

    const [message, setMessage] = React.useState('')
    const [formErrors, setFormErrors] = React.useState({})

    // error object is used for holding field error
    const error = {}

    // onChange of username input handleChangeUserName() function get called
    const handleChangeUserName = (e) => {
        const data = e.target.value;
        setUserName(data)
    }

    // onChange of password input handleChangePassword() function get called
    const handleChangePassword = (e) => {
        const data = e.target.value;
        setPassword(data)
    }

    // onChange of userId input handleChangeUserId() function get called
    const handleChangeUserId = (e) => {
        const data = e.target.value;
        setUserId(data)
    }

    // onChange of admin input handleChangeIsAdmin() function get called
    const handleChangeIsAdmin = (e) => {
        const data = e.target.checked;
        setIsAdmin(data)
    }

    // this function will called after submit button
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

    // form submit function call after clicking the submit button
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            userName: userName,
            password: password,
            userId: userId,
            isAdmin: isAdmin
        }

        // it is called for validating form
        handleValidate()

        // if form has no error then it will be doing an axios call to sign up
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
                        // after successful data insert it will redirect to login page 
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
                {/* if message is present then it will shows the message  */}
                <p style={{ color: "green" }}>{message ? message : ""}</p>
                <form
                    className="signup-form"
                    onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="username"
                        value={userName}
                        onChange={handleChangeUserName} />
                    {/* if the form holds error it will render . && is used for conditional rendering*/}
                    {/* if formErrors of userName is there then userName form error shows*/}
                    {formErrors.userName && <span style={{ color: 'red' }}>{formErrors.userName}</span>}
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={handleChangePassword} />
                    {/* if formErrors of password is there then password form error shows*/}
                    {formErrors.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}
                    <input
                        type="text"
                        placeholder="user id"
                        value={userId}
                        onChange={handleChangeUserId} />
                    {/* if formErrors of userId is there then password form error shows*/}
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