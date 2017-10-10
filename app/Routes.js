import React from 'react';
import { 
    StyleSheet, 
    Text,
    Alert, 
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
import ContainerView from './components/ContainerView'
import CaptureConfig from './components/CaptureConfig'
import Searchwebcontainer from './components/Searchwebcontainer'
import Intro from './messagebar/Intro';
import MessageBar from './messagebar/MessageBar';
import Menu from './menu/Menu';

import TestList from './components/test/TestList'
import Testedit from './components/test/testEdit'

import TabIcon from './components/TabIcon';
import MenuIcon from '../images/menu_burger.png';


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
                    key="root"> 
                        <Scene key="login" component={LoginPage} initial /> 
                        
                        <Drawer 
                        hideNavBar 
                        key="home" 
                        contentComponent={Menu} 
                        drawerImage={MenuIcon}> 

                            <Scene hideNavBar> 
                                <Stack
                                key="search"
                                icon={TabIcon}
                                navigationBarStyle={{ backgroundColor: '#6a5acd' }}
                                initial>
                                    <Scene
                                    key="Searchwebcontainer"
                                    component={Searchwebcontainer}
                                    onRight={() => {console.log('right')}}
                                    titleStyle={{ color: '#fff', alignSelf: 'center' }}
                                    rightTitle=""
                                    rightButtonTintColor='#fff'
                                    />
                                    <Scene
                                    key="captureconfig"
                                    component={CaptureConfig}
                                    title=""
                                    back
                                    onBack={()=> Actions.pop()}
                                    panHandlers={null}
                                    duration={1}/>
                                    <Scene
                                    key="ContainerView"
                                    component={ContainerView}
                                    title="capture"
                                    back
                                    navigationBarStyle={{ backgroundColor: '#000', opacity :0.3 }}
                                    titleStyle={{ color: 'black', alignSelf: 'center' }}/>
                                </Stack> 

                                <Stack key="intro">
                                    <Scene 
                                    key="intro" 
                                    component={Intro} 
                                    title="Tab #4" 
                                    hideNavBar 
                                    icon={TabIcon} />
                                </Stack>

                                <Stack 
                                key="testList"
                                icon={TabIcon}
                                navigationBarStyle={{ backgroundColor: '#6a5acd' }}
                                titleStyle={{ color: '#fff' }}>
                                    <Scene 
                                    key="list" 
                                    component={TestList}
                                    onRight={() => Actions.testEdit()}
                                    rightTitle="Add"
                                    icon={TabIcon} />
                                </Stack>
                            </Scene>
                        </Drawer>
                    </Stack>
                </Lightbox>

                <Stack 
                key="testEdit" 
                titleStyle={{ alignSelf: 'center' }}>
                     <Scene
                    key="edit"
                    component={Testedit}
                    title="Add"
                    back
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