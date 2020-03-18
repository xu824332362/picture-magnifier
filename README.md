# picture-magnifier
淘宝/京东查看大图,适用vue

## 效果图
![效果图](https://github.com/xu824332362/picture-magnifier/blob/master/Snipaste_2020-03-18_13-50-03.png)

## 使用说明
[直接下载](https://github.com/xu824332362/picture-magnifier/blob/master/picture-magnifier.js)到本地项目目录

### 使用import引入
import {pictureMagnifier} from './path'

使用示例
![使用实例](https://github.com/xu824332362/picture-magnifier/blob/master/Snipaste_2020-03-18_14-02-17.png)

使用时绑定dom的mouseenter事件
![使用示例](https://github.com/xu824332362/picture-magnifier/blob/master/Snipaste_2020-03-18_14-00-42.png)

## 注意事项
在单页面应用调用时，注意在destroyed事件内销毁已有`#XKC__picture-magnifier`
