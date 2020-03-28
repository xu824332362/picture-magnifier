export const pictureMagnifier = {
  /*
  * target {Node} 初始化事件绑定节点
  * parentWidth {Number} 选中图片容器的宽
  * parentHeight {Number} 选中图片容器的高
  * bigImg {Node} 大图
  * bigImgSrc {String} 指定大图路径，不传时取小图的路径后原始(natural)图大小显示
  * insideImg {Node} 当前选中的图片
  * insideImgWidth {Number} 当前选中图片width
  * insideImgHeight {Number} 当前选中图片的height
  * cursor {Node} 光标选择框
  * cursorWidth {Number} 光标选择框宽
  * cursorHeight {Number} 光标选择框高
  * cursorScale {Number} 光标选择框大小增加比例，比如宽较小时，将宽*2
  * magnifier {Node} 右侧放大效果容器
  * offsetLeft {Number} 右侧放大器容器与左侧选择图片容器的距离，不传时默认为 20，
  * widthPercentage {Float} 已选择图片与原始图片宽的比例
  * heightPercentage {Float} 已选择图片与原始图片高的比例
  * WHScale {Float} 大图的宽高比,用来判断是否要增加容器大小
  * standardWScale {Float} 超出当前图片“宽”比例时，增加容器大小
  * standardHScale {Float} 超出当前图片“高”比例时，增加容器大小
  * hasCursor {Boolean} (cursor {Node})是否已存在
  * hasMagnifier {Boolean} (magnifier {Node})是否已存在
  * */
  target: null,
  parentWidth: 0,
  parentHeight: 0,
  bigImg: null,
  bigImgSrc: '',
  insideImg: null,
  insideImgWidth: 0,
  insideImgHeight: 0,
  cursor: null,
  cursorWidth: 0,
  cursorHeight: 0,
  cursorTop: 0,
  cursorLeft: 0,
  cursorScale: 2,
  magnifier: null,
  offsetLeft: 0,
  widthPercentage: 0,
  heightPercentage: 0,
  WHScale: 0,
  standardWScale: 0.7,
  standardHScale: 1.5,
  hasCursor: false,
  hasMagnifier: false,
  showMagnifier: false,
  handleTouch: function (ev, offsetLeft, bigImgSrc) {
    /*
    * 执行时，绑定对象target需要有position: relative或者position: absolute属性存在，没有需要手动加上
    * */
    this.target = ev.target;
    const {clientWidth, clientHeight} = ev.target;
    this.parentWidth = clientWidth;
    this.parentHeight = clientHeight;

    this.insideImg = ev.target.querySelector('img');
    this.insideImgWidth = this.insideImg.width;
    this.insideImgHeight = this.insideImg.height;


    this.bigImgSrc = bigImgSrc || this.insideImg.src;
    this.offsetLeft = offsetLeft || 20;
    this.hasCursor = !!ev.target.querySelector('#XKC__picture-magnifier__cursor');
    this.hasMagnifier = !!document.body.querySelector('#XKC__picture-magnifier');
    this.showMagnifier = this.insideImg.naturalWidth > this.parentWidth && this.insideImg.naturalHeight > this.parentHeight;

    if (!this.hasCursor) {
      this.createCursor({ev})
    } else {
      this.updateCursor({ev}, () => {
        this.updateMagnifier()
      })
    }
    /*
    //IE10不支持MutationObserver
    let observer = new MutationObserver((changeList,instance) => {
      console.log(changeList,instance)
    });
    observer.observe(document.body,{
      'childList': true
    })
    */
  },
  createCursor: function ({ev}) {
    this.cursor = document.createElement('div');
    this.cursor.setAttribute('id', 'XKC__picture-magnifier__cursor');
    this.bigImg = document.createElement('img');
    this.updateCursor({ev}, () => {
      this.target.appendChild(this.cursor);

      if (!this.hasMagnifier) {
        this.createMagnifier();
      }

      this.target.addEventListener('mousemove', (ev) => {
        /*光标超出自定义cursor时复位*/
        if (ev.target.tagName === 'IMG' && this.showMagnifier) {
          this.cursor.style.display = 'block';
          if (this.magnifier) {
            this.magnifier.style.display = 'block';
          }
          const {layerX: cursorX, layerY: cursorY} = ev;
          this.cursor.style.left = (-(this.cursorWidth / 2)) + (cursorX) + 'px';
          this.cursor.style.top = (-(this.cursorHeight / 2)) + (cursorY) + 'px';
        }

      }, false);

      this.target.addEventListener('mouseout', (ev) => {
        this.cursor.style.display = 'none';
        if (this.magnifier) {
          this.magnifier.style.display = 'none';
        }
      }, false);

      this.cursor.addEventListener('mouseenter', (ev) => {
        if (this.showMagnifier) {
          this.cursor.style.display = 'block';
          if (this.magnifier) {
            this.magnifier.style.display = 'block';
          }
        }
      }, false);

      this.cursor.addEventListener('mousemove', (ev) => {
        this.moveCursor({ev})
      }, false);

    });

  },
  updateCursor: function ({ev}, callback) {
    this.bigImg.src = this.bigImgSrc;
    this.bigImg.onload = () => {
      const {offsetX: cursorX, offsetY: cursorY} = ev;
      /*
       * target相对原始图片大小百分比
       * */
      const {naturalWidth: imgWidth, naturalHeight: imgHeight} = this.bigImg;
      this.widthPercentage = this.insideImgWidth / imgWidth;
      this.heightPercentage = this.insideImgHeight / imgHeight;
      this.WHScale = imgWidth / imgHeight;
      /*
      * WHScale大于1 横长方形
      * WHScale小于1 竖-----
      * */
      this.cursorWidth = (this.widthPercentage * this.insideImgWidth) * this.WHScale;
      this.cursorHeight = (this.heightPercentage * this.insideImgHeight) / this.WHScale;

      if (this.WHScale >= this.standardHScale) {
        this.cursorHeight = ((this.heightPercentage * this.insideImgHeight) / this.WHScale) * this.cursorScale;
      } else if (this.WHScale <= this.standardWScale) {
        this.cursorWidth = ((this.widthPercentage * this.insideImgWidth) * this.WHScale) * this.cursorScale;
      }

      this.cursorTop = (cursorX - (this.cursorWidth / 2));
      this.cursorLeft = (cursorY - (this.cursorHeight / 2));

      const style = {
        "width": this.cursorWidth + 'px',
        "height": this.cursorHeight + 'px',
        "position": 'absolute',
        "left": this.cursorTop + 'px',
        "top": this.cursorLeft + 'px',
        "cursor": "move",
        "background": 'rgba(64,158,255,0.42)'
      };
      for (let i in style) {
        this.cursor.style[i] = style[i]
      }
      if (callback && callback instanceof Function) {
        callback()
      }
    }
  },
  moveCursor: function ({ev}) {
    const {offsetX: cursorX, offsetY: cursorY} = ev;
    const {offsetTop, offsetLeft} = ev.target;
    const centerPointX = this.cursorWidth / 2;
    const centerPointY = this.cursorHeight / 2;
    const moveX = cursorX - centerPointX;
    const moveY = cursorY - centerPointY;
    /*左右上下各剩余未填充距离*/
    const RLMargin = (this.parentWidth - this.insideImgWidth) / 2;
    const TBMargin = (this.parentHeight - this.insideImgHeight) / 2;
    this.calculateBoundary('left', RLMargin > 0 ? RLMargin : 0, this.insideImgWidth, this.cursorWidth, offsetLeft, moveX, cursorX);
    this.calculateBoundary('top', TBMargin > 0 ? TBMargin : 0, this.insideImgHeight, this.cursorHeight, offsetTop, moveY, cursorY);
    this.moveMagnifierImg(offsetTop, offsetLeft, RLMargin, TBMargin);
    ev.stopPropagation();
  },
  /*
  * 计算cursor移动边界
  * @params
  * dom {node}
  * type {String} 计算位移类型
  * margin {Number} 图片未填充满容器时，剩余边距
  * insideImgVal {Number} 图片大小
  * cursorVal {Number} 自定义cursor大小
  * offset {Number} 自定义cursor位置
  * move {Number} 自定义cursor移动数量
  * */
  calculateBoundary: function (type, margin, insideImgVal, cursorVal, offset, move) {
    if (parseFloat(this.cursor.style[type]) <= Math.floor(margin) && move <= 0.1) {
      /*移动到图片的x,y轴原点*/
      return
    }
    if (parseFloat(this.cursor.style[type]) >= (insideImgVal + margin - cursorVal) && move >= 0.1) {
      /*移动到图片的x,y最大值*/
      return
    }
    this.cursor.style[type] = offset + move + 'px';
  },
  /*生成右侧大图容器*/
  createMagnifier: function () {
    this.magnifier = document.createElement('div');
    this.magnifier.setAttribute('id', 'XKC__picture-magnifier');
    this.updateMagnifier(() => {
      this.magnifier.appendChild(this.bigImg);
      document.body.appendChild(this.magnifier);
    })
  },
  updateMagnifier: function (callback) {
    const {top: parentRelativeTop, left: parentRelativeLeft} = this.target.getBoundingClientRect();
    const absoluteTop = parentRelativeTop + document.documentElement.scrollTop;
    /*向右偏以{offsetLeft}*/
    const absoluteLeft = (parentRelativeLeft + this.parentWidth + this.offsetLeft) + document.documentElement.scrollLeft;
    let width = (this.insideImgWidth * this.WHScale);
    let height = (this.insideImgHeight / this.WHScale);
    if (this.WHScale >= this.standardHScale) {
      height = (this.insideImgHeight / this.WHScale) * this.cursorScale;
    } else if (this.WHScale <= this.standardWScale) {
      width = (this.insideImgWidth * this.WHScale) * this.cursorScale;
    }
    const style = {
      "width": width + 'px',
      "height": height + 'px',
      "position": 'absolute',
      "top": absoluteTop + 'px',
      "left": (absoluteLeft) + 'px',
      "z-index": 9999,
      "overflow": "hidden",
    };
    for (let i in style) {
      this.magnifier.style[i] = style[i];
    }

    const bigImgStyle = {
      "position": "absolute",
      "top": '0px',
      "left": '0px',
    };
    for (let i in bigImgStyle) {
      this.bigImg.style[i] = bigImgStyle[i];
    }

    if (callback && callback instanceof Function) {
      callback()
    }
  },
  moveMagnifierImg: function (top, left, lessRL, lessTB) {
    const x = Math.ceil(left - lessRL + this.cursorWidth);
    const y = Math.ceil(top - lessTB + this.cursorHeight);
    const xMovePercent = x / this.insideImgWidth;
    const yMovePercent = y / this.insideImgHeight;
    const widthMul = this.bigImg.width / this.insideImgWidth;
    const heightMul = this.bigImg.height / this.insideImgHeight;
    this.bigImg.style.left = -(this.bigImg.width * xMovePercent - Math.ceil(this.cursorWidth * widthMul)) + 'px';
    this.bigImg.style.top = -(this.bigImg.height * yMovePercent - Math.ceil(this.cursorHeight * heightMul)) + 'px';
  }
};
