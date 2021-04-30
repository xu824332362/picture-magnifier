# picture-magnifier
实现图片放大镜效果，适用vue；

A picture magnifier component for Vue；

## Result
![Snipaste_2021-04-24_10-52-56.png](https://i.loli.net/2021/04/24/SBHdfAbPKxUqIZR.png)

## Install
```npm install xkc-pig-mag --save-dev```

## Quick Start
### Example
```javascript
import Vue from 'vue'
import XCKPicMag from 'xkc-pic-mag'

Vue.component(XCKPigMag.name, XCKPigMag)
```
### Props
```javascript
/**
* 图片路径/Image path
* originImgSrc 没传默认放大 imgSrc
* When 'originImgsrc' is unavailable, Be used 'imgSrc' by default
* @type {String}
*/
imgSrc: {
	type: String,
	default: null
}

/**
* 原始图片路径/Origin image path
* @type {String}
*/
originImgSrc: {
	type: String,
	default: ''
}

/**
* 放大器距离左边的距离/Magnifier offset left distance
* @type {Number}
*/
offsetLeft: {
	type: Number,
	default: 20
}

/**
* 图片容器宽度/Wrapper width 
* @type {String}
*/
width: {
	type: String,
	default: '100%'
}

/**
* 图片容器高度/Wrapper width 
* @type {String}
*/
height: {
	type: String,
	default: '350px'
}
```

