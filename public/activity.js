// Function to display the create account card
function Activity() {
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
      console.log("Balance Page Current User: ");
      console.log(userCredential);
      currentUser.user = userCredential;
      console.log(`Current Email: ${currentUser.user.email}`);
      console.log(`Current UID: ${currentUser.user.uid}`);
      setEmail(currentUser.user.email);
    } else {
      // If the user is logged out...
      setShow(true);
      console.log("No User Logged In");
      currentUser.user = {};
    }
  });

  // Returning the card for showing the balance
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
                  <th>User Activity</th>
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
          <LoginMsg setShow={setShow} setStatus={setStatus} />
        ) : (
          <BalanceDisplay setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

// Function for the status message once the account is created
function BalanceDisplay(props) {
  // Setting up the needed variables
  const [balance, setBalance] = React.useState(0);
  const [name, setName] = React.useState();
  const [time, setTime] = React.useState();
  const [tablehtml, setTablehtml] = React.useState();
  const [activity, setActivity] = React.useState(0);
  const currentUser = React.useContext(UserContext);

  // Getting the user balance and making the activity table if not already made
  if (!tablehtml) {
    const url = `/account/getbalance/${currentUser.user.uid}`;
    (async () => {
      // Making the variable for the table elements
      var tableElements = [];

      // Sending the data to server and then awaiting the response
      var res = await fetch(url);
      var userData = await res.json();
      console.log(userData[0].balance);
      setBalance(userData[0].balance);
      setName(userData[0].name);

      // Making the activity html
      for (const { date, time, type, amount, balance } of userData[0]
        .activity) {
        tableElements.unshift(
          <tr>
            <td className="text-justify">{date}</td>
            <td className="text-justify">{time}</td>
            <td className="text-justify">{type}</td>
            <td className="text-right">
              {Number(amount).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </td>
            <td className="text-right">
              {Number(balance).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </td>
          </tr>
        );
      }

      // Getting the account creation time
      setTime(currentUser.user.metadata.creationTime);

      // Setting the table html
      setTablehtml(tableElements);
      // Printing the results
      console.log(tableElements);
      // Printing the results
      console.log(testArray);
    })();
  }

  // Return the success screen
  return (
    <>
      <h3>User Info:</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Current Balance</th>
            <th scope="col">Member Since</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{name}</td>
            <td>{currentUser.user.email}</td>
            <td>
              {Number(balance).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </td>
            <td>{time}</td>
          </tr>
        </tbody>
      </table>
      <h3>User Activity:</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="text-justify">
              Date
            </th>
            <th scope="col" className="text-justify">
              Time
            </th>
            <th scope="col" className="text-justify">
              Type
            </th>
            <th scope="col" className="text-right">
              Amount
            </th>
            <th scope="col" className="text-right">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>{tablehtml}</tbody>
      </table>
    </>
  );
}

// Function for the status message once the account is created
function LoginMsg(props) {
  // Return the success screen
  return (
    <>
      There is currently no user logged in. Please log in and return to this
      page.
      <br />
      <br />
      <a
        href="#/login/"
        className="btn btn-dark"
        data-toggle="tooltip"
        title="Login with your existing account credentials"
      >
        Login
      </a>
      &nbsp; or &nbsp;
      <a
        href="#/createaccount/"
        className="btn btn-dark"
        data-toggle="tooltip"
        title="Create a new account to start using this banking site"
      >
        Create Account
      </a>
    </>
  );
}
