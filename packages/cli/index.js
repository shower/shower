class ShowerCLI {
  constructor(root) {
    this.root = root;
  }

  pdf() {
    console.log(`Run pdf in "${this.root}" dir`);
  }

  init() {
    console.log(`Run init in "${this.root}" dir`);
  }

  serve() {
    console.log(`Run serve in "${this.root}" dir`);
  }
}

module.exports = ShowerCLI;
