import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';
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

import LoginPage from './auth/LoginPage';
import ListView from './ListView';
import InsertContainer from './AddContainer/InsertContainer'
import ContainerView from './AddContainer/ContainerView'
import DetailScreen from './AddContainer/DetailScreen'
import Searchwebcontainer from './AddContainer/Searchwebcontainer'
import SinkListViewItem from './syncable/SinkListViewItem'
import Intro from './messagebar/Intro';
import MessageBar from './messagebar/MessageBar';
import Menu from './menu/Menu';


import Launch from '../components/Launch';
import Register from '../components/Register';
import Login from '../components/Login';
import Login2 from '../components/Login2';
import Login3 from '../components/Login3';
import Home from '../components/Home';
import TabView from '../components/TabView';
import TabIcon from '../components/TabIcon';
import EchoView from '../components/EchoView';
import ErrorModal from '../components/modal/ErrorModal';
import DemoLightbox from '../components/lightbox/DemoLightbox';
import MenuIcon from '../images/menu_b.png';


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
            transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid })} > 
                <Lightbox>
                    <Stack 
                    hideNavBar 
                    key="root" 
                    titleStyle={{ alignSelf: 'center' }} > 
                        <Scene key="login" component={LoginPage} title="login" initial /> 

                            <Drawer 
                            hideNavBar 
                            key="home" 
                            contentComponent={Menu} 
                            drawerImage={MenuIcon}> 

                                <Scene hideNavBar> 
                                    

                                    <Stack
                                    key="listview"
                                    icon={TabIcon}
                                    navigationBarStyle={{ backgroundColor: '#6a5acd' }}
                                    initial>
                                        
                                        <Scene
                                        key="listview"
                                        component={ListView}
                                        onRight={() => {Actions.search()}}
                                        titleStyle={{ color: '#fff', alignSelf: 'center' }}
                                        rightTitle="Search"
                                        rightButtonTintColor='#fff'/>
                        
                                        <Scene 
                                        key="tab_2_2" 
                                        component={TabView}
                                        title="Tab #2_2" 
                                        onBack={() => alert('onBack button!')} 
                                        backTitle="Back!" 
                                        panHandlers={null}/>
                                    </Stack> 

                                    <Stack
                                    key="sync"
                                    title="Sync Data"
                                    icon={TabIcon}
                                    navigationBarStyle={{ backgroundColor: '#6a5acd' }}
                                    > 
                                        <Scene
                                        key="sync"
                                        component={SinkListViewItem}
                                        title="Sync"
                                        icon={TabIcon}
                                        titleStyle={{ color: '#fff', alignSelf: 'center' }}
                                        />
                                    </Stack> 

                                    <Stack key="intro">
                                        <Scene 
                                        key="intro" 
                                        component={Intro} 
                                        title="Tab #4" 
                                        hideNavBar 
                                        icon={TabIcon} />

                                    </Stack>

                                    <Stack key="tab_5"> 
                                        <Scene 
                                        key="tab_5_1" 
                                        component={TabView} 
                                        title="Tab #5" 
                                        icon={TabIcon} />
                                    </Stack>
                                </Scene>
                            </Drawer>
                        </Stack>

                    <Scene 
                    key="demo_lightbox" 
                    component={DemoLightbox} />
                </Lightbox>

                <Scene 
                key="error" 
                component={ErrorModal} /> 

                <Stack 
                key="search" 
                titleStyle={{ alignSelf: 'center' }}> 

                    <Scene
                    key="Searchwebcontainer"
                    component={Searchwebcontainer}
                    leftTitle="Cancel"
                    onLeft={Actions.pop}
                    />

                    <Scene
                    key="CaptureConfig"
                    component={DetailScreen}
                    title="DetailScreen"
                    backTitle="Back"
                    panHandlers={null}
                    duration={1}/>

                    <Scene
                    key="ContainerView"
                    component={ContainerView}
                    title="capture"
                    back
                    navigationBarStyle={{ backgroundColor: '#000', opacity :0.3 }}
                    titleStyle={{ color: 'black', alignSelf: 'center' }}/>

                    <Scene 
                    key="loginModal3" 
                    hideNavBar 
                    component={Login3} 
                    title="Login3" 
                    panHandlers={null} 
                    duration={1}/> 
                </Stack> 
            </Modal> 
            <Scene component={MessageBar} /> 
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
        flex: 1, 
        backgroundColor: 'transparent', 
        justifyContent: 'center', 
        alignItems: 'center', 
    }, 

    tabBarStyle: { 
        backgroundColor: '#eee',
    }, 

    tabBarSelectedItemStyle: { 
        backgroundColor: '#ddd' 
    },
});

export default Routes;

// export default connect(mapStateToProps)(Routes);