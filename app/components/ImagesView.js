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

export default class ImagesView extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.lastPhotoFetched = undefined; 
        this.images = [];
        this.state = this.getDataSourceState();
        this.fetchPhotos= this.fetchPhotos.bind(this);
    }

    getDataSourceState() {
        return {
            dataSource: this.ds.cloneWithRows(SezServices.getPhoto(this.props.job_id , this.props.type)),
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
        console.warn(JSON.stringify(data));
        this.images = this.images.concat(newPhotos);
        this.setState(this.getDataSourceState());
        if (newPhotos.length) this.lastPhotoFetched = newPhotos[newPhotos.length - 1].uri;
    }

    onPhotosFetchError(err) {
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



    render() {
        return (
            <View style={styles.container}>
                <ListView
                contentContainerStyle={styles.imageGrid}
                dataSource={this.state.dataSource}
                onEndReached={this.onEndReached.bind(this)}
                onEndReachedThreshold={100}
                showsVerticalScrollIndicator={false}
                renderRow={(_dataBlob , image) => {return (
                    <View style= {styles.seprate}>
                        <Image style={styles.image} source={{ uri: _dataBlob.Uri }} />
                    </View>
                )}} />
            </View>
        );
    }
}

const styles = {
    container : {
        flex : 1,
        flexDirection : 'row',
        backgroundColor : '#F5FCFF'
    },

    imageGrid: {
        flexWrap: 'wrap'
    },

    image: {
        width : 70,
        height : 50,
        margin : 10,
    },

    seprate : {
        borderBottomWidth : 1, 
        borderColor : '#a9a9a9',
        paddingBottom : 5,
    }
};