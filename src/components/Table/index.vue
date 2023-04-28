<template>
  <div class="table-container">
    <el-card>
      <div class="items-center space-x-2 top">
        <slot name="search">
          <el-input
            v-model="search"
            size="small"
            placeholder="输入关键字搜索"
            class="searchinput"
          />
          <el-button type="primary" size="small" @click="query">搜索</el-button>
        </slot>
      </div>

      <el-table
        :data="tableData"
        style="width: 100%;height:80%"
        height="600px"
        highlight-current-row
        size="mini"
        @row-click="rowClick"
      >
        <el-table-column
          v-for="(item) in tableKey"
          :key="item.key"
          :label="item.label"
          :prop="item.key"
          :fixed="item.fixed||false"
          :width="item.width||''"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <!-- 解析时间 -->
            <div v-if="item.type==='time'">
              <span v-if="item.Func">
                {{ item.Func(scope.row[item.key]) }}
              </span>
              <span v-else>
                {{ scope.row[item.key] }}
              </span>
            </div>
            <!-- 以标签形式展示 -->
            <div v-else-if="item.type==='tag'">

              <el-tag v-for="(itemtag,index) in scope.row[item.key]" :key="index+item.key+'tag'" :type="itemtag.type">{{ itemtag.name }}</el-tag>
            </div>
            <!-- 已链接形式展示 -->
            <div v-else-if="item.type==='link'">
              <a v-for="(itemlink,index) in scope.row[item.key]" :key="index+item.key+'link'" target="_blank" :href="itemlink.url">
                <el-button type="text" size="mini">{{ itemlink.name }}</el-button>
              </a>
            </div>
            <!-- 已视频形式展示 -->
            <div v-else-if="item.type==='video'">
              <router-link v-for="(itemvideo,index) in scope.row[item.key]" :key="index+item.key+'video'" target="_blank" tag="a" :to="{path: itemvideo.url}">
                <el-button type="text" size="mini">{{ itemvideo.name }}</el-button>
              </router-link>
            </div>
            <!-- 已图片形式展示 -->
            <div v-else-if="item.type==='img'">
              <el-image
                style="width: 80px; height: 80px"
                :src="scope.row[item.key].length>0?scope.row[item.key][0]:''"
                :preview-src-list="scope.row[item.key]"
              />
            </div>
            <!-- 已图片形式展示 -->
            <div v-else-if="item.type==='qr'" @click="openQR(scope.row[item.key])">
              <vue-qr :text="scope.row[item.key]" :margin="5" :size="50" />
            </div>

            <div v-else>
              {{ scope.row[item.key] }}
            </div>
          </template>
        </el-table-column>
        <slot name="operate" />
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="changePage"
      />
    </el-card>
    <el-dialog :visible.sync="dialogTableVisible">
      <div class="flex justify-center">
        <vue-qr :text="qrText" :size="400" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import VueQr from 'vue-qr'
export default {
  name: 'Table',
  components: { VueQr },
  props: {
    tableKey: {
      type: Array,
      default: () => {
        return [
          { label: '课程名称', key: 'title', width: 300 },
          { label: '简介', key: 'desc' },
          { label: '状态', key: 'type', width: 100, type: 'tag' },
          { label: '查看', key: 'id', width: 100, type: 'link' },
          { label: '发布时间', key: 'update', parse: 1, type: 'time', Func: parseTime, width: 120 }
        ]
      }
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    total: {
      type: Number,
      default: () => {
        return 0
      }
    },
    currentPage: {
      type: Number,
      default: () => {
        return 1
      }
    },
    pageSize: {
      type: Number,
      default: () => {
        return 10
      }
    }
  },
  data() {
    return {
      search: '',
      qrText: '',
      dialogTableVisible: false
    }
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    query() {
      this.$emit('query', this.search)
    },
    handleEdit() {},
    publish() {},
    handleDelete() {},
    changePage(e) {
      this.$emit('changePage', e)
    },
    openQR(e) {
      this.qrText = e
      this.dialogTableVisible = true
    },
    rowClick(row, col, e) {
      this.$emit('rowClick', row, col, e)
    }
  }
}
</script>
  <style lang="scss" scoped>
  .table-container{
    .top{
      display: flex;
      justify-content: flex-start;
    }
  }
  </style>

