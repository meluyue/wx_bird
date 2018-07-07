/**
 * author LUYUE
 * description 上半部分铅笔
 * date 2018-5-31
 */
import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";

export class UpPencil extends Pencil {

  constructor(top) {
    const image = Sprite.getImage('pencilUp');
    super(image, top);
  }

  draw() {
    this.y = this.top - this.height;
    super.draw();
  }


}