/**
 * author LUYUE
 * description 移动的陆地
 * date 2018-5-31
 */
import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";
import {DataStore} from "../base/DataStore.js";

export class Land extends Sprite {
  constructor() {
    let image = Sprite.getImage('land');
    super(image,
      0, 0,
      image.width, image.height,
      0, DataStore.getInstance().canvas.height - image.height,
      image.width, image.height);

    // 水平变化坐标轴
    this.landX = 0;
    // 移动速度
    this.landSpeed = Director.getInstance().moveSpeed;
  }

  draw() {
    this.landX = this.landX + this.landSpeed;
    if (this.landX + DataStore.getInstance().canvas.width >= this.img.width) {
      this.landX = 0;
    }
    super.draw(this.img,
      this.srcX,
      this.srcY,
      this.srcW,
      this.srcH,
      -this.landX,
      this.y,
      this.width,
      this.height)
  }
}