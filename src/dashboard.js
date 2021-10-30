import React from 'react'
import './dashboard.css'

const Dashboard = (props) => {

    const { user } = props

    console.log(user)

    const [acc1, setAcc1] = React.useState(false)
    const [acc2, setAcc2] = React.useState(false)
    const [acc3, setAcc3] = React.useState(false)

    const handleChangeFrontgate = () => {
        setAcc1(!acc1)
    }

    const handleChangeRouter = () => {
        setAcc2(!acc2)
    }

    const handleChangeCamera = () => {
        setAcc3(!acc3)
    }

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('user')
    }

    const acc1ClassName = acc1 ? "panelopen" : "panel"
    const acc1Active = acc1 ? "active" : ""

    const acc2ClassName = acc2 ? "panelopen" : "panel"
    const acc2Active = acc2 ? "active" : ""

    const acc3ClassName = acc3 ? "panelopen" : "panel"
    const acc3Active = acc3 ? "active" : ""

    return (
        <div>
            <ul>
                <li><a href="/">Dashboard</a></li>
                <li style={{ float: 'right' }}>
                    <a href="/" onClick={handleLogout} >Logout</a>
                </li>
            </ul>
            <h2 style={
                {
                    color: 'indigo',
                    float: 'left',
                    margin: '20px'
                }
            }>Hello , {user.user}</h2>
            <div className="content">
                <button className={`accordion ${acc1Active}`}
                    onClick={handleChangeFrontgate}>Front gate</button>
                <div className={acc1ClassName}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <button className={`accordion ${acc2Active}`}
                    onClick={handleChangeRouter}>Router</button>
                <div className={acc2ClassName}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <button className={`accordion ${acc3Active}`}
                    onClick={handleChangeCamera}>Camera</button>
                <div className={acc3ClassName}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
