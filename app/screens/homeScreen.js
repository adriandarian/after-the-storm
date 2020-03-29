import React from "react";
import { SafeAreaView, StyleSheet, Button } from "react-native";
import Swiper from "react-native-deck-swiper";

import { Card } from "../components/Card";
import { HomeScreenPics } from "../constants/Pics";

// demo purposes only
function * range (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [...range(1, 50)],
      swipedAllCards: false,
      swipeDirection: "",
      cardIndex: 0
    };
  }

  componentDidUpdate() {

  }

  renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{card} - {index}</Text>
      </View>
    )
  };

  onSwiped = type => {
    console.log(`on swiped ${type}`);
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
          cards={this.renderCard}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={80}
          cardHorizontalMargin={0}
          renderCard={this.state.cards}
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
        >
          <Button onPress={() => this.swiper.swipeBack()} title="Swipe Back" />
        </Swiper>
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
