import "./../css/_iconfont_iconfont.scss";
export class Hello {
  constructor(name) {
    this.say(name);
  }
  say(name) {
    console.log(`Hello ${name} World!`);
  }
}

export default new Hello('Nekomimi');