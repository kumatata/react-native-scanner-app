import React from 'react' ;
import { Text, View,StyleSheet, SafeAreaView,FlatList, ActivityIndicator  } from 'react-native';
import Constants from 'expo-constants';
//import ListItem from '../components/ListItem' ;

function Item({title}){
    return(
        <View>
            <Text>{title}</Text>
        </View>
    );
}

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
      }

    componentDidMount(){   // Fonction qui permet de récupérer les données des produits scannés 
        return fetch('https://fr-en.openfoodfacts.org/category/meals/1.json')
        .then((response) => response.json())
        .then((dataJson) => {
  
          this.setState({
            isLoading: false,
            data: dataJson.products,
          });
  
        })
        .catch((error) =>{
          console.error(error);
        });
}

    render() {
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
              </View>
            )
          }
        return(
            <SafeAreaView style={{flex: 1, paddingTop:20}}>
              
              <FlatList
                data={this.state.data}
                renderItem={({item}) => <Item item={item} title={item.product_name} />}
                keyExtractor={({id}, index) => id}
              />
            </SafeAreaView>
        );
}
  }