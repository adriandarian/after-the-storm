# tinder-tourism

## App Breaking Note

Currently there is a line in the Swiper.js file that breaks the codebase and needs to be changes. Replace the `incrementCardIndex()` with the following code snipper

```javascript
incrementCardIndex = onSwiped => {
  const { firstCardIndex } = this.state;
  const { infinite } = this.props;
  let newCardIndex = firstCardIndex + 1;
  let swipedAllCards = false;

  this.onSwipedCallbacks(onSwiped);

  if (newCardIndex === this.state.cards.length) {
    if (!infinite) {
      this.props.onSwipedAll();
      // onSwipeAll may have added cards
      if (newCardIndex === this.state.cards.length) {
        swipedAllCards = true;
      }
    } else {
      newCardIndex = 0;
    }
  }

  this.setCardIndex(newCardIndex, swipedAllCards);
};
```
