import React , {  Component } from 'react';
import {
    Image,
    Platform,
    PropTypes,
    ListView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import CameraRoll from 'rn-camera-roll';
import SezServices from '../SezServices';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let PHOTOS_COUNT_BY_FETCH = 24;
let dataList = SezServices.findPictures();

export default class SinkListViewItem extends Component {
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.lastPhotoFetched = undefined; // Using `null` would crash ReactNative CameraRoll on iOS.
        this.images = [];
        this.state = this.getDataSourceState();
        this.fetchPhotos();
    }

    getDataSourceState() {
        return {
            dataSource: this.ds.cloneWithRows(dataList),
            securesend : false
        };
    }

    getPhotosFromCameraRollData(data) {
        return data.edges.map((asset) => {
            return asset.node.image;
        });
    }

    onPhotosFetchedSuccess(data) {
        const newPhotos = this.getPhotosFromCameraRollData(data);
        console.log(JSON.stringify(data));
        this.images = this.images.concat(newPhotos);
        this.setState(this.getDataSourceState());
        if (newPhotos.length) this.lastPhotoFetched = newPhotos[newPhotos.length - 1].uri;
    }

    onPhotosFetchError(err) {
    //    Handle error here
        console.log(err);
    }

    fetchPhotos(count = PHOTOS_COUNT_BY_FETCH, after) {
        CameraRoll.getPhotos({
            first: count,
            after,
        }, this.onPhotosFetchedSuccess.bind(this), this.onPhotosFetchError.bind(this));
    }

    onEndReached() {
        this.fetchPhotos(PHOTOS_COUNT_BY_FETCH, this.lastPhotoFetched);
    }

    getDemo () {
        console.warn('helo');
    }

    render() {
//    console.warn(JSON.stringify(this.state.dataSource))

let icon = ( this.state.securesend == true ? <MaterialCommunityIcons name ='send-secure' size= {30}/> : '');
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold={100}
                    showsVerticalScrollIndicator={false}
                    renderRow={(_dataBlob , image) => {return (
                        <View style= {styles.seprate}>
                        <TouchableOpacity onLongPress = { ()=>{ this.getDemo()}}>
                            <Text style={styles.textQue}>{SezServices.getData(_dataBlob.c_id)}</Text>
                            <Text style={styles.textQue}>{_dataBlob.type}</Text>

                            <Image style={styles.image} source={{ uri: _dataBlob.Uri }} />
                            
                        </TouchableOpacity>
                        </View>
                )}}/>
            </View>
        );
    }
}

const styles = {
    container   : {
        flex            : 1,
        backgroundColor : '#F5FCFF'
    },

    imageGrid: {
        flexDirection   : 'row',
        flexWrap        : 'wrap',
        justifyContent  : 'center'
    },

    image: {
        width           : 100,
        height          : 100,
        margin          : 10,
    },

    seprate : {
        borderTopWidth  : 1, 
        borderColor     : '#a9a9a9',
        paddingBottom   : 10,
    }
};

