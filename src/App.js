import React from "react";

// we have to import Route from react-router so we can use Router component
import { Route } from "react-router";

// importing the components
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
    // for updating user using setUser function
  }

  return (
    <div className="App" >

      {/* Route  is used  for navigation between different screens according to the path. */}
      <Route path="/" exact={true}>
        {/* exact is used to verify and render if the path exactly matches */}
        {/* for path we mention the routes */}
        <LoginPage handleChangeUser={handleChangeUser} />
      </Route>

      {/* Render is used to render(show) components according to path */}
      {/* exact is used to verify and render if the path exactly matches */}
      <Route path="/signup" render={(props) => {
        return <SignUpPage handleChangeUser={handleChangeUser} />
      }} exact={true} />

      <Route path="/dashboard" render={(props) => {
        return <Dashboard {...props} handleChangeUser={handleChangeUser} user={user} />
        // using {..props} we can pass properties to the component.
      }} exact={true} />

    </div>
  );
}

export default App;
// we have to export the app so we can import the component in different components.