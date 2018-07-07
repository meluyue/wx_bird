/**
 * author LUYUE
 * description 积分器类
 * date 2018-5-31
 */
import {DataStore} from "../base/DataStore.js";

export class Score {

  constructor(){
   this.ctx=DataStore.getInstance().ctx;
   this.scoreNumber=0;
    this.isScore=true; // 控制是否加分，因为canvas刷新很快，防止多次加分
  }

  draw(){
    this.ctx.font='25px Arial';
    this.ctx.fillStyle='#fcf';
    this.ctx.fillText(
      this.scoreNumber,
      DataStore.getInstance().canvas.width/2,
      DataStore.getInstance().canvas.height/8,
      1000
    )
  }

}