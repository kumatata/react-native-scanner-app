import React, { useState, useEffect } from 'react';
import { Text, View, Vibration } from 'react-native';
import { Button } from 'react-native-elements'
import { Camera } from 'expo-camera';

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default class ScannerView extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            isFlashOn: false,
            flashState: Camera.Constants.FlashMode.torch,
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            scanned: null
        }
    }

    async componentDidMount() {
        //Getting Permission result from app details.
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    changeFlash(){
        this.state.isFlashOn ? 
            this.setState({isFlashOn: false}) : 
            this.setState({isFlashOn: true})
    }

    handleBarCodeScanned = ({ type, data }) => {

        this.setState({scanned: true})
        Vibration.vibrate();
        

        fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`) 
            .then((response) => response.json())
            .then((responseJson) => {

                this.props.navigation.navigate('Home', {
                    screen: 'Details',
                    params: { product: responseJson.product },
                });

            })
            .catch((error) =>{
                console.error(error);
            });

        
	};


    render(){
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return (
                <View>
                    <Text>Pas d'accès à la caméra</Text>
                </View>
            );
        } else {

            return (
            <View style={{ flex: 1 }}>
              <Camera
                    type={this.state.type}
                    flashMode={this.state.isFlashOn ?  Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                    onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end'
                    }} 
                    >
                
                    <Button title={'Flash'} onPress={()=> this.changeFlash()} />
                    <Button title={'Scanner un nouveau produit'} onPress={()=> this.setState({scanned: null})} />
                    
              </Camera>
            </View>
          );

        }
    }

  
}