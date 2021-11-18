import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// link is used as an <a> tag in html 
import './dashboard.css'

const Dashboard = (props) => {
    // from props we can easily get the passing data in the form of properties
    const { handleChangeUser, user } = props

    // creating state using useState hooks
    const [acc1, setAcc1] = React.useState(false)
    const [acc2, setAcc2] = React.useState(false)
    const [acc3, setAcc3] = React.useState(false)

    const [mainGateData, setMainGateData] = React.useState({})
    const [routerData, setRouterData] = React.useState({})
    const [cameraData, setCameraData] = React.useState({})

    const [message, setMessage] = React.useState('')

    // props.history.push() is used for redirect to another url - (if user is not there then redirect to login screen)
    React.useEffect(() => {
        if (Object.keys(user).length === 0) {
            props.history.push('/')
        }
    }, [user, props.history]);

    // call back for front gate accordion 
    // for fetching data we are using axios
    // if status is 200 then we can open the accosrion
    const handleChangeFrontgate = () => {
        // if the mainGateData object is empty then we are doing 
        // axios call to get the data and after call we can set the data to the mainGate object
        if (Object.keys(mainGateData).length === 0) {
            // get() is method to get the data from server
            axios.get('https://iam-cisco.herokuapp.com/api/acessMainGate',
                {
                    headers: {
                        "Authorization": `Bearer ${user.acessToken}`
                    }
                })
                // Bearer token is used for verifying the perticular user
                // we have to set the header for authorization
                .then((res) => {
                    if (res.status === 200) {
                        setAcc1(!acc1)
                        setMessage('')
                        setMainGateData(res.data)
                    }
                })
                .catch((err) => {
                    // if error is there we can set the error message
                    setMessage(`you can not acess`)
                })
        }
        // if data is already there then set the empty message to the state
        else {
            setAcc1(!acc1)
            setMessage('')
        }
    }

    // call back for router accordion 
    const handleChangeRouter = () => {
        if (Object.keys(routerData).length === 0) {
            axios.get('https://iam-cisco.herokuapp.com/api/accessRouter', {
                headers: {
                    "Authorization": `Bearer ${user.acessToken}`
                }
            })
                .then((res) => {
                    // if response status code is 200 then we can set empty message 
                    // and we can acesss the accordian
                    if (res.status === 200) {
                        setAcc2(!acc2)
                        setMessage('')
                        setRouterData(res.data)
                    }
                })
                .catch((err) => {
                    if (err) {
                        // if error is there then set the error message to the state
                        setMessage(`you can not acess`)
                    }
                })
        } else {
            setAcc2(!acc2)
            setMessage('')
        }
    }

    // call back for camera accordion 
    const handleChangeCamera = () => {
        if (Object.keys(cameraData).length === 0) {
            axios.get('https://iam-cisco.herokuapp.com/api/accessCamera', {
                headers: {
                    "Authorization": `Bearer ${user.acessToken}`
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        setMessage('')
                        setAcc3(!acc3)
                        setCameraData(res.data)
                    }
                })
                .catch((err) => {
                    if (err) {
                        setMessage(`you can not acess`)
                    }
                })
        } else {
            setAcc3(!acc3)
            setMessage('')
        }
    }

    const handleLogout = (e) => {
        // preventDefault() is used for prevent reloading
        e.preventDefault()
        handleChangeUser({})
        props.history.push('/')
        // this is used to redirect to home page
    }

    // conditional styling when state update
    const acc1ClassName = acc1 ? "panelopen" : "panel"
    const acc1Active = acc1 ? "active" : ""

    const acc2ClassName = acc2 ? "panelopen" : "panel"
    const acc2Active = acc2 ? "active" : ""

    const acc3ClassName = acc3 ? "panelopen" : "panel"
    const acc3Active = acc3 ? "active" : ""

    return (
        <div>
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                    {/* link is like anchor tag , used for redirect to another url */}
                </li>
                <li style={{ float: 'right' }}>
                    <a
                        href="/"
                        onClick={handleLogout}
                    // onClick is an event happening in the element
                    >
                        Logout
                    </a>
                </li>
            </ul>


            <h2 style={{ color: 'indigo', float: 'left', margin: '20px' }}>
                Hello , Welcome
            </h2>
            {/* && is used for conditon check and if that is true then shows that message */}
            <p style={{ color: 'red', marginTop: 25 }}>{message && message}</p>

            <div className="content">
                {/* `` is string literals in javascript. so we can use variable inside screen  */}
                <button
                    className={`accordion ${acc1Active}`}
                    onClick={handleChangeFrontgate}>Main gate</button>

                <div className={acc1ClassName}>
                    {/* {} is used for accessing  variable inside html*/}
                    {/* mainGateData is an object & status is a property of mainGateData */}
                    <p>Status - {mainGateData.status}</p>
                    <p>Main Gate Status - {mainGateData.mainGateStatus}</p>
                    <p>Visitor Count - {mainGateData.visitorCount}</p>

                </div>

                <button
                    className={`accordion ${acc2Active}`}
                    onClick={handleChangeRouter}>
                    Router
                </button>

                <div className={acc2ClassName}>
                    <p>Status - {routerData.status}</p>
                    <p>Last Reboot - {routerData.lastReboot}</p>
                    <p>Connected Ips</p>
                    <ul className="connected__ip">
                        {/* if  routerData.cnnectedIps  data is present then it will map the data*/}
                        {/* A “key” is a special string attribute 
                        you need to include when creating lists of elements in React */}
                        {
                            routerData.cnnectedIps &&
                            routerData.cnnectedIps.map((ip, index) => {
                                return <li
                                    key={index}
                                    className="connected__ip__li"
                                >
                                    {ip}
                                </li>
                            })
                        }
                    </ul>
                </div>

                <button
                    className={`accordion ${acc3Active}`}
                    onClick={handleChangeCamera}>Camera</button>

                <div className={acc3ClassName}>
                    <p>Active Count - {cameraData.activeCount} </p>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Camera Id</th>
                                <th>Moment detected</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cameraData.data && cameraData.data.map((cd, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{cd.camId}</td>
                                            <td>{cd.momentDeteted}</td>
                                            <td>{cd.status}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
