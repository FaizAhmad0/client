
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Managertab from "./pages/Managertab";
import Usertab from "./pages/Usertab";
import Userdashboard from "./pages/Userdashboard";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Support from "./pages/Support";
import Learnings from "./pages/Learnings";
import Ordawlt from "./pages/Ordawlt";
import Contact from "./pages/Contact";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/managertab" component={Managertab} />
          <Route exact path="/usertab" component={Usertab} />
          <Route exact path="/userdashboard" component={Userdashboard} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/support" component={Support} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/learnings" component={Learnings} />
          <Route exact path="/ordawlt" component={Ordawlt} />
          <Route exact path="/contact" component={Contact} />



          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
