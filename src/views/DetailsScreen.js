import React from 'react';
import { Text, View, Image } from 'react-native';
import { Icon, Button } from 'react-native-elements'

export default class DetailsScreen extends React.Component{
    render(){
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text>{this.props.route.params.product.product_name}</Text>
                <Image 
                    source={{uri: this.props.route.params.product.image_small_url }}
                    style={{ alignSelf: 'center', width: 200, height: 200}}
                    />
            </View>
        );
    }
   
}