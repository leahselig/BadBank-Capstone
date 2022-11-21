// Adding the react components for routing
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);

// Making a universal card that can be referenced by all pages
function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.textcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }

  return (
    <div className="container" style={{ padding: "20px", paddingTop: "100px" }}>
      <div className={classes()}>
        <div className="card-header">{props.header}</div>
        <div className="card-body">
          {props.title && <h5 className="card-title">{props.title}</h5>}
          {props.text && <p className="card-text">{props.text}</p>}
          {props.body}
          <br />
          <br />
          {props.status && <div id="createStatus">{props.status}</div>}
        </div>
      </div>
    </div>
  );
}
