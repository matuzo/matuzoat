class Squares {
  constructor(options) {
    this.options = options;

    this.canvas = document.querySelector(options.canvas);

    if (!this.canvas) return;

    this.context = this.canvas.getContext('2d');
    this.color ='red';

    this.size = this.prop_set(options.size, 20);

    this.num_x = options.num_x;
    this.num_y = options.num_y;

    this.init_canvas();
  }

  init_canvas() {
    this.prepare_canvas();
    this.attach_events();

    if (this.options.pattern) {
      this.parse_pattern();
    }

    if (this.options.fill) {
      const num_boxes = Math.round(this.get_parent_width() / this.size / 2);

      for (let i = 0; i < num_boxes; i++) {
        this.squares.push({ x: this.size * (2 * i), y: 0 });
      }

      console.log(this.squares)


      console.log('fill it');
      console.log();

      this.draw_squares();
    }
  }

  attach_events() {
    this.place_square = this.place_square.bind(this);
    this.canvas.addEventListener('click', this.place_square);
  }

  place_square(e) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const x_raw = e.pageX - e.target.offsetLeft;
      const y_raw = e.pageY - e.target.offsetTop;

      let x = x_raw - x_raw % this.size;
      let y = y_raw - y_raw % this.size;

      if (y === this.canvas.height) {
        y -= this.size;
      }
      if (x === this.canvas.width) {
        x -= this.size;
      }

      const index = this.squares.findIndex(pos => pos.x === x & pos.y === y);

      if (index > -1) {
        this.squares.splice(index, 1);
      } else {
        this.squares.push({ x: x, y: y});
      }

      this.draw_squares(this.context, this.squares);
  }

  prop_set(prop, value) {
    return prop ? prop : value;
  }

  prepare_canvas() {
    this.canvas.removeAttribute('hidden');

    this.canvas.width = this.num_x * this.size;
    this.canvas.height = this.num_y * this.size;

    if (this.num_x === 'infinite') {  
      this.canvas.width = this.get_parent_width();
    }

    this.squares = [];
  }

  get_parent_width() {
    const parent_styles = getComputedStyle(this.canvas.parentNode);
    let parent_width = this.canvas.parentNode.clientWidth;
    parent_width -= parseFloat(parent_styles.paddingLeft) + parseFloat(parent_styles.paddingRight);

    return parent_width;
  }

  parse_pattern() {
    console.log('parse')

    const pattern = this.options.pattern.split(',');

    for (let i = 0; i < pattern.length; i++) {
      const box = parseInt(pattern[i].trim());
      let row = Math.floor(i / this.num_x);
      let col = (i + this.num_x) % this.num_x;

      if (this.num_x === 'infinite') {
        row = 0;
        col = i;
      }

      if (box) {
        this.squares.push({ x: this.size * col, y: this.size * row });
      }

      console.log(this.squares)
    }

    this.draw_squares();
  }

  draw_squares() {
    console.log('draw')
    this.context.fillStyle = this.prop_set(this.options.color, 'rgba(51, 51, 51, 0.9)');

    for(var i = 0; i < this.squares.length; i++) {
      const square = this.squares[i];
      console.log(square)
      this.context.fillRect(square.x, square.y, this.size, this.size);
    }
  }
}

export default Squares;


