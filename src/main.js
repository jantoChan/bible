import Vue from 'vue'
import ElementUI  from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

import VueRouter from 'vue-router';
import Home from "./components/exhibition/home/index.vue";
import File from "./components/exhibition/file/index.vue";
import Tag from "./components/exhibition/tag/index.vue";
import About from "./components/exhibition/about/index.vue";

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'home',
      component: Home
    },
    {
      path: '/file',
      name: 'file',
      component: File
    },
    {
      path: '/tag',
      name: 'tag',
      component: Tag
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

var parentml="",
     childhtml="",
     wraphtml="";

var retData=[null,{"menuId":13,"menuURL":"http://192.168.1.66/seller/seller_menu_order","menuName":"交易管理","menuIcon":null,"children":[{"menuId":14,"menuURL":"http://192.168.1.66/seller/seller/order/orders","menuName":"全部订单","menuIcon":"","children":null},{"menuId":15,"menuURL":"http://192.168.1.66/seller/seller/order/productBack","menuName":"退货管理","menuIcon":null,"children":null},{"menuId":16,"menuURL":"http://192.168.1.66/seller/seller/order/productExchange","menuName":"换货管理","menuIcon":null,"children":null},{"menuId":321,"menuURL":"http://192.168.1.66/seller/seller/order/orders/state1","menuName":"未付款订单","menuIcon":"","children":null},{"menuId":322,"menuURL":"http://192.168.1.66/seller/seller/order/orders/state2","menuName":"待确认订单","menuIcon":"","children":null},{"menuId":323,"menuURL":"http://192.168.1.66/seller/seller/order/orders/state3","menuName":"待发货订单","menuIcon":"","children":null},{"menuId":324,"menuURL":"http://192.168.1.66/seller/seller/order/orders/state4","menuName":"已发货订单","menuIcon":"","children":null},{"menuId":325,"menuURL":"http://192.168.1.66/seller/seller/order/orders/state5","menuName":"已完成订单","menuIcon":"","children":null},{"menuId":326,"menuURL":"http://192.168.1.66/seller/seller/order/orders/state6","menuName":"已取消订单","menuIcon":"","children":null},{"menuId":388,"menuURL":"http://192.168.1.66/seller/seller/order/complaint","menuName":"投诉管理","menuIcon":"","children":null}]},{"menuId":17,"menuURL":"http://192.168.1.66/seller/seller_menu_product","menuName":"商品管理","menuIcon":null,"children":[{"menuId":18,"menuURL":"http://192.168.1.66/seller/seller/product/saleAll","menuName":"全部商品","menuIcon":"","children":null},{"menuId":19,"menuURL":"http://192.168.1.66/seller/seller/product/brand","menuName":"品牌管理","menuIcon":"","children":null},{"menuId":20,"menuURL":"http://192.168.1.66/seller/seller/product/sellerCate","menuName":"店铺分类","menuIcon":null,"children":null},{"menuId":21,"menuURL":"http://192.168.1.66/seller/seller/product/chooseCate","menuName":"发布商品","menuIcon":null,"children":null},{"menuId":22,"menuURL":"http://192.168.1.66/seller/seller/product/cate","menuName":"商品分类申请","menuIcon":null,"children":null},{"menuId":167,"menuURL":"http://192.168.1.66/seller/seller/product/waitSale","menuName":"待售商品","menuIcon":"","children":null},{"menuId":168,"menuURL":"http://192.168.1.66/seller/seller/product/onSale","menuName":"在售商品","menuIcon":"","children":null},{"menuId":169,"menuURL":"http://192.168.1.66/seller/seller/product/delSale","menuName":"已删除商品","menuIcon":"","children":null},{"menuId":311,"menuURL":"http://192.168.1.66/seller/seller/product/manager","menuName":"已申请分类","menuIcon":"","children":null}]},{"menuId":23,"menuURL":"http://192.168.1.66/seller/seller_menu_operate","menuName":"运营管理","menuIcon":null,"children":[{"menuId":24,"menuURL":"http://192.168.1.66/seller/seller/operate/sellerqq","menuName":"客服QQ设置","menuIcon":null,"children":null},{"menuId":26,"menuURL":"http://192.168.1.66/seller/seller/operate/sellerTransport","menuName":"运费设置","menuIcon":null,"children":null},{"menuId":675,"menuURL":"http://192.168.1.66/seller/seller/systemNotice","menuName":"系统公告","menuIcon":null,"children":null}]},{"menuId":348,"menuURL":"http://192.168.1.66/seller/seller_menu_settlement","menuName":"统计结算","menuIcon":"","children":[{"menuId":349,"menuURL":"http://192.168.1.66/seller/seller/settlement","menuName":"结算管理","menuIcon":"","children":null},{"menuId":366,"menuURL":"http://192.168.1.66/seller/seller/report/orderday","menuName":"每日订单统计","menuIcon":"","children":null},{"menuId":367,"menuURL":"http://192.168.1.66/seller/seller/report/productday","menuName":"每日商品统计","menuIcon":"","children":null},{"menuId":548,"menuURL":"http://192.168.1.66/seller/seller/report/orders/orderOverview","menuName":"订单概况","menuIcon":null,"children":null},{"menuId":549,"menuURL":"http://192.168.1.66/seller/seller/report/orders/saleOverview","menuName":"订单销量统计","menuIcon":null,"children":null},{"menuId":550,"menuURL":"http://192.168.1.66/seller/seller/report/product/phurchaseRate","menuName":"购买率统计","menuIcon":null,"children":null},{"menuId":551,"menuURL":"http://192.168.1.66/seller/seller/report/orders/goodsReturnRate","menuName":"退货率统计","menuIcon":null,"children":null},{"menuId":552,"menuURL":"http://192.168.1.66/seller/seller/report/orders/CPIstatistics","menuName":"人均消费统计","menuIcon":null,"children":null},{"menuId":553,"menuURL":"http://192.168.1.66/seller/seller/report/product/productSale","menuName":"商品销量统计","menuIcon":null,"children":null}]},{"menuId":360,"menuURL":"http://192.168.1.66/seller/seller_menu_member","menuName":"会员管理","menuIcon":"","children":[{"menuId":361,"menuURL":"http://192.168.1.66/seller/seller/member/productask","menuName":"会员咨询管理","menuIcon":"","children":null},{"menuId":362,"menuURL":"http://192.168.1.66/seller/seller/member/productcomments","menuName":"会员评价管理","menuIcon":"","children":null}]},{"menuId":371,"menuURL":"http://192.168.1.66/seller/seller_menu_system","menuName":"系统管理","menuIcon":"","children":[{"menuId":372,"menuURL":"http://192.168.1.66/seller/seller/system/role","menuName":"角色管理","menuIcon":"","children":null},{"menuId":377,"menuURL":"http://192.168.1.66/seller/seller/system/sellerUser","menuName":"管理员管理","menuIcon":"","children":null},{"menuId":400,"menuURL":"http://192.168.1.66/seller/seller/system/sellerUser/editpwd","menuName":"修改密码","menuIcon":"","children":null}]},{"menuId":420,"menuURL":"http://192.168.1.66/seller/seller_menu_mobile","menuName":"移动端管理","menuIcon":"","children":[{"menuId":421,"menuURL":"http://192.168.1.66/seller/seller/mindex/banner","menuName":"首页轮播图","menuIcon":"","children":null},{"menuId":425,"menuURL":"http://192.168.1.66/seller/seller/mindex/floor","menuName":"移动端首页楼层","menuIcon":"","children":null},{"menuId":429,"menuURL":"http://192.168.1.66/seller/seller/mindex/floordata","menuName":"楼层数据","menuIcon":"","children":null}]},{"menuId":485,"menuURL":"http://192.168.1.66/seller/seller_menu_pcindex","menuName":"PC端首页管理","menuIcon":"","children":[{"menuId":486,"menuURL":"http://192.168.1.66/seller/seller/pcindex/sellerinfo","menuName":"PC端首页信息","menuIcon":"","children":null},{"menuId":487,"menuURL":"http://192.168.1.66/seller/seller/pcindex/banner","menuName":"PC首页轮播图","menuIcon":"","children":null},{"menuId":494,"menuURL":"http://192.168.1.66/seller/seller/pcindex/recommend","menuName":"PC推荐类型","menuIcon":"","children":null},{"menuId":501,"menuURL":"http://192.168.1.66/seller/seller/pcindex/recommenddata","menuName":"PC推荐类型数据","menuIcon":"","children":null}]}];
for(var i=0; i < retData.length; i++){
  var cur=retData[i];
  if (i<1) continue;

  for(var j=0; j<cur['children'].length; j++){
    var item=cur['children'][j];
    childhtml+='<li><a href="'+item['menuURL']+'"> <span class="menu-text">'+item['menuName']+'</span></a></li>';
  }
  wraphtml='<ul class="submenu ejava-submenu navtree">'+childhtml+'</ul>';
  parentml+='<li><a href="javascript:;" class="menu-dropdown"><span class="menu-text"> '+ cur['menuName'] +'</span> <i class="menu-expand"></i></a>'+wraphtml+'</li>';
  childhtml='';
};
var dom=document.getElementById('test');
dom.innerHTML=parentml;
console.log(parentml);

