// index/list.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    tabTxt: ['品种', '味道', '收藏数'],//分类
    tab: [true, true, true],
    pinzhongList: [{ 'id': '1', 'title': '荤菜' }, { 'id': '1', 'title': '素菜' }],
    pinzhong_id: 0,//品种
    pinzhong_txt: '',
    weidao_id: 0,//味道
    weidao_txt: '',
    shoucangshu_id: 0,//收藏数
    shoucangshu_txt: '',
    dataList:[
      {
        goods_id:1,
        goods_title:'商品标题1',
        goods_img:'../../images/mianshi.jpg',
        goods_shoucangshu:'0',
        goods_pinzhong:'荤菜',
        goods_weidao:'甜'
      },{
        goods_id:1,
        goods_title:'商品标题2',
        goods_img:'../../images/chuangyicai.jpg',
        goods_shoucangshu:'0',
        goods_pinzhong:'荤菜',
        goods_weidao:'甜'
      }, {
        goods_id: 1,
        goods_title: '商品标题3',
        goods_img: '../../images/hongbei.jpg',
        goods_shoucangshu: '0',
        goods_pinzhong:'荤菜',
        goods_weidao:'甜'
      }, {
        goods_id: 1,
        goods_title: '商品标题4',
        goods_img: '../../images/hongbei.jpg',
        goods_shoucangshu: '0',
        goods_pinzhong:'荤菜',
        goods_weidao:'甜'
      }, {
        goods_id: 1,
        goods_title: '商品标题5',
        goods_img: '../../images/hongbei.jpg',
        goods_shoucangshu: '0',
        goods_pinzhong:'荤菜',
        goods_weidao:'甜'
      }
    ],
  },
 
  // 选项卡
  filterTab: function (e) {
    var data = [true, true, true], index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },
 
  //筛选项点击操作
  filter: function (e) {
    var self = this, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt, tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          pinzhong_id: id,
          pinzhong_txt: txt
        });
        break;
      case '1':
        tabTxt[1] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          weidao_id: id,
          weidao_txt: txt
        });
        break;
      case '2':
        tabTxt[2] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          shoucangshu_id: id,
          shoucangshu_txt: txt
        });
        break;
    }
    //数据筛选
    self.getDataList();
  },
 
  //加载数据
  getDataList:function(){
    //调用数据接口，获取数据
 
    
  }
 
})