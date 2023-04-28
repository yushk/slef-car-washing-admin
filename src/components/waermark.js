
const watermark = {}

const setWatermark = ({ content, color, size, opacity, background }) => {
  const id = '1.23452384164.123412416'
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }

  // 创建一个画布
  const can = document.createElement('canvas')
  // 设置画布的长宽
  can.width = 200
  can.height = 150
  const cans = can.getContext('2d')
  cans.fillStyle = background
  cans.fillRect(0, 0, can.width, can.height)
  // 旋转角度
  cans.rotate(-15 * Math.PI / 180)
  cans.font = size
  // 设置填充绘画的颜色、渐变或者模式
  cans.fillStyle = color
  // 设置文本内容的当前对齐方式
  cans.textAlign = 'left'
  // 设置在绘制文本时使用的当前文本基线
  cans.textBaseline = 'Middle'
  // 在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
  cans.fillText(content, can.width / 4, can.height / 2)
  //   cans.fillText(date, can.width / 4, can.height / 3)
  const div = document.createElement('div')
  const show = document.getElementById('show') // 控制水印显示的区域，设置id = show,表示在该范围内有水印
  div.id = id
  //   div.style.pointerEvents = 'none'
  div.style.top = '0px'
  div.style.left = '0px'
  div.style.position = 'absolute'
  div.style.zIndex = '100000'
  div.style.width = '100%'
  div.style.height = '100%'
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  //   document.body.appendChild(div)
  div.style.opacity = opacity // 水印的透明度
  show.appendChild(div)
  return id
}

// 该方法只允许调用一次
/**
 * content 水印内容
 * color 文字颜色
 * size 文字大小
 * */
watermark.set = ({
  content = new Date().getDate().toLocaleString(),
  color = 'rgba(0, 0, 0, 0.40)',
  opacity = '0.3',
  background = '#fafafa',
  size = '20px Vedana' }) => {
  const id = setWatermark({ content, color, size, opacity, background })
  setInterval(() => {
    if (document.getElementById(id) === null) {
      setWatermark({ content, color, size, opacity, background })
    }
  }, 500)
  window.onresize = () => {
    setWatermark({ content, color, size, opacity, background })
  }
}

export default watermark
