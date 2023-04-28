<template>
  <div
    class="h-full"
  >
    <!-- <div class="resize" title="收缩侧边栏">
      ⋮
    </div> -->
    <slot />

  </div>
</template>
<script>

export default ({
  data() {
    return {}
  },
  mounted() {
    // this.dragControllerDiv()
  },
  methods: {
    dragControllerDiv() {
      var that = this
      var resize = document.getElementsByClassName('resize')
      for (let i = 0; i < resize.length; i++) {
        // 鼠标按下事件
        resize[i].onmousedown = (e) => {
          // 颜色改变提醒
          resize[i].style.background = '#818181'
          var startX = e.clientX
          resize[i].left = resize[i].offsetLeft
          // 鼠标拖动事件
          document.onmousemove = (e) => {
            var endX = e.clientX
            var moveLen = resize[i].left + (endX - startX) // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
            console.log('left:', resize[i].left)
            var maxT = that.$el.clientWidth - resize[i].offsetWidth // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
            console.log('this.$el.clientWidth:', that.$el.clientWidth)
            console.log('moveLen:', moveLen)
            // if (moveLen < 32) moveLen = 32 // 左边区域的最小宽度为32px
            // if (moveLen > maxT - 150) moveLen = maxT - 150 // 右边区域最小宽度为150px
            // resize[i].style.left = moveLen + 'px' // 设置resize 位置
            that.$el.style.width = that.$el.clientWidth + moveLen + 'px'
          }
        }
        // 鼠标松开事件
        document.onmouseup = function(evt) {
          // 颜色恢复
          resize[i].style.background = '#d6d6d6'
          document.onmousemove = null
          document.onmouseup = null
          resize[i].releaseCapture && resize[i].releaseCapture() // 当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
        }
        resize[i].setCapture && resize[i].setCapture() // 该函数在属于当前线程的指定窗口里设置鼠标捕获
        return false
      }
    }
  }

})
</script>

<style >

.drag-textarea {
  height: 100%;
  width: 100%;
}
    /*拖拽区div样式*/
    .resize {
        cursor: col-resize;
        float: left;
        position: relative;
        top: 45%;
        background-color: #d6d6d6;
        border-radius: 5px;
        margin-top: -10px;
        width: 10px;
        height: 50px;
        background-size: cover;
        background-position: center;
        font-size: 32px;
        color: white;
    }
    /*拖拽区鼠标悬停样式*/
    .resize:hover {
        color: #444444;
    }

</style>
