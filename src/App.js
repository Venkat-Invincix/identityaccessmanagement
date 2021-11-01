import React from "react";
import { Route, Switch } from "react-router";
import Dashboard from "./dashboard";
import LoginPage from "./loginpage";
import SignUpPage from "./signuppage";

// this is a functional component
function App() {

  // state is defined using useState hooks
  const [user, setUser] = React.useState({})

  // callback used for updating state
  const handleChangeUser = (user) => {
    setUser(user)
  }

  return (
    <div className="App" >

      {/* Route  is used  for navigation between different screens according to the path. */}
      <Route path="/" exact={true}>
        <LoginPage handleChangeUser={handleChangeUser} />
      </Route>

      {/* Render is used to render(show) components according to path */}
      {/* exact is used to verify and render if the path exactly matches */}
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
