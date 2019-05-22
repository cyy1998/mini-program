const app = getApp()
Page({
  data: {
    year: 0,
    month: 0,
    day: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    cards: ['#00FFFF','#FFB6C1','#00FA9A','#F0E68C','#D3D3D3','#FF00FF','#FF8C00'],
    color: ['#22A7F6','#FFB6C1'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    cal_show: true,
    sel_show: true,
    animationData: {},
    animationData2: {},
    animationData3: {},
    animationData4: {},
  },
  onLoad: function () {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      day: now.getDate(),
      isToday: '' + year + month + now.getDate()
    })
  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];						//需要遍历的日历数组数据
    let arrLen = 0;							//dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();					//没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();							//目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();				//获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  cardsInit: function() {

  },
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  selectDay: function (e) {
    let today = e.target.dataset.text;
    let year = this.data.year;
    let month = this.data.month;
    this.setData({
      day: today,
      isToday: '' + year + month + today
    })

  },
  showCal: function () {
    var animation = wx.createAnimation({ duration: 200, timingFunction: 'linear', });
    var animation2 = wx.createAnimation({ duration: 200, timingFunction: 'linear', });
    var animation3 = wx.createAnimation({ duration: 200, timingFunction: 'linear', });
    var animation4 = wx.createAnimation({ duration: 200, timingFunction: 'linear', });
    var systemInfo = wx.getSystemInfoSync();
    if (this.data.cal_show) {
      animation.rotate(180).step();
      animation2.translateY(930 / 750 * systemInfo.windowWidth).step();
      animation3.rotate(0).step();
      animation4.translateY(0).step();
    }
    else {
      animation.rotate(0).step();
      animation2.translateY(0).step();
      animation3.rotate(0).step();
      animation4.translateY(0).step();
    }
    this.setData({
      cal_show: !this.data.cal_show,
      sel_show: true,
      animationData: animation.export(),
      animationData2: animation2.export(),
      animationData3: animation3.export(),
      animationData4: animation4.export()
    })
  },
  showSel: function () {
    var animation = wx.createAnimation({ duration: 200, timingFunction: 'linear', });
    var animation2 = wx.createAnimation({ duration: 200, timingFunction: 'linear', });
    var animation3 = wx.createAnimation({ duration: 200, timingFunction: 'linear', });
    var animation4 = wx.createAnimation({ duration: 200, timingFunction: 'linear', });
    var systemInfo = wx.getSystemInfoSync();
    if (this.data.sel_show) {
      animation.rotate(0).step();
      animation2.translateY(0).step();
      animation3.rotate(180).step();
      animation4.translateY(980 / 750 * systemInfo.windowWidth).step();
    }
    else {
      animation.rotate(0).step();
      animation2.translateY(0).step();
      animation3.rotate(0).step();
      animation4.translateY(0).step();
    }
    this.setData({
      cal_show: true,
      sel_show: !this.data.sel_show,
      animationData: animation.export(),
      animationData2: animation2.export(),
      animationData3: animation3.export(),
      animationData4: animation4.export()
    })
  },
  editPage: function() {
    wx.navigateTo({
      url: "../edit/edit"
    })
  }
})
