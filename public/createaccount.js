// Function to display the create account card
function CreateAccount() {
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
      console.log("Create Account Page Current User: ");
      console.log(userCredential);
      currentUser.user = userCredential;
      console.log(`Current Email: ${currentUser.user.email}`);
      console.log(`Current UID: ${currentUser.user.uid}`);
      setEmail(currentUser.user.email);
    } else {
      setShow(true);
      // If the user is logged out...
      console.log("No User Logged In");
      currentUser.user = {};
    }
  });

  // Returning the card for creating the account
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
                  <th>Create Account</th>
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
          <CreateForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <CreateMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

// Function for the status message once the account is created
function CreateMsg(props) {
  // Current User Context
  const currentUser = React.useContext(UserContext);

  // Logout Function
  function logout() {
    // Logout from Firebase
    firebase
      .auth()
      .signOut()
      .then(() => {
        var signoutMessage = "Sign out successful!";
        console.log(signoutMessage);
        props.setStatus(signoutMessage);
        setTimeout(() => props.setStatus(""), 4000);
        props.setShow(true);
      })
      .catch((error) => {
        props.setStatus("Unsuccessful Signout: Likely server error");
        setTimeout(() => props.setStatus(""), 4000);
      });
  }

  // Return the success screen
  return (
    <>
      <h5>You are currently logged in as {currentUser.user.email}!</h5>
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

// Function for the create account form (Now with the database)
function CreateForm(props) {
  // Setting up the state for the form
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);
  const currentUser = React.useContext(UserContext);

  // Determine if to set the button disabled or not
  if (!name || !password || !email) {
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

  // New database function for creating the account
  function handle() {
    // Creating the new user
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Function if correctly signed in
        var createAccountMessage = `Success! Account successfully created for: ${email}`;
        console.log(createAccountMessage);
        // Setting the account up in the database
        const url = `/account/create/${name}/${email}/${password}/${userCredential.user.uid}`;
        (async () => {
          // Sending the data to server and then awaiting the response
          var res = await fetch(url);
          var data = await res.json();
          console.log(data);
        })();
        // Setting the status messages
        props.setStatus(createAccountMessage);
        //setTimeout(() => props.setStatus(""), 4000);
        // ADD THIS BACK IN IF THE STATUS MESSAGE DOESNT REFRESH
        //props.setShow(false);
      })
      .catch((error) => {
        // Function if incorrectly signed in
        var errorMessage = `Error Message: ${error.message}`;
        console.log(errorMessage);
        props.setStatus(errorMessage);
        setTimeout(() => props.setStatus(""), 4000);
        // Clear the user inputs
        setEmail("");
        setPassword("");
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
        setTimeout(() => props.setStatus(""), 4000);
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

  // Returning the create account form
  return (
    <>
      <h4>Create an account below with the following information:</h4>
      <br />
      Name
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
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
        <button
          type="submit"
          disabled="disabled"
          className="btn btn-dark"
          onClick={handle}
        >
          Create Account
        </button>
      ) : (
        <button type="submit" className="btn btn-dark" onClick={handle}>
          Create Account
        </button>
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
    </>
  );
}
