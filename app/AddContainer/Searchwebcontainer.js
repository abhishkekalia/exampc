import React, { Component } from 'react';
import { 
	StyleSheet, 
	Text, 
	TouchableOpacity, 
	View, 
	NetInfo 
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Autocomplete from './Autocomplete';

class Searchwebcontainer extends Component {
	static renderFilm(jrc) {
		const { container_no, id, job_id } = jrc;

		return (
			<View>
				<Text style={styles.titleText}> {container_no}</Text>

				<TouchableOpacity onPress={ ()=> Actions.CaptureConfig({c_id : job_id , container_no : container_no}) }>
					<Text style={styles.titleText}> add Image</Text>
				</TouchableOpacity>

			</View>
		);
	}

	constructor(props) {
		super(props);
		this.state = {
			dataSource : [],
			query: ''
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
					renderItem={({ container_no, release_date }) => (
						<TouchableOpacity onPress={() => this.setState({ query: container_no })}>
							<Text style={styles.itemText}>
								{container_no} 
							</Text>
						</TouchableOpacity>
					)}
				/>
				<View style={styles.descriptionContainer}>
					{dataSource.length > 0 ? (
						Searchwebcontainer.renderFilm(dataSource[0])
					) : (
						<Text style={styles.infoText}>
						</Text>
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
		zIndex				: 1
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
		marginTop			: 25,
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