const FIFTEEN = Array.from({ length: 15 }, (e, i) => i + 1);
FIFTEEN.push(false);

const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (let i = arr1.length; i--;) {if (window.CP.shouldStopExecution(0)) break;
    if (arr1[i] !== arr2[i]) return false;
  }window.CP.exitedLoop(0);

  return true;
};

const isPlayable = (emptyIndex, tileIndex, width) =>
emptyIndex % width !== 0 && emptyIndex - 1 === tileIndex ||
emptyIndex % width !== width - 1 && emptyIndex + 1 === tileIndex ||
emptyIndex - width === tileIndex ||
emptyIndex + width === tileIndex;


const app = document.createElement('div');
document.body.appendChild(app);
new Vue({
  el: app,
  data: function () {
    return {
      mounted: false,
      state: [...FIFTEEN] };

  },
  computed: {
    completed: function () {
      return this.mounted && arraysEqual(FIFTEEN, this.state);
    } },

  mounted: function () {
    this.mounted = true;
    this.shuffleState();
  },
  methods: {
    updateState(i) {
      const updated = [...this.state];
      updated[this.state.indexOf(false)] = this.state[i];
      updated[i] = false;
      this.state = updated;
    },
    shuffleState() {
      this.state.sort(() => Math.random() - 0.5);
    } },

  render(h) {
    const empty = this.state.indexOf(false);

    return h(
    'div',
    { class: 'wrapper' },
    [
    h(
    'transition-group', {
      class: 'grid',
      props: { tag: 'ul', name: 'list' } },

    this.state.map((num, i) => h(
    'li', {
      class: { 'item': true, 'hidden': !num },
      key: num },
    [h(
    'button',
    {
      attrs: { disabled: this.completed || !isPlayable(empty, i, 4) },
      class: 'button',
      on: !this.completed && isPlayable(empty, i, 4) ? { click: e => {
          this.updateState(i);
          e.currentTarget.blur();
        } } : {} },

    num)]))),



    h(
    'button',
    {
      attrs: { disabled: !this.completed },
      class: { overlay: true, 'overlay-hidden': !this.completed },
      on: this.completed ? { click: () => this.shuffleState() } : {} },

    'Congratulations! Play again?')]);



  } });