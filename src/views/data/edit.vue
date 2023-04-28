<template>
  <div>
    <el-button style="float:right;margin-right:1rem" @click="download">导出</el-button>
    <div id="dengjibiao">
      <div
        style="margin: auto;
          width: 600px;
          text-align: center;"
      >

        <table border="1" width="100%" cellspacing="0" cellpadding="0">
          <caption>
            牵禧情感策划会员登记表:
          </caption>
          <tr><td colspan="9">会员登记编号:</td></tr>
          <tr>
            <td>姓名</td>
            <td>{{ tableData.name }}</td>
            <td>姓别</td>
            <td>{{ tableData.sex }}</td>
            <td>民族</td>
            <td>{{ tableData.nation }}</td>
            <td>血型</td>
            <td>{{ tableData.bloodType }}</td>
            <td colspan="1" rowspan="5">照片</td>
          </tr>
          <tr>
            <td>出生年月</td>
            <td>{{ tableData.birthday }}</td>
            <td>属相</td>
            <td>{{ tableData.shuxiang }}</td>
            <td>星座</td>
            <td>{{ tableData.xingzuo }}</td>
            <td>常驻地</td>
            <td>{{ tableData.changzhudi }}</td>
            <!-- <td colspan="2">照片</td> -->
          </tr>
          <tr>
            <td>身份证号</td>
            <td colspan="3">{{ tableData.shenfenzheng }}</td>

            <td>身高</td>
            <td>{{ tableData.shengao }}</td>
            <td>体重</td>
            <td>{{ tableData.tizhong }}</td>
            <!-- <td colspan="2">照片</td> -->
          </tr>
          <tr>
            <td>身体状况</td>
            <td colspan="3">{{ tableData.shentizhuangkuang }}</td>
            <td>兴趣爱好</td>
            <td colspan="3">{{ tableData.xingquaihao }}</td>
            <!-- <td colspan="2">照片</td> -->
          </tr>
          <tr>
            <td>毕业院校</td>
            <td colspan="3">{{ tableData.biyeyuanxiao }}</td>
            <td>学历</td>
            <td>{{ tableData.xueli }}</td>
            <td>专业</td>
            <td>{{ tableData.zhuanye }}</td>
            <!-- <td colspan="2">照片</td> -->
          </tr>
          <tr>
            <td>从事行业属性</td>
            <td colspan="8">{{ tableData.hangye }}</td>
          </tr>
          <tr>
            <td>政治面貌</td>
            <td colspan="3">{{ tableData.zhengzhimianmao }}</td>
            <td>家庭住址</td>
            <td colspan="4">{{ tableData.jiatingzhuzhi }}</td>
          </tr>
          <tr>
            <td>工作单位</td>
            <td colspan="3">{{ tableData.company }}</td>
            <td>职业</td>
            <td colspan="4">{{ tableData.zhiye }}</td>
          </tr>
          <tr>
            <td>收入情况</td>
            <td colspan="3">{{ tableData.shouru }}</td>
            <td>联系方式</td>
            <td colspan="4">{{ tableData.phone }}</td>
          </tr>
          <tr>
            <td>婚姻情况</td>
            <td colspan="8">{{ tableData.hunyinqingkuang }}</td>
          </tr>
          <tr>
            <td>财产情况</td>
            <td>房产</td>
            <td colspan="2">{{ tableData.fangchan }}</td>
            <td>私家车</td>
            <td colspan="4">{{ tableData.car }}</td>
          </tr>
          <tr>
            <td>家庭成员</td>
            <td colspan="8">{{ members }}</td>

          </tr>
        </table>
        <h3 style="float:left;text-align:left">
          择偶条件:
        </h3>
        <table border="1" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td>年龄段</td>
            <td>{{ req.age.min }}-{{ req.age.max }}</td>
            <td>学历</td>
            <td>{{ req.xueli }}</td>
            <td>专业</td>
            <td>{{ req.zhuanye }}</td>
          </tr>
          <tr>
            <td>住房条件</td>
            <td>{{ req.zhufang }}</td>
            <td>家庭成员</td>
            <td>{{ req.members }}</td>
            <td>地域范围</td>
            <td>{{ req.diyu }}</td>
          </tr>
          <tr>
            <td>职业要求</td>
            <td>{{ req.zhiye }}</td>

            <td>身高范围</td>
            <td>{{ req.shengao.min||'' }}-{{ req.shengao.max }}</td>
            <td>体重范围</td>
            <td>{{ req.tizhong.min }}-{{ req.tizhong.max }}</td>
          </tr>
          <tr>
            <td>收入情况/月</td>
            <td>{{ req.shouru.min }}-{{ req.shouru.max }}</td>
            <td>才貌要求</td>
            <td>{{ req.caimao }}</td>
            <td>兴趣爱好</td>
            <td>{{ req.xingqu }}</td>
          </tr>
          <tr>
            <td>婚姻情况</td>
            <td colspan="8">{{ req.hunyin }}</td>
          </tr>
          <tr>
            <td>其它</td>
            <td colspan="8">{{ req.note }}</td>
          </tr>
        </table>
        <h3 style="float:left;text-align:left">
          声明、担保与授权:
        </h3>
        <table border="1" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td>本人或代理人法律声明</td>
            <td colspan="5">本人承诺婚姻状况真实，及以上所填的个人基本情况（包括身份证、职业、学历等）均真实无误，并承担由此产生的法律责任。特此声明！</td>

          </tr>
          <tr>
            <td>授权声明</td>
            <td colspan="5">本人授权牵禧情感策划（大连）有限公司将本人照片、视频等信息在公司网站和视频号发布，特此授权。</td>

          </tr>

        </table>
      </div>
    </div>
  </div>
</template>

<script>
import marryService from '@/api/members'
import { parseTime, exportFile } from '@/utils/index'
export default {
  name: 'Members',
  data() {
    return {
      parseTime,
      tableData: {
        name: '张三',
        sex: '男',
        nation: '汉',
        bloodType: 'A',
        birthday: '2022-02',
        shuxiang: '狗',
        xingzuo: '金牛座',
        changzhudi: '辽宁省大连市',
        shenfenzheng: '210213199909099999',
        shengao: '111',
        tizhong: '90',
        shentizhuangkuang: '健康',
        xingquaihao: '篮球，读书',
        biyeyuanxiao: '大连海事大学',
        xueli: '本科',
        zhuanye: '自动化',
        hangye: '金融',
        zhengzhimianmao: '党员',
        jiatingzhuzhi: '辽宁省大连市高新元序曲xxxxxxxxxxxxxxx',
        company: '东软集团',
        zhiye: '软件工程师',
        shouru: '10k',
        phone: '18899999999',
        hunyinqingkuang: '未婚',
        fangchan: '1',
        car: '1',
        members: {},
        req: {}
      },
      members: '',
      req: {
        age: { min: '', max: '' },
        shengao: { min: '', max: '' },
        tizhong: { min: '', max: '' },
        shouru: { min: '', max: '' }
      }
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    searchfunc() {
      this.currentPage = 1
      this.query()
    },
    query() {
      marryService.getOne({ id: this.$route.params.id }).then(res => {
        const { data, code } = res
        if (code === 200) {
          const { members, require } = data
          if (members.length) {
            this.members = ''
            members.forEach((e) => {
              this.members += e.name + ':' + e.phone + '    '
            })
          }
          this.req = JSON.parse(JSON.stringify(require))
          console.log('this.req', this.req)
          this.tableData = data
          this.$forceUpdate()
          console.log('res', data)
        }
      })
    },
    download() {
      // exportWord({
      //   mhtml: document.getElementById('dengjibiao').innerHTML,
      //   style: 'p{font-size: 30px; color: red;}',
      //   filename: 'exportTest'
      // })
      // this.Export2Word('dengjibiao', 'exportTest')
      // window.document.body.innerHTML = document.getElementById('dengjibiao').innerHTML
      // window.open()
      exportFile({ data: document.getElementById('dengjibiao').outerHTML, fileName: `牵囍情感策划会员登记表  （${this.tableData.name}）` })
      // var newwindow = window.open()

      // newwindow.document.write(document.getElementById('dengjibiao').innerHTML)

      // newwindow.window.print()
      // window.print()
    },
    Export2Word(element, filename = '') {
      var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>"
      var postHtml = '</body></html>'
      var html = preHtml + document.getElementById(element).innerHTML + postHtml

      var blob = new Blob(['\ufeff', html], {
        type: 'application/msword;charset=utf-8'
      })

      // Specify link url
      var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html)

      // Specify file name
      filename = filename ? filename + '.docx' : 'document.docx'

      // Create download link element
      var downloadLink = document.createElement('a')

      document.body.appendChild(downloadLink)

      if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename)
      } else {
        // Create a link to the file
        downloadLink.href = url

        // Setting the file name
        downloadLink.download = filename

        // triggering the function
        downloadLink.click()
      }

      document.body.removeChild(downloadLink)
    },
    changePage(v) {
      this.currentPage = v
      this.query()
    },
    handleEdit(id) {
      console.log(id)
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('确认删除该条数据？')
        .then(_ => {
          marryService.del({ id: row._id }).then(
            res => {
              this.$message.success('删除成功')
              this.query()
            }
          )
        })
        .catch(_ => {})
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === 'new') {
            var d = Object.assign(this.ruleForm, { type: this.dicType })
            marryService.add(d).then(
              res => {
                this.$message.success(' 创建成功')
                this.query()
                this.dialogVisible = false
              }
            )
          } else {
            marryService.update({ id: this.ruleForm._id }, Object.assign(this.ruleForm, { type: this.dicType })).then(
              res => {
                this.$message.success('编辑成功')
                this.query()
                this.dialogVisible = false
              }
            )
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
#dengjibiao{
    // margin: auto;
    // width: calc(210px * 2.5 );
    // height: calc( 297px * 2.5);
    // border: 1px solid #000;
    // text-align: center;
    h3{
      margin:0;
      padding:0;
    }
}
</style>
