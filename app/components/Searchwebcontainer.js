import React, { Component } from 'react';
import {
	StyleSheet, 
	Text, 
	TouchableOpacity, 
	View, 
	NetInfo,
	AsyncStorage 
} from 'react-native';
import { MessageBarManager } from 'react-native-message-bar';
import { Actions } from 'react-native-router-flux';
import Autocomplete from './Autocomplete';
import ContainerList from '../components/ContainerList'
import SezModel from '../SezModel';
import SezServices from '../SezServices';
import Utils from '../Utils';

let uuid = Utils.guid();

class Searchwebcontainer extends Component {
	static renderFilm(jrc) {
		const { container_no, job_id, job_no } = jrc;

		return true;
	}

	constructor(props) {
		super(props);
		this.state = {
			dataSource : [],
			query: '',
		};
	}

	
	  findContainer(query) { 
	  	if (query === '') { 
	  		return [];
	  	}
        fetch(`http://jr.econ14.com/api/containers?id=${this.state.id}&search=${this.state.query}`, { 
        method: "GET",headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }   
    }) 
    .then((response) => response.json())
    .then((responseData) => {
        this.setState({
            dataSource: responseData.containers
        });
        })
         // .then( (js)=> console.warn(JSON.stringify(this.state.dataSource)))                                                                                                                                                                                                                                                                                                                                                             
        .done();


    const { dataSource } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return dataSource.filter(jrc => jrc.container_no.search(regex) >= 0);
  }

	itemSet(job_id, job_no, container_no){
		this.setState ({
			query : 'container_no'
		})
		 Actions.CaptureConfig({job_id , job_no:job_no, container_no : container_no})
	}
	navigate ( id, job_id, container_no){

        SezServices.save(new SezModel( uuid, job_id, id, container_no))        
		Actions.searchItem({ job_id: job_id, container_no : container_no, container_id : id})
	}

	 render() {
    const { query } = this.state;
    const dataSource = this.findContainer(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={dataSource.length === 1 && comp(query, dataSource[0].container_no) ? [] : dataSource}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter Container Number"
          renderItem={({id, container_no, job_no ,job_id}) => (
            <TouchableOpacity onPress={()=> 
            	this.setState({ 
            		query: '' 
            	}, 
            	()=>this.navigate( id, job_id, container_no) ) }>
              <Text style={styles.itemText}>
                {container_no} {job_no}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {dataSource.length > 0 ? (
            Searchwebcontainer.renderFilm(dataSource[0])
          ) : (
           < ContainerList/>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container 	: {
		backgroundColor 	: '#F5FCFF',
		flex				: 1,
		paddingTop			: 25
	},

	autocompleteContainer 	: {
		flex				: 1,
		left				: 0,
		position			: 'absolute',
		right				: 0,
		top 				: 0,
		zIndex				: 1,
		backgroundColor 	: '#fff'
	},

	itemText	: {
		fontSize			: 18,
		margin 				: 2,
		padding 			: 10,
		borderBottomWidth	: 1, 
		borderColor			: '#a9a9a9',
		textAlign 			: 'left',
	},

	descriptionContainer	: {
		backgroundColor		: '#F5FCFF',
		marginTop			: 30,
	},

	infoText	: {
		textAlign			: 'center'
	},

	titleText	: {
		fontSize			: 18,
		fontWeight			: '500',
		marginBottom		: 10,
		marginTop			: 10,
		textAlign			: 'center'
	},

	directorText	: {
		color 				: 'grey',
		fontSize			: 12,
		marginBottom		: 10,
		textAlign			: 'center'
	},

	openingText	: {
		textAlign			: 'center'
	}
});

export default Searchwebcontainer;