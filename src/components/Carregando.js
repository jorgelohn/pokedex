import React from 'react';
import {View, Text, StatusBar, ActivityIndicator} from 'react-native';

export default (props) => (
  <View style={{flex: 1}}>
    <StatusBar
      backgroundColor={props.backgroundColor}
      barStyle="dark-content"
    />
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator animating size="large" color={props.color} />
      <Text style={props.textStyle || undefined}>Carregando...</Text>
    </View>
  </View>
);
