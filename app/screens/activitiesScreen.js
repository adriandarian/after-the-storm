import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';

export default function ActivitiesScreen({navigation}) {
    return (
    <View style={styles.container}>
      <Text>Activities Screen</Text>
      <Button
        title="Go to Food"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

ActivitiesScreen.navigationOptions = {

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
