module.exports = {

  title: '大连市青少年体育俱乐部等级评定工作平台',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,
  fileType: [
    {
      label: '无限制',
      value: '*',
      size: 50
    },
    {
      size: 5,
      label: 'pdf',
      value: '.pdf'
    },
    {
      size: 5,
      label: 'excel/word',
      value: '.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    },
    {
      size: 1,
      label: '图片',
      value: 'image/*'
    },
    {
      size: 50,
      label: '视频',
      value: 'video/*'
    }
  ],
  rolesDic: {
    'student': '工作人员',
    'teacher': '专家',
    'club': '俱乐部',
    'sport': '体育局',
    'root': '管理员'
  },
  options: [{
    value: 'dalian',
    label: '大连市',
    children: [
      {
        value: 'zhongshan',
        label: '中山区'
      }, {
        value: 'xigang',
        label: '西岗区'
      }, {
        value: 'shahekou',
        label: '沙河口区'
      }, {
        value: 'ganjingzi',
        label: '甘井子区'
      },
      {
        value: 'lvshunkou',
        label: '旅顺口区'
      }, {
        value: 'jinzhou',
        label: '金州区'
      }, {
        value: 'changhai',
        label: '长海县'
      }, {
        value: 'wafangdian',
        label: '瓦房店市'
      }, {
        value: 'zhuanghe',
        label: '庄河市'
      }, {
        value: 'qita',
        label: '其他区'
      }
    ]
  }
  ]
}

