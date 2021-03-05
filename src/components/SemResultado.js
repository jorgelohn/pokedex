import React from 'react';
import {View, Text, StatusBar} from 'react-native';

export default function SemMessage(props) {
  const colorStyles = {
    color: props.color ? props.color : 'black',
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={props.backgroundColor}
        barStyle="light-content"
      />
      <View style={styles.viewMessage}>
        <Text style={[styles.message, colorStyles]}>
          {props.msg
            ? props.msg
            : 'Ops, sem resultado para o filtro informado. Tente Novamente.'}
        </Text>
      </View>
    </View>
  );
}
const styles = {
  container: {
    flex: 1,
  },
  viewMessage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
};
