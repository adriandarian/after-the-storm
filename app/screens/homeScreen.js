import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Swiper from "react-native-deck-swiper";
import axios from "axios";

import shuffleArray from "../utils/shuffleArray";
import { Card } from "../components/Card";
import { HomeScreenPics } from "../constants/Pics";

let businessData;

(function businesses() {
  return axios
    .get(
      "https://us-central1-tinder-tourism.cloudfunctions.net/yelp-business-data",
      {
        params: {
          term: ["active", "restaurants", "food", "arts"][
            Math.floor(Math.random() * Math.floor(4))
          ],
          latitude: 34.079994,
          longitude: -118.25519
        }
      }
    )
    .then(response => {
      let cards = [];
      response.data.businesses.forEach(e => {
        cards.push({
          pic: { uri: e["image_url"] },
          title: e["name"],
          caption: e["alias"]
        });
      });

      businessData = shuffleArray(cards);
    });
})();

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipedAllCards: false,
      swipeDirection: "",
      cardIndex: 0,
    };
  }

  onSwiped = type => {
    console.log(`on swiped ${type}`);
    console.log("HSP: ", HomeScreenPics);
    console.log("BD: ", businessData)
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    });
  };

  swipeLeft = () => {
    this.swiper.swipeLeft();
  };

  render() {
    const { businesses } = this.state;
    console.log("3: ", businessData)
    return (
      <SafeAreaView style={styles.container}>
        <Swiper
          ref={swiper => {
            this.swiper = swiper;
          }}
          onSwiped={() => this.onSwiped("general")}
          onSwipedLeft={() => this.onSwiped("left")}
          onSwipedRight={() => this.onSwiped("right")}
          onSwipedTop={() => this.onSwiped("top")}
          onSwipedBottom={() => this.onSwiped("bottom")}
          onTapCard={this.swipeLeft}
          cards={businessData}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={80}
          cardHorizontalMargin={0}
          renderCard={Card}
          onSwipedAll={this.onSwipedAllCards}
          stackSize={3}
          stackSeparation={15}
          overlayLabels={{
            bottom: {
              title: "BLEAH",
              style: {
                label: {
                  backgroundColor: "black",
                  borderColor: "black",
                  color: "white",
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }
              }
            },
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: "black",
                  borderColor: "black",
                  color: "white",
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: -30
                }
              }
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  backgroundColor: "black",
                  borderColor: "black",
                  color: "white",
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: 30
                }
              }
            },
            top: {
              title: "SUPER LIKE",
              style: {
                label: {
                  backgroundColor: "black",
                  borderColor: "black",
                  color: "white",
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }
              }
            }
          }}
          backgroundColor="white"
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          infinite
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  }
});

export default HomeScreen;
