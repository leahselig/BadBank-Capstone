function Home() {
  // Setting up some state and context variables
  const [show, setShow] = React.useState(true);
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
    } else {
      // If the user is logged out...
      setShow(true);
      console.log("No User Logged In");
      currentUser.user = {};
    }
  });

  return (
    <>
      <Card
        bgcolor="light"
        txtcolor="dark"
        header={
          <>
            <h3>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>Welcome to Cat Bank of America</th>
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
        title={
          <>
            <div className="text-center">
              "The Purrsonal Choice of All Felines"
            </div>
          </>
        }
        body={
          <>
            <div className="text-center">
              <img
                src="money-cat.jpg"
                className="img-fluid center"
                alt="Responsive image"
                width="40%"
              />
            </div>
          </>
        }
      />
    </>
  );
}
