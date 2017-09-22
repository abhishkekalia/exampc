import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux';

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import { connect } from 'react-redux';

import Login from './auth/components/Login';
import Homepage from './menu/Homepage';
import LoginPage from './auth/LoginPage';
import ProfilePage from './profile/ProfilePage';
import Loader from './common/Loader';
import MessageBar from './messagebar/MessageBar';
import Searchwebcontainer from './AddContainer/Searchwebcontainer'
const reducerCreate = params => { 
    const defaultReducer = new Reducer(params);

    return (state, action) => { 
        console.log('ACTION:', action); 
        return defaultReducer(state, action); 
    };
};

const getSceneStyle = () => ({
    backgroundColor: '#F5FCFF',
    shadowOpacity: 1,
    shadowRadius: 3,
});

const Routes = (loading, needSignIn) => ( 
    <Router 
    createReducer={reducerCreate}
    getSceneStyle={getSceneStyle}>
        <Overlay>
            <Modal
            hideNavBar
            transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid })}>
            
            <Stack 
                hideNavBar
                key="root"
                titleStyle={{ alignSelf: 'center' }}>

                    <Scene key="login" initial={needSignIn} component={LoginPage} title="login" type={ActionConst.RESET} />
            
            </Stack>

            <Stack 
            hideNavBar 
            key="home" 
            titleStyle={{ alignSelf: 'center' }}>
                <Scene key="home" component={Homepage} initial={!needSignIn} title="home" type={ActionConst.REPLACE}/>
                <Scene key="profilePage" component={ProfilePage} title="Profile"/>
                <Scene key="flatlist" component={Searchwebcontainer} title="SearchContainer"/>
                <Scene 
                key="loginModal2"
                component={LoginPage}
                title="Login2"
                backTitle="Back"
                panHandlers={null}
                duration={1}/>
            </Stack>
            <Stack 
            key="msg" 
            titleStyle={{ alignSelf: 'center' }}>
                <Scene key="msg" component={MessageBar} />

            </Stack>
            </Modal>
        </Overlay>
    </Router>
);

function mapStateToProps(state) {
    return {
        loading: !state.storage.storageLoaded,
        needSignIn: !state.auth.token
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

export default connect(mapStateToProps)(Routes);