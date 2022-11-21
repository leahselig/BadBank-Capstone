// Function to display the create account card
function Withdraw() {
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
      console.log("Withdraw Page Current User: ");
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

  // Returning the card for creating the Withdraw page
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
                  <th>Withdraw</th>
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
          <WithdrawForm setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

// Function for the page if logged in
function WithdrawForm(props) {
  // Setting up the needed variables
  const [balance, setBalance] = React.useState(0);
  const [withdraw, setWithdraw] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);
  const currentUser = React.useContext(UserContext);

  // Getting the date functions for user activity
  Date.prototype.today = function () {
    return (
      (this.getDate() < 10 ? "0" : "") +
      this.getDate() +
      "-" +
      (this.getMonth() + 1 < 10 ? "0" : "") +
      (this.getMonth() + 1) +
      "-" +
      this.getFullYear()
    );
  };
  Date.prototype.timeNow = function () {
    return (
      (this.getHours() < 10 ? "0" : "") +
      this.getHours() +
      ":" +
      (this.getMinutes() < 10 ? "0" : "") +
      this.getMinutes() +
      ":" +
      (this.getSeconds() < 10 ? "0" : "") +
      this.getSeconds()
    );
  };
  var newDate = new Date();

  // Getting the user balance
  const url = `/account/getbalance/${currentUser.user.uid}`;
  (async () => {
    // Sending the data to server and then awaiting the response
    var res = await fetch(url);
    var userData = await res.json();
    console.log(userData[0].balance);
    setBalance(userData[0].balance);
  })();

  // Determining if withdraw button should be disabled
  if (!withdraw) {
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
      console.log(withdraw);
    } else {
      console.log(`button disabled ${disabled}`);
      console.log(withdraw);
    }
  }

  // Withdraw Money function
  function withdrawMoney() {
    // Checking the withdraw is a number greater than 0 and that the balance is available
    console.log(balance);
    console.log(withdraw);
    if (
      !isNaN(withdraw) &&
      Number(withdraw) > 0 &&
      Number(balance) >= Number(withdraw)
    ) {
      // Setting up the new balance
      let newBalance = Number(balance) - Number(withdraw);
      console.log(newBalance);
      // Setting the balance
      const url = `/account/changebalance/${currentUser.user.uid}/${newBalance}`;
      (async () => {
        // Sending the data to server and then awaiting the response
        var res = await fetch(url);
        var data = await res.json();
        console.log(data);

        // Sending the updated activity to the server
        var date = `${newDate.today()}`;
        var time = `${newDate.timeNow()}`;
        var type = "Withdraw";
        console.log(date);
        console.log(time);
        const activityUrl = `/account/changeactivity/${currentUser.user.uid}/${date}/${time}/${type}/${withdraw}/${newBalance}`;
        (async () => {
          // Sending the activity to the server
          var activityRes = await fetch(activityUrl);
          var activityData = await activityRes.json();
          console.log(activityData);
        })();

        // Setting the balance
        setBalance(newBalance);
      })();
      // Setting the status messages
      props.setStatus(
        `Successfully Withdrew: ${Number(withdraw).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}!`
      );
      setTimeout(() => props.setStatus(""), 4000);
      setWithdraw("");
    } else if (Number(withdraw) > Number(balance)) {
      props.setStatus(
        `ERROR: Withdraw amount is greater than the available balance. Please try again.`
      );
      setTimeout(() => props.setStatus(""), 4000);
      setWithdraw("");
    } else if (Number(withdraw) < 0) {
      props.setStatus(
        `ERROR: Withdraw amount is either 0 or negative. Please try again.`
      );
      setTimeout(() => props.setStatus(""), 4000);
      setWithdraw("");
    } else {
      props.setStatus(`ERROR: Withdraw amount is invalid. Please try again.`);
      setTimeout(() => props.setStatus(""), 4000);
      setWithdraw("");
    }
  }

  // Return the success screen
  return (
    <>
      <h3>
        Current Balance:{" "}
        {Number(balance).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </h3>
      <br />
      <h5>Withdraw Amount:</h5>
      <input
        type="input"
        className="form-control"
        id="withdraw"
        placeholder="Enter Amount Here"
        value={withdraw}
        onChange={(e) => setWithdraw(e.currentTarget.value)}
      />
      <br />
      {disabled ? (
        <>
          <button
            type="submit"
            className="btn btn-dark"
            disabled="disabled"
            onClick={withdrawMoney}
          >
            Withdraw
          </button>
        </>
      ) : (
        <>
          <button
            type="submit"
            className="btn btn-dark"
            onClick={withdrawMoney}
          >
            Withdraw
          </button>
        </>
      )}
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
