/**
 * author LUYUE
 * description
 * date 2018-5-31
 */
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

// 导演类，控制游戏的逻辑
export class Director {

  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }

  constructor() {
    console.log('构造器初始化');
    this.dataStote = DataStore.getInstance();
    this.moveSpeed = 2
  }

  createPencil() {
    const minTop = DataStore.getInstance().canvas.height / 8;
    const maxTop = DataStore.getInstance().canvas.height / 2;
    const top = minTop + Math.random() * (maxTop - minTop);
    this.dataStote.get('pencils').push(new UpPencil(top));
    this.dataStote.get('pencils').push(new DownPencil(top));
  }

  // 点击小鸟
  birdsEvent() {
    for (let i = 0; i <= 2; i++) {
      this.dataStote.get('birds').y[i] = this.dataStote.get('birds').birdsY[i];
    }
    this.dataStote.get('birds').time = 0;
  }

  // 判断小鸟是否撞到铅笔
  static isStrike(bird, pencil) {
    let s = false;
    if (bird.top > pencil.bottom ||
      bird.bottom < pencil.top ||
      bird.right < pencil.left ||
      bird.left > pencil.right
    ) {
      s = true;
    }
    return !s;
  }

  check() {
    const birds = this.dataStote.get('birds');
    const land = this.dataStote.get('land');
    const pencils = this.dataStote.get('pencils');
    const score = this.dataStote.get('score');

    // 撞击地面判断
    if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
      this.isGameOver = true;
      return;
    }

    const birdsBorder = {
      top: birds.y[0],
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      left: birds.birdsX[0],
      right: birds.birdsX[0] + birds.birdsWidth[0]
    };

    const length = pencils.length;
    for (let i = 0; i < length; i++) {
      const pencil = pencils[i];
      const pencilsBorder = {
        top: pencil.y,
        bottom: pencil.y + pencil.height,
        left: pencil.x,
        right: pencil.x + pencil.width
      };

      // 撞击铅笔判断
      if (Director.isStrike(birdsBorder, pencilsBorder)) {
        this.isGameOver = true;
        return;
      }
    }

    // 加分判断
    if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore) {
      score.isScore = false;
      score.scoreNumber++;
    }
  }


  run() {
    this.check();
    if (!this.isGameOver) {
      this.dataStote.get('background').draw();

      const pencils = this.dataStote.get('pencils');
      if (pencils.length === 4 && pencils[0].x <= -pencils[0].width) {
        pencils.shift();
        pencils.shift();
        this.dataStote.get('score').isScore = true;
      }
      if ((pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2) && pencils.length === 2) {
        this.createPencil();
      }
      this.dataStote.get('pencils').forEach(value => {
        value.draw();
      });

      this.dataStote.get('land').draw();

      this.dataStote.get('score').draw();

      this.dataStote.get('birds').draw();

      this.timer = requestAnimationFrame(() => {
        this.run();
      });
      this.dataStote.put('timer', this.timer);

    } else {
      this.dataStote.get('startButton').draw();
      cancelAnimationFrame(this.dataStote.get('timer'));
      this.dataStote.destroy();
      wx.triggerGC(); // 微信小游戏垃圾回收
    }
  }
}