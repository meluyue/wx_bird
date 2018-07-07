/**
 * author LUYUE
 * description 铅笔类
 * date 2018-5-31
 */
import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Pencil extends Sprite {

  constructor(image, top) {
    super(image,
      0, 0,
      image.width, image.height,
      DataStore.getInstance().canvas.width, 0,
      image.width, image.height);

    this.top = top;
    this.moveSpeed = 2;
  }

  draw() {
    this.x = this.x - this.moveSpeed;
    super.draw(this.img,
      0, 0,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height
    )

  }
}