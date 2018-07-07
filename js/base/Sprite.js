/**
 * author LUYUE
 * description 图片资源，初始图片资源的大小及位置
 * date 2018-5-31
 */
import {DataStore} from "./DataStore.js";

export class Sprite {

  constructor(img = null,
              srcX = 0, srcY = 0,
              srcW = 0, srcH = 0,
              x = 0, y = 0,
              width = 0, height = 0) {
    this.dataStore = DataStore.getInstance();
    this.ctx = this.dataStore.ctx;
    this.img = img;
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcW = srcW;
    this.srcH = srcH;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * img 传入的Image
   * srcX 剪裁起始位置X
   * srcY 剪裁起始位置Y
   * srcH 剪裁的高度
   * srcW 剪裁的宽度
   * x 放置的X坐标
   * y 放置的Y坐标
   * height 使用的宽度
   * width 使用的高度
   */

  draw(img = this.img,
       srcX = this.srcX,
       srcY = this.srcY,
       srcW = this.srcW,
       srcH = this.srcH,
       x = this.x,
       y = this.y,
       width = this.width,
       height = this.height) {
    this.ctx.drawImage(
      img,
      srcX,
      srcY,
      srcW,
      srcH,
      x,
      y,
      width,
      height
    )
  }

  static getImage(key) {
    return DataStore.getInstance().res.get(key);
  }

}
