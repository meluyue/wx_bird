/**
 * author LUYUE
 * description 初始化整个游戏精灵，作为游戏的开始
 * date 2018-5-31
 */
import {ResourceLoader} from './js/base/ResourceLoader.js';
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
  constructor() {
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance();
    const loader = ResourceLoader.create();
    loader.onLoaded(map => this.onResourceFirstLoaded(map));
  }

  createBackgroundMusic() {
    const bgm= wx.createInnerAudioContext();
    bgm.autoplay=false;
    bgm.loop=true;
    bgm.src='audio/bgm.mp3';
  }

  onResourceFirstLoaded(map) {
    this.dataStore.canvas = this.canvas;
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    this.createBackgroundMusic();
    this.init();
  }

  init() {
    // 控制游戏是否结束
    this.director.isGameOver = false;

    this.dataStore
      .put('background', BackGround)
      .put('pencils', [])
      .put('land', Land)
      .put('birds', Birds)
      .put('score', Score)
      .put('startButton', StartButton);

    this.registerEvent();
    this.director.createPencil();
    this.director.run();
  }


  registerEvent() {
    wx.onTouchStart(e => {
      if (this.director.isGameOver) {
        console.log('游戏开始');
        this.init();
      } else {
        this.director.birdsEvent();
      }
    })
  }
}