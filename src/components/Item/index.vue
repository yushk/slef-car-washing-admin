<template>
  <div class="item-container">
    <div class="header">
      <span class="title">{{ title }}</span>
      <span class="subtitle">{{ subtitle }}</span>
    </div>
    <slot name="content" />
    <div class="time">{{ time }}</div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: function() {
        return ''
      }
    },
    subtitle: {
      type: String,
      default: function() {
        return ''
      }
    },
    time: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {}
  }
}
</script>
  <style lang="scss" scoped>
  .item-container{
   color: #dcdee0;
      display: flex;
      flex-direction: column;
      margin: 1rem;
      text-align: left;
      border:1px solid white;
      background: #DCDDE2;
      // background: linear-gradient(#111d3a, #701123);
      padding:0.5rem 1rem;
      border-radius: 0.5rem;
      .header{
        padding:2px;
        display: flex;
        justify-content: space-between;
        .title{
            font-size: 0.8rem;
            font-weight: bold;
            color: #000000;
        }
        .subtitle{
            font-size: 0.8rem;
        }
    }
    .time{
        font-size: 0.5rem;
        text-align: right;
        margin-top: 1rem;
        font-weight: bold;
        color: #000000;
    }
  }
  </style>

