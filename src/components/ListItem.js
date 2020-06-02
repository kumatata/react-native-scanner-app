import React from 'react';

import { Text, View, ActivityIndicator, FlatList, StyleSheet, SafeAreaView, Button, Image, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ListItem extends React.Component{

    
    _onPress(item){
 
     
    }
    
    render() {

        console.log(this.props.navigation.state)
        
        return (
            <View style={styles.lineContainer}>
                <TouchableOpacity>
                    <Text style={styles.textLino}></Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    lineContainer: {
      height: 40,
      padding: 10,
    },
});