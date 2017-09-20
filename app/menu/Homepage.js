import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Basic from './Basic';
import {Actions as routes} from 'react-native-router-flux';
import * as authActions from '../auth/auth.actions';

function mapStateToProps(state) {
    return {
        identity: state.identity,
        openProfile: routes.profilePage

    }
}

function dispatchToProps(dispatch) {
    return bindActionCreators({logout: authActions.logout}, dispatch);
}

export default connect(mapStateToProps, dispatchToProps)(Basic);



