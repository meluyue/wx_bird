/**
 * author LUYUE
 * description 加载图片资源文件，确保canvas在图片加载完成后才进行渲染
 * date 2018-5-31
 */
import {Resources} from "./Resources.js";

export class ResourceLoader {

  constructor() {
    this.map = new Map(Resources);

    for (let [key, value] of this.map) {
      const image = wx.createImage();
      image.src = value;
      this.map.set(key, image)
    }
  }

  onLoaded(cb) {
    let loadCount = 0;
    for (let value of this.map.values()) {
      value.onload = () => {
        loadCount++;
        if (loadCount >= this.map.size) {
          cb(this.map);
        }
      }
    }
  }

  static create() {
    return new ResourceLoader();
  }

}