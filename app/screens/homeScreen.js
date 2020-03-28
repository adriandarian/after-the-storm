import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';

export default function HomeScreen({navigation}) {
    return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Activities"
        onPress={() => navigation.navigate('Activities')}
      />
    </View>
  );
}

HomeScreen.navigationOptions = {

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
