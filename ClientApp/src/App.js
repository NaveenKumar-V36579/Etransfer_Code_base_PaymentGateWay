import React from "react";
import Notifications from "react-notify-toast";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./components/LandingPage";
import ProductSelectionPage from "./components/ProductSelectionPage";
import AuthErrorPage from "./components/AuthErrorPage";
import LoggedOutPage from "./components/LoggedOut";
import BillingDetailsPage from "./components/BillingPage";
import ReviewAndSubmitPage from "./components/ReviewAndSubmitPage";
import ThankYouPage from "./components/ThankYouPage";
import NotFound from "./components/NotFound";
import ScrollToTop from "./utilities/ScrollToTop";
import "./assets/css/style.css";
import "font-awesome/css/font-awesome.min.css";
import "react-datepicker/dist/react-datepicker.css";
import MaintaincePage from "./components/MaintaincePage";
import CardSelectionPage from "./components/CardSelectionPage";
import ComingSoonPage from "./components/ComingSoon";
import Iframe from './components/IframePage';
import AddressBillingInfoPage from "./components/AddressBillingInfoPage";
import IframeACHPage from "./components/IframeACHPage";
import AddressACHBillingInfoPage from "./components/AddressACHBillingInfoPage";
import AuthenticationPage from "./components/AuthenticationPage";


export default () => (
  <Layout>
    <Notifications options={{ top: "10px" }} />
    <ScrollToTop />
    <Switch>
      {/* <Route exact path="/" component={Landing} /> */}
      {/* <Route exact path="/" component={MaintaincePage} /> */}
      <Route exact path="/ETransfer/token/:customerId" component={Landing} />
      <Route exact path="/productSelection" component={ProductSelectionPage} />
      <Route exact path="/cardSelection" component={CardSelectionPage} />
      <Route exact path="/billingDetails" component={BillingDetailsPage} />
      <Route exact path="/reviewSubmit" component={ReviewAndSubmitPage} />
      <Route exact path="/comingSoonPage" component={ComingSoonPage} /> 
      <Route exact path="/thankYou" component={ThankYouPage} />
      <Route exact path="/authError" component={AuthErrorPage} />
      <Route exact path="/loggedOut" component={LoggedOutPage} />
      <Route exact path="/Iframe" component={Iframe} />
      <Route exact path="/IframeACHPage" component={IframeACHPage}/>
      <Route exact path="/addressBillingInfo" component={AddressBillingInfoPage} />
      <Route exact path="/addressBillingInfoACH" component={AddressACHBillingInfoPage} />
      <Route exact path="/authorize" component ={AuthenticationPage} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
);

/*
The toast notification function notify.show() supports message, type and timeout attributes in the following way.

      notify.show(message, type, timeout, color)

message is the content of the toast notification.

type consists of three variants:
      success to render a success notification.
      warning to render a warning notification.
      error to render an error notification.
      custom to render user defined colors for the notification.

if type is not set, it will render a neutral notification.

timeout is the time (in milliseconds) the toast will remain on screen. if it's not set, it will display for the default 5000ms time. You can also pass -1 to cause the notification to display persistently.

color is for the background as well as the text of the notification. It accepts an object with the following properties

      let myColor = { background: '#0E1717', text: "#FFFFFF" };
      notify.show("this is sample text", "custom", 5000, myColor);
*/
