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
    S.extend(Multipage, Base, /** @lends Multipage.prototype*/{

    }, {ATTRS : /** @lends Multipage*/{

    }});
    return Multipage;
}, {requires:['node', 'base']});



