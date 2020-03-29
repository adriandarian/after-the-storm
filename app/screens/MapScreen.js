import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken(
  "pk.eyJ1IjoiYWRhcmlhbiIsImEiOiJjazhiYWpqajQwNGI5M2xucG5iMHNwMnI5In0.KsTFYROaB_YeE9mU0wr95w"
);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  }
});

export default class MapScreen extends Component {
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView
            ref={c => (this._map = c)}
            style={styles.map}
            styleURL={Mapbox.StyleURL.Light}
            zoomLevel={12}
            // centerCoordinate={[lat, lng]}
            showUserLocation
          />
        </View>
      </View>
    );
  }
}
