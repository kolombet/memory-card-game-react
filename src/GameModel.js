import Signal from "signals";

const WAITING_FOR_HIDE = "WAITING_FOR_HIDE";
const HIDE_ANIMATION = "HIDE_ANIMATION";
const WAITING_FOR_UNFLIP = "WAITING_FOR_UNFLIP";
const WAITING_FOR_PLAYER_INPUT = "WAITING_FOR_PLAYER_INPUT";
const SHOWING_GUBER_DETAILS = "SHOWING_GUBER_DETAILS";
const SHOWING_SCORE = "SHOWING_SCORE";

class GameModel {

  constructor() {
    this.onModelChanged = new Signal();
    this.state = WAITING_FOR_PLAYER_INPUT;
    this._moveCount = 0;
    this._pairCount = 0;

    const cardsCount = 16;
    const cards = [];
    for (let i = 0; i < cardsCount; i++) {
      const pairId = Math.floor(i / 2);
      cards.push(new CardModel(i, pairId));
    }

    this.cards = this.shuffle(cards);
    this.flipped = [];
    this.dispatchModelChange();

    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      let delta = timestamp - start;
      start = timestamp;
      this.update(delta);

      window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }

  shuffle(array) {
    return array.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);
  }

  update(delta) {
    if (this.stateTimer > 0) {
      this.stateTimer -= delta;
      return;
    }

    switch (this.state) {
      case WAITING_FOR_PLAYER_INPUT:
        break;
      case WAITING_FOR_HIDE:
        this.waitingForHide();
        break;
      case WAITING_FOR_UNFLIP:
        this.waitingForUnflip();
        break;
      case HIDE_ANIMATION:
        this.setState(SHOWING_GUBER_DETAILS);
        break;
      case SHOWING_GUBER_DETAILS:
        break;
    }
  }

  detailsNext() {
    console.log("pair count " + this._pairCount);
    if (this._pairCount === 8)
      this.setState(SHOWING_SCORE);
    else
      this.setState(WAITING_FOR_PLAYER_INPUT);
  }

  isShowingDetails() {
    return this.state === SHOWING_GUBER_DETAILS;
  }

  isShowingScore() {
    return this.state === SHOWING_SCORE;
  }

  detailsId() {
    return this._detilsId;
  }

  waitingForUnflip() {
    this.unflipAll();
    this.setState(WAITING_FOR_PLAYER_INPUT);
  }

  waitingForHide() {
    // const first = this.flipped[0];
    // const second = this.flipped[1];
    // first.isGuessed = true;
    // second.isGuessed = true;
    // this.flipped = [];

    // console.log("waiting for hide");
    // this.state = WAITING_FOR_PLAYER_INPUT;
    this.setState(HIDE_ANIMATION, 2);
    // this.setState(SHOWING_GUBER_DETAILS);
  }

  getMoveCount() {
    return this._moveCount;
  }

  hideAnimation() {

  }

  checkIfFlippedDuplicates() {
    if (this.flipped.length !== 2)
      return;

    const first = this.flipped[0];
    const second = this.flipped[1];
    if (first.pairId === second.pairId) {
      // this.state = WAITING_FOR_HIDE;
      this._detilsId = first.pairId;
      first.isGuessed = true;
      second.isGuessed = true;
      this.flipped = [];
      this._pairCount++;

      this.setState(WAITING_FOR_HIDE, 2000);
    } else {
      this.setState(WAITING_FOR_UNFLIP, 2000);
    }
  }

  unflipAll() {
    for (let card of this.flipped) {
      card.flip();
    }
    this.flipped = [];
  }

  tryToFlip(id) {
    if (this.state !== WAITING_FOR_PLAYER_INPUT) {
      console.log("flipping in state " + this.state);
      return;
    }

    this._moveCount++;

    const cards = this.cards.filter((card) => id === card.id);
    if (cards === null) {
      console.error('wrong card id');
      return;
    }
    const card = cards.shift();
    if (!card._isFlipped) {
      card.flip();
      this.flipped.push(card);
      this.dispatchModelChange();
    }

    this.checkIfFlippedDuplicates();
  }

  dispatchModelChange() {
    this.onModelChanged.dispatch();
  }

  getCards() {
    return Object.assign(this.cards);
  }

  setState(stateName, timer) {
    if (timer)
      this.stateTimer = timer;
    console.log("set state " + stateName);
    this.state = stateName;
    this.dispatchModelChange();
  }
}

class CardModel {
  constructor(id, pairId) {
    this._pairId = pairId;
    this._id = id;
    this._isFlipped = false;
    this._isGuessed = false;
  }

  get isGuessed() {
    return this._isGuessed;
  }

  set isGuessed(value) {
    this._isGuessed = value;
  }

  flip() {
    // console.log("flip ");
    this._isFlipped = !this._isFlipped;
  }

  get pairId() {
    return this._pairId;
  }

  get id() {
    return this._id;
  }

  get isFlipped() {
    return this._isFlipped;
  }
}

const gameModel = new GameModel();
export default gameModel;