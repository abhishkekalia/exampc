import React, { Component ,PropTypes} from 'react';
import { StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import ContainerShow from '../ListView';
import AddDetails from '../AddContainer/InsertContainer'
import SinkListViewItem from '../sinkable/SinkListViewItem';
import Icon from 'react-native-vector-icons/Entypo';
import { StackNavigator } from 'react-navigation';
import ActionBar from 'react-native-action-bar';


export default class Basic extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false,
            selectedItem: 'container',
            image : ''
        };
    }
    componentWillMount() {
        
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    onMenuItemSelected = (item) =>
        this.setState({
            isOpen: false,
            selectedItem: item
        });
    adminImage () {
        AsyncStorage.getItem('Uid', (err, result) => {
            this.setState({
                image : result
            })
             }); 
    }

    updateFrontView () {
        switch (this.state.selectedItem ) {
          case 'container':
            return <ContainerShow />;
          case 'addcontainer':
            return <AddDetails />;
          case 'datasink':
            return <SinkListViewItem/>;
        }
    }

    routeFrontView(fragmentId) {
        this.refs.SideMenu.blockSideMenu(false);
        this.setState({ selectedItem : fragmentId });
    }

    static propTypes = {
        openProfile: PropTypes.func.isRequired
    };

    render() {
        const { openProfile } = this.props;
        const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
        let fragment = this.updateFrontView();

        return (
            <SideMenu
            menu={menu}
            isOpen={this.state.isOpen}
            onChange={isOpen => this.updateMenuState(isOpen)}>

                <ActionBar 
                containerStyle={styles.bar}
                title={''}
//              rightText={'Hello'}
                leftIconName={'menu'}
//              leftBadge={''}
                onLeftPress={this.toggle}
//              onTitlePress={() => console.warn('Title!')} 
                rightIcons={[    
                        { 
                            name: 'search',
//                          badge: '1', 
                            onPress: () => console.warn('Right Plus !'),
                        },
                    ]}
                />

                {fragment} 
            </SideMenu> 
        );
    }
}

const styles = StyleSheet.create({ 
    button: {
        position    : 'absolute',
        padding     : 15
    },

    caption: {
        fontSize    : 20,
        fontWeight  : 'bold',
        alignItems  : 'center',
    },

    container: {
        flex    : 1,
        justifyContent  : 'center',
        alignItems  : 'center',
        backgroundColor : '#F5FCFF',
    },

    welcome: {
        fontSize    : 20,
        textAlign   : 'center',
        margin      : 10,
    },

    instructions: {
        textAlign   : 'center',
        color       : '#333333',
        marginBottom: 5,
    },
    
    bar : {
        backgroundColor : '#6a5acd',
        height      : 50
    }
});
/*
AsyncStorage.getItem('Uid', (err, result) => {
                 console.warn(result);
             }); 
*/