## 综述

multipage是多层次分页组件，上拉加载page，点击分页按钮加载SuperPage。

* 版本：1.0
* 作者：栋寒
* 标签：分页
* demo：[http://gallery.kissyui.com/multipage/1.0/demo/index.html](http://gallery.kissyui.com/multipage/1.0/demo/index.html)

## 初始化组件

    var multipage1 = new Multipage({
		wrap : '#ks-w-multipage1',
		superPageSize : 4,
		totalPage : 100
	});
	multipage1.setPageIndex(4);
	multipage1.on('goToSuperPage' , function (e) {
		alert('前往子分页:' + e.pageIndex);
	});
	multipage1.on('nextSuperPage' , function (e) {
		alert('前往子分页:' + e.pageIndex);
	});
	multipage1.on('prevSuperPage' , function (e) {
		alert('前往子分页:' + e.pageIndex);
	});

## 参数配置

#### wrap

* wrap {string} 
* dom选择器
* 可选，默认值"#ks-w-multipage"

#### superPageSize

* superPageSize {number}
* super分页包含的子分页数
* 可选，默认值为3

#### totalPage

* totalPage {number}
* 子分页总数
* 必选

## 方法

#### showPage
* 描述：显示分页组件

#### hidePage
* 描述：隐藏分页组件

#### btnStatus
* 描述：自动判断并执行显示、隐藏“上一页”“下一页”按钮，判断条件为superPapeIndex

#### next
* 描述：前往下一页

#### prev
* 描述：前往上一页

#### setPageIndex
* 描述：用户拉取分页数据时，需要动态设置组件的pageIndex，确保在适当时候显示或隐藏组件，比如当子分页数达到superPageSize时，需显示；反之则隐藏
* 参数：number


#### pageStatus
* 描述：自动判断是否显示分页组件
* return：boolean

## 事件

#### prevSuperPage
* des ： 点击上一页时触发，
* param：data {object}  ，如：{ pageIndex : ’number’ }


#### nextSuperPage
* des ： 点击下一页时触发，
* param：data {object}  ，如：{ pageIndex : ’number’ }

#### goToSuperPage
* des ： 选择进入某一页时触发
* param：data {object}  ，如：{ pageIndex : ’number’ }

