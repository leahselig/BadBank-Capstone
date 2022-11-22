function NavBar(props) {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        &#128062;Cat Bank
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              href="#/createaccount/"
              data-toggle="tooltip"
              title="Create a new account to start using this banking site"
            >
              Create Account
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#/login/"
              data-toggle="tooltip"
              title="Login with your existing account credentials"
            >
              Login
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#/deposit/"
              data-toggle="tooltip"
              title="See balance and deposit money into your account"
            >
              Deposit
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#/withdraw/"
              data-toggle="tooltip"
              title="See balance and withdraw money from your account"
            >
              Withdraw
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#/activity/"
              data-toggle="tooltip"
              title="See account information and recent activity"
            >
              Activity
            </a>
          </li>
        </ul>
        <div className="user-email">{props.user}</div>
      </div>
    </nav>
  );
}
