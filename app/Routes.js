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

import Login from './auth/LoginPage';
import Basic from './menu/Basic';

import LoginPage from './auth/LoginPage';
import ProfilePage from './profile/ProfilePage';
import Loader from './common/Loader';


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

const Routes = ({loading, needSignIn}) => (
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

                    <Scene key="launch" initial={needSignIn} component={LoginPage} title="login" initial />
            </Stack>

            <Stack 
            hideNavBar 
            key="login" 
            titleStyle={{ alignSelf: 'center' }}>
                <Scene key="Basic" component={Basic} initial={!needSignIn} />

                <Scene 
                key="loginModal2"
                component={LoginPage}
                title="Login2"
                backTitle="Back"
                panHandlers={null}
                duration={1}/>
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
export default connect(mapStateToProps)(Routes);