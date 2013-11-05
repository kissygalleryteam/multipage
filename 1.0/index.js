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
			return this;
		},

		// 根据totalpage计算
		getTotalSuperPage : function () {
			var totalSuperPage;
			var totalPage = this.get('totalPage') , superPageSize = this.get('superPageSize');
			totalSuperPage = Math.ceil(totalPage / superPageSize);

			return totalSuperPage;
		},

		// 代理事件
		bindEvent : function () {
			var wrap = $(this.get('wrap')) , selectPage = this.get('selectPage');			
			wrap.delegate('click' , '.ks-w-prev' , this.prev).delegate('click' , '.ks-w-next' , this.next);
			selectPage.on('change' , this.select);
		},

		// 点击上一页按钮
		prev : function (e) {
			alert($(e.currentTarget).html())	   
		},
		
		// 点击下一页按钮
		next : function (e) {
			alert($(e.currentTarget).html())	   
		},

		// 选择分页
		select : function (e) {
			alert($(e.currentTarget).val())
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



