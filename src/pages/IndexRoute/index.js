import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom'
import AboutUsComponent from 'pages/AboutUs';
import HomePageComponent from 'pages/HomePage';
import ReserveComponent from 'pages/Reserve';
import ReservationComponent from 'pages/ReservationSuccess';
import ProfileInfoComponent from 'pages/Profileinfo';
import ViewOrderComponent from 'pages/ViewOrder';
import ContactComponent from 'pages/Contact';
import Signup2 from 'pages/signup2';
import Signin from 'pages/signin';
import RoomsComponent from 'pages/RoomOptions';
import Navbar from 'components/navbar/navbar';
import Footer from 'components/footer';

const IndexRoute = () => {
  const match = useRouteMatch();
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path={match.path} component={HomePageComponent} />
        <Route path={match.path + "about"} component={AboutUsComponent} />
        <Route path={match.path + "rooms"} component={RoomsComponent}/>
        <Route path={match.path + "register"} component={Signup2} />
        <Route path={match.path + "login"} component={Signin} />
        <Route path={match.path + "reserve"} component={ ReserveComponent } />
        <Route path={match.path + "contact"} component={ContactComponent} />
        <Route path={match.path + "reservesuccess" } component={ReservationComponent}/>
        <Route path={match.path + "profile"} component={ProfileInfoComponent}/>
        <Route path={match.path + "viewinfo/:ref"} component={ViewOrderComponent} />
      </Switch>
      <Footer />
    </>
  )
}

export default IndexRoute;
