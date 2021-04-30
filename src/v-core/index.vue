<template>
  <div class="__picture-magnifier"
       style="overflow: hidden;position: relative;"
       :style="{width,height}"
       @mouseenter.self="handleTouchOn">
    <span style="display: table;text-align: center;" :style="{width,height}">
      <span style="display: table-cell;vertical-align: middle">
          <img style="display: inline-block"
               :style="{maxWidth: width,maxHeight: height}"
               :src="imgSrc"
               alt="">
      </span>
    </span>
  </div>
</template>

<script>
import {pictureMagnifier} from '../core/picture-magnifier'
export default {
  name: "XCKPicMag",
  props:{
    imgSrc: String,
    originImgSrc: {
      type: String,
      default: ''
    },
    offsetLeft: {
      type: Number,
      default: 20
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    }
  },
  data() {
    return {
      loaded: false
    }
  },
  methods: {
    handleTouchOn(e){
      if(!this.loaded){
        return
      }
      pictureMagnifier.handleTouch(e, this.offsetLeft, this.originImgSrc,);
    }
  },
  created() {
    if(!this.imgSrc){
      throw 'Prop imgSrc is necessary!'
    }else{
      let img = new Image();
      img.src = this.imgSrc;
      img.onload = ()=>{
        this.loaded = true;
        img = null;
      };
    }
  },
  beforeDestroy() {
    /*销毁实例*/
    const magnifier = document.body.querySelector('#XKC__picture-magnifier');
    if(magnifier){
      document.body.removeChild(magnifier);
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>