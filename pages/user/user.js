// mine.js

// 自定义标签
var iconPath = "../../images/icons/"
var tabs = [
  {
    "icon": iconPath + "statistic.png",
    "iconActive": iconPath + "statisticML.png",
    "title": "统计",
    "extraStyle": "",
  },
  {
    "icon": iconPath + "collect.png",
    "iconActive": iconPath + "collectHL.png",
    "title": "收藏",
    "extraStyle": "",
  },
  {
    "icon": iconPath + "like.png",
    "iconActive": iconPath + "likeHL.png",
    "title": "喜欢",
    "extraStyle": "",
  },
  {
    "icon": iconPath + "more.png",
    "iconActive": iconPath + "moreHL.png",
    "title": "更多",
    "extraStyle": "border:none;",
  },
]
var app = getApp();
var userInfo = {
  avatar: "http://5b0988e595225.cdn.sohucs.com/images/20171030/26ed195281334ba4b1752394b60eb29a.jpeg",
  nickname: app.appData.userinfo.username,
  sex: "♂",  // 0, male; 1, female
  meta: '1篇日记',
}



Page({

  // data
  data: {
    // 展示的tab标签
    tabs: tabs,
    username:app.appData.userinfo.username,
    // 当前选中的标签
    currentTab: "tab1",

    // 高亮的标签索引
    highLightIndex: "0",

    // 模态对话框样式 
    modalShowStyle: "",

    // 待新建的日记标题
    diaryTitle: "",

    // TODO 用户信息
    userInfo: userInfo,
  },
  onLoad:function(options){
    if(app.appData.userinfo.username==null){
      wx.redirectTo({
        url: '../mine/mine/mine',
      })
    }
    else{
      this.setData({username:app.appData.userinfo.username})
      console.log(app.appData.userinfo.username);
    }
  },

  // 隐藏模态框
  hideModal() {
    this.setData({ modalShowStyle: "" });
  },

  // 清除日记标题
  clearTitle() {
    this.setData({ diaryTitle: "" });
  },

  onShow: function () {
    this.hideModal();
    this.clearTitle();
  },
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  // 点击tab项事件
  touchTab: function (event) {
    var tabIndex = parseInt(event.currentTarget.id);
    var template = "tab" + (tabIndex + 1).toString();

    this.setData({
      currentTab: template,
      highLightIndex: tabIndex.toString()
    }
    );
  },

})
