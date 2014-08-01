/**
 * @fileoverview 
 * @author 栋寒<donghan@taobao.com>
 * @module multipage
 **/
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 
     * @class Multipage
     * @constructor
     * @extends Base
     */
    function Multipage(comConfig) {
        var self = this;
        //调用父类构造函数
        Multipage.superclass.constructor.call(self, comConfig);
    }

    S.extend(Multipage , Base , {

		initializer : function () {
			this.buildDom().bindEvent();
		},
		
		// 构建分页dom结构
		buildDom : function () {
			var totalSuperPage = this.getTotalSuperPage();
			var optionArr = [] , domStr = '';
			for (var i = 1 ; i <= totalSuperPage ; i++) {
				optionArr.push('<option value="' + i + '">' + i + '/' + totalSuperPage + '</option>');
			}
			this.set('prevBtn' , $('<span class="ks-w-prev">上一页</span>'));
			this.set('nextBtn' , $('<span class="ks-w-next">下一页</span>'));
			this.set('selectPage' , $('<select class="ks-page-index">' + optionArr.join('') + '</select>'));

			$(this.get('wrap')).append(this.get('prevBtn')).append(this.get('selectPage')).append(this.get('nextBtn'));

			this.pageStatus();
			this.btnStatus();
			this.selectHandle();
			return this;
		},
		
		// 操作下拉框选中状态
		selectHandle : function () {
			var superPageIndex = this.get('superPageIndex');
			this.get('selectPage').val(superPageIndex);
		},

		// 根据totalpage计算
		getTotalSuperPage : function () {
			var totalSuperPage;
			var totalPage = this.get('totalPage') , superPageSize = this.get('superPageSize');
			totalSuperPage = Math.ceil(totalPage / superPageSize);

			return totalSuperPage;
		},

		// 绑定事件
		bindEvent : function () {
			var self =this;
			var wrap = $(this.get('wrap')) , selectPage = this.get('selectPage');			
			wrap.delegate('click' , '.ks-w-prev' , function (e) {
				if (!$(e.currentTarget).hasClass('disable')) {
					self.prev.call(self , e);
				}
			}).delegate('click' , '.ks-w-next' , function (e) {
				if (!$(e.currentTarget).hasClass('disable')) {
					self.next.call(self , e);
				}
			});
			selectPage.on('change' , function (e) {
				self.select.call(self , e);
			});

			this.on('afterPageIndexChange' , function (e) {
				var index = e.newVal;
				self.pageStatus();
				self.selectHandle();
				self.btnStatus();	
			}).on('afterSuperPageIndexChange' , function (e) {
				self.selectHandle();
				self.btnStatus();	
			});

		},

		// 点击上一页按钮
		prev : function (e) {
			var superPageIndex = this.get('superPageIndex');
			var superPageSize = this.get('superPageSize');
			this.set('superPageIndex' , superPageIndex - 1);
			this.fire('prevSuperPage' , {
				pageIndex : (superPageIndex  - 2) * superPageSize + 1	
			});
		},
		
		// 点击下一页按钮
		next : function (e) {
			var superPageIndex = this.get('superPageIndex');
			var superPageSize = this.get('superPageSize');
			this.set('superPageIndex' , superPageIndex + 1);
			this.fire('goToSuperPage' , {
				pageIndex : superPageIndex * superPageSize + 1	
			});
		},

		// 选择分页
		select : function (e) {
			var superPageIndex = this.get('superPageIndex');
			var superPageSize = this.get('superPageSize');
			var val = Number($(e.currentTarget).val());
			this.set('superPageIndex' , val);

			this.fire('goToSuperPage' , {
				pageIndex : (val - 1) * superPageSize + 1	
			});
		},
		
		// 自动判断是否显示分页组件
		pageStatus : function () {
			var pageIndex = this.get('pageIndex');	
			var superPageSize = this.get('superPageSize');
			if (pageIndex % superPageSize === 0) {
				this.showPage();	
			} else {
				this.hidePage();	
			}
		},

		// 自动判断并执行显示、隐藏“上一页”“下一页”按钮
		btnStatus : function () {
			var superPageIndex = this.get('superPageIndex');
			var totalSuperPage = this.getTotalSuperPage();
			
			var nextBtn = this.get('nextBtn') , prevBtn = this.get('prevBtn');

			if (totalSuperPage === 1) {
				prevBtn.addClass('disable');
				nextBtn.addClass('disable');
			}

			// 末页
			if (superPageIndex === totalSuperPage) {
				prevBtn.removeClass('disable');
				nextBtn.addClass('disable');
			} else if (superPageIndex === 1) {
				// 首页	
				prevBtn.addClass('disable');
				nextBtn.removeClass('disable');
			} else {
				prevBtn.removeClass('disable');	
				nextBtn.removeClass('disable');	
			}
		},
		
		// 设置super分页的子分页索引
		setPageIndex : function (number) {
			var superPageSize = this.get('superPageSize');
			this.set('pageIndex' , number);
			this.set('superPageIndex' , Math.floor(number / superPageSize));
		},
		
		// 显示分页
		showPage : function () {
			var page = $(this.get('wrap'));
			page.removeClass('hidden');
		},
		
		// 隐藏分页
		hidePage : function () {
			var page = $(this.get('wrap'));
			page.addClass('hidden');
		}

    } , {
		ATTRS : {
			wrap : {
				value : '#ks-w-multipage'
			},
			superPageSize : {
				value : 3				
			},
			totalPage : {
				value : 1			
			},
			pageIndex : {
				value : 1			
			},
			superPageIndex : {
				value : 1				 
			}
		}
	});

    return Multipage;

} , {
	requires : [
		'node', 
		'rich-base'
	]
});



