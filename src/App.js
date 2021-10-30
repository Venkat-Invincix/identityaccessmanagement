import React from "react";
import Dashboard from "./dashboard";
import LoginPage from "./loginpage";
// import SignUpPage from "./signuppage";
function App() {

  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : {})

  // const handle
  return (
    <div className="App" >
      {user.acessToken ? <Dashboard user={user} /> : <LoginPage />}

      {/* <SignUpPage /> */}
      {/*  */}
    </div>
  );
}

export default App;
