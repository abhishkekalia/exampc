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

import TabIcon from '../components/TabIcon';
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

                                </Scene>
                            </Drawer>
                            </Stack>

                   
                </Lightbox>

                

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