// Login page
function Login(props) {
  // Setting up some state and context variables
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const currentUser = React.useContext(UserContext);

  // Get Current Authentication Status
  auth.onAuthStateChanged((userCredential) => {
    if (userCredential) {
      setShow(false);
      // If the user is logged in...
      console.log("Login Page Current User: ");
      console.log(userCredential);
      currentUser.user = userCredential;
      console.log(`Current Email: ${currentUser.user.email}`);
      console.log(`Current UID: ${currentUser.user.uid}`);
      setEmail(currentUser.user.email);
      props.setUser(currentUser.user.email);
    } else {
      // If the user is logged out...
      setShow(true);
      console.log("No User Logged In");
      currentUser.user = {};
    }
  });

  // Returning the card for creating the login page
  return (
    <Card
      bgcolor="light"
      txtcolor="dark"
      header={
        <>
          <h3>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Login</th>
                  <th className="text-right">
                    <div className="badge bg-light text-dark">
                      {" "}
                      {show ? <>No Active User</> : <>{email}</>}
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          </h3>
        </>
      }
      status={status}
      body={
        show ? (
          <LogInMsg setShow={setShow} setStatus={setStatus} />
        ) : (
          <LoggedInMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function LoggedInMsg(props) {
  // Current User Context
  const currentUser = React.useContext(UserContext);

  // Logout Function
  function logout() {
    // Logout from Firebase
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Sign out successful");
        props.setShow(true);
        props.setStatus("Signed out successfully!");
        //setTimeout(() => props.setStatus(""), 4000);
      })
      .catch((error) => {
        props.setStatus("Unsuccessful Signout: Likely server error");
        setTimeout(() => props.setStatus(""), 4000);
      });
  }

  return (
    <>
      <h5>You are currently logged in!</h5>
      <a
        href="#/activity/"
        className="account-link"
        data-toggle="tooltip"
        title="Check Balance and Activity"
      >
        Check Balance and Activity
      </a>
      <br />
      <a
        href="#/deposit/"
        className="account-link"
        data-toggle="tooltip"
        title="Make a Deposit"
      >
        Make a Deposit
      </a>
      <br />
      <a
        href="#/withdraw/"
        className="account-link"
        data-toggle="tooltip"
        title="Make a Withdrawal"
      >
        Make a Withdrawal
      </a>
      <br />
      <br />
      <button type="submit" className="btn btn-dark" onClick={logout}>
        Log Out
      </button>
    </>
  );
}

// Function for the status message once the account is created
function LogInMsg(props) {
  // Getting state for the user inputs
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);
  const currentUser = React.useContext(UserContext);

  // Determine if to set the button disabled or not
  if (!password || !email) {
    //Check if button should be enabled
    if (disabled) {
      console.log(disabled);
      console.log(`button disabled ${disabled}`);
    } else {
      setDisabled(true);
      console.log(`button disabled ${disabled}`);
    }
  } else {
    if (disabled) {
      setDisabled(false);
      console.log(`button disabled ${disabled}`);
    } else {
      console.log(`button disabled ${disabled}`);
    }
  }
  // Standard login function
  function login() {
    // Login with firebase
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Function if correctly signed in
        console.log("Sign in successful");
        console.log("User Credentials: " + JSON.stringify(userCredential));
        currentUser.user = userCredential;
        //Setting the status message
        //props.setShow(false);
        props.setStatus("Signed in successfully!");
        //setTimeout(() => props.setStatus(""), 4000);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        // Function if incorrectly signed in
        console.log("Sign in NOT successful");
        // Clear the user inputs
        setEmail("");
        setPassword("");
        // Setting the status message
        props.setStatus(`Error Message: ${error.message}`);
        setTimeout(() => props.setStatus(""), 4000);
      });
  }

  // Google login function
  function loginGoogle() {
    // Login to firebase with the email and password
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((userCredential) => {
        // Check if the user already has an account in the database by checking balance
        const url = `/account/getbalance/${userCredential.user.uid}`;
        (async () => {
          // Sending the data to server and then awaiting the response
          var res = await fetch(url);
          var userData = await res.json();
          var responseString = JSON.stringify(userData);
          console.log(`Database Response String: ${responseString}`);
          console.log(`Database Response: ${userData}`);
          if (responseString == "[]") {
            // Case if user does not exist
            console.log(`User does not exist, creating account`);
            var createAccountMessage = `Account successfully created for: ${userCredential.user.email}`;
            // Setting the account up in the database
            const url = `/account/create/${userCredential.user.email}/${userCredential.user.email}/GoogleAuth/${userCredential.user.uid}`;
            (async () => {
              // Sending the data to server and then awaiting the response
              var res = await fetch(url);
              var data = await res.json();
              console.log(data);
            })();
            // Setting the status messages
            props.setStatus(createAccountMessage);
            setTimeout(() => props.setStatus(""), 4000);
          } else {
            // Case if user does exist
            // Just print success message if user exists
            console.log(`User does exist`);
            console.log(`Database Response: ${responseString}`);
          }
        })();
        // Function if correctly signed in
        console.log("Sign in successful");
        console.log("User Credentials: " + JSON.stringify(userCredential));
        currentUser.user = userCredential;
        //Setting the status message
        props.setStatus("Signed in successfully!");
        //setTimeout(() => props.setStatus(""), 4000);
        setEmail("");
        setPassword("");
      })
      .catch(function (error) {
        // Function if incorrectly signed in
        console.log("Sign in NOT successful");
        // Clear the user inputs
        setEmail("");
        setPassword("");
        // Setting the status message
        props.setStatus(`Error Message: ${error.message}`);
        setTimeout(() => props.setStatus(""), 4000);
      });
  }

  return (
    <>
      <h4>Login with your information below:</h4>
      <br />
      Email Address
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      {disabled ? (
        <>
          <button
            type="submit"
            disabled="disabled"
            className="btn btn-dark"
            onClick={login}
          >
            Login
          </button>
        </>
      ) : (
        <>
          <button type="submit" className="btn btn-dark" onClick={login}>
            Login
          </button>
        </>
      )}
      &nbsp; or &nbsp;
      <button type="submit" className="btn btn-dark" onClick={loginGoogle}>
        <img
          src="googlelogo.png"
          alt="Responsive image"
          height="15em"
          width="15em"
        ></img>
        &nbsp; Sign in with Google
      </button>
      <br />
      <br /> &#9432; Don't have an account?&nbsp;
      <a
        href="#/CreateAccount/"
        data-toggle="tooltip"
        title="Create an Account"
      >
        Create Account
      </a>
    </>
  );
}
