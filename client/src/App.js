import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Auth from './container/Auth/Auth';
import Navigation from './Components/Navigation/Navigation';
import Information from './container/DashBoard/Information';
import Users from './container/Users/Users';
import Students from './container/Student/Students';
import Courses from './container/Course/Courses';

const App=(props)=> {
  let routes = (
    <Switch>
      <Route exact path={'/'} component={Auth}/>
      <Route exact path={'/signup'} />
      <Redirect to={'/'}/>
    </Switch>
  )

  if(props.isAuthenticated){
    routes = (
      <Switch>
        <Route exact path={'/'} component={Information}/>
        <Route exact path={'/users'} component={Users}/>
        <Route exact path={'/students'} component={Students}/>
        <Route exact path={'/courses'} component={Courses}/>
        <Route exact path={'/students/update/:id'}/>
        <Route exact path={'/courses/update/:id'}/>
        <Redirect to={'/'}/>
      </Switch>
    )
  }
  return (
    <div>
      <Navigation/>
      {routes}
    </div>
  );
}

const mapStateToProps = state=>{
  return{
    isAuthenticated: state.auth.token !== null
  }
}


export default connect(mapStateToProps)(App);
