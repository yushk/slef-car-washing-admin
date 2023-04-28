<template>
  <div class="text-sm shadow-sm">
    <div class="text-sm ">{{ title }}</div>
    <div v-if="list.length===0" class="p-2 text-center">暂无</div>
    <a v-for="item in list" :key="item.url" target="_blank" :href="item.url">
      <img :src="item.url">
      <el-button type="text" size="mini">{{ item.name }}</el-button>
    </a>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: '附件列表'
    }
  },
  data() {
    return {}
  }
}
</script>
