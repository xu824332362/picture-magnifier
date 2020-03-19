# picture-magnifier
淘宝/京东查看大图,适用vue

## 效果图
![效果图](https://github.com/xu824332362/picture-magnifier/blob/master/Snipaste_2020-03-18_13-50-03.png)

## 使用说明
[直接下载](https://github.com/xu824332362/picture-magnifier/blob/master/picture-magnifier.js)到本地项目目录

### 使用import引入
import {pictureMagnifier} from './path'

使用示例
```
import {pictureMagnifier} from '~/plugins/picture-magnifier'
  export default {
    name: "picture-viewer",
    props: {
      pictures: Array,
    },
    data() {
      return {
        activeImg: this.pictures[0]
      }
    },
    methods: {
      handleTouchOn(e){
        pictureMagnifier.handleTouch(e)
      },
      getImgUrl(src) {
        this.activeImg = src;
      },
    },
    destroyed() {
      const magnifier = document.body.querySelector('#XKC__picture-magnifier');
      if(magnifier){
        document.body.removeChild(magnifier);
      }
    }
  }
```
### 使用时绑定dom的mouseenter事件
```
<div class="picture-viewer">
    <div class="picture-viewer_wrapper" @mouseenter.self="handleTouchOn">
      <span style="display: table;text-align: center;width: 350px;height: 350px;">
        <span style="display: table-cell;vertical-align: middle">
            <img style="max-width: 350px;max-height: 350px;display: inline-block" v-lazy="activeImg" alt="">
        </span>
      </span>
    </div>
    <ul class="picture-viewer_slick">
      <li v-for="(item,index) in pictures" :key="index" @click="getImgUrl(item)" :class="{'slick-active':activeImg === item}">
          <span style="display: table;text-align: center;width: 100%;height: 100%;">
            <span style="display: table-cell;vertical-align: middle">
                <img style="max-width: 50px;max-height: 50px;display: inline-block" v-lazy="item" alt="">
            </span>
          </span>
      </li>
    </ul>
  </div>
  ```

## 注意事项
在单页面应用调用时，注意在destroyed事件内销毁已有`#XKC__picture-magnifier`
