import React, {Component} from 'react';
import { Container } from 'reactstrap';
import { Routes, Route, Navigate, useParams, useRouteMatch } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import HomePage from '../Pages/HomePage/HomePage';
import EditPage from '../Pages/EditPage/EditPage';
import EditEntryPointPage from '../Pages/EditEntryPoint/EditEntryPointPage'

import ApiDebug from '../components/ApiDebug';

import Navigation from '../components/Navigation';

import Bricciole from '../components/Bricciole';

export default () => {
    let params = useParams();
    return (
        <div>
          <Navigation />
          <Bricciole />
          <Container>
           <Routes>
             <Route path={`${process.env.PUBLIC_URL}`} exact component={HomePage} />
             <Route path={`${process.env.PUBLIC_URL}editapi/:id/editentry/:entry`} exact component={EditEntryPointPage} />
             <Route path={`${process.env.PUBLIC_URL}editapi/:id/editentry`} exact>
             <Navigate to={`${process.env.PUBLIC_URL}editapi/${params.id}`} />
             </Route>
             <Route path={`${process.env.PUBLIC_URL}editapi/:id`} component={EditPage} exact />
             <Route path={`${process.env.PUBLIC_URL}editapi`} exact >
             <Navigate to={`${process.env.PUBLIC_URL}`} />
             </Route>
             <Route path={`apimanager/`} component={HomePage} />
           </Routes>
          </Container>
          <ApiDebug />
        </div>
    )
}
/*

class PrimaryLayout extends Component
{

    componentWillMount() {
        console.log('props', this.props);
        const { logged } =  this.props;
        if(logged!==true) {
            //this.props.push(`${process.env.PUBLIC_URL}auth/login`);
            //this.props.push(`http://localhost:8080/auth/login`);
        }
    }

        render() {
            const {match} =  this.props;
            console.log('matche',match.path, match);
            return (
                <div>
                  <Navigation />
                  <Bricciole />
                  <Container>
                   <Switch>
                     <Route path={`${match.path}`} exact component={HomePage} />
                     <Route path={`${match.path}editapi/:id/editentry/:entry`} exact component={EditEntryPointPage} />
                     <Route path={`${match.path}editapi/:id/editentry`} exact>
                     <Navigate to={`${match.path}editapi/${match.params.id}`} />
                     </Route>
                     <Route path={`${match.path}editapi/:id`} component={EditPage} exact />
                     <Route path={`${match.path}editapi`} exact >
                     <Navigate to={`${match.path}`} />
                     </Route>
                     <Route path={`${match.path}apimanager/`} component={HomePage} />
                   </Switch>
                  </Container>
                  <ApiDebug />
                </div>
            )
        }
}

const mapState = (state, ownProps) => {
    return {
        ...ownProps,
        logged: state.loginStatus.logged
    }
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({push},dispatch);
}

export default connect(mapState, mapDispatch)(PrimaryLayout);
*/
