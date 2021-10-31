import React from "react";
import { Route } from "react-router";
import Dashboard from "./dashboard";
import LoginPage from "./loginpage";
import SignUpPage from "./signuppage";
function App() {

  const [user, setUser] = React.useState({})

  const handleChangeUser = (user) => {
    setUser(user)
  }

  return (
    <div className="App" >

      <Route path="/" exact={true}>
        <LoginPage handleChangeUser={handleChangeUser} />
      </Route>

      <Route path="/signup" render={(props) => {
        return <SignUpPage handleChangeUser={handleChangeUser} />
      }} exact={true} />

      <Route path="/dashboard" render={(props) => {
        return <Dashboard {...props} handleChangeUser={handleChangeUser} user={user} />
      }} exact={true} />

    </div>
  );
}

export default App;
