import { app } from "../../scripts/app.js";
import { marked } from './marked.js'

console.log('app', app)

/**
 * 1: {
 * x: [0,1]
 * y: [0,1]
 * }
 */
const cacheNodePositonMap = new Map();
const drawDocIcon = function(node, orig, restArgs) {
  let ctx = restArgs[0];
	const r = orig?.apply?.(node, restArgs);

	if (!node.flags.collapsed && node.constructor.title_mode != LiteGraph.NO_TITLE) {
    const docIcon = '📄';
    let fgColor = "white";

    ctx.save();

    ctx.font = "16px sans-serif";
    const sz = ctx.measureText(docIcon);
    ctx.beginPath();
    ctx.fillStyle = fgColor;
    const x = node.size[0] - sz.width - 6;
    const y = -LiteGraph.NODE_TITLE_HEIGHT + 22;
    ctx.fillText(docIcon, x, y);
    ctx.restore();

    const boundary = node.getBounding();
    const [ x1, y1, width, height ] = boundary
    cacheNodePositonMap.set(node.id, {
      x: [x1 + x, x1 + x + sz.width],
      y: [y1 , y1 + 22]
    })

    if (node.has_errors) {
      ctx.save();
      ctx.font = "bold 14px sans-serif";
      const sz2 = ctx.measureText(node.type);
      ctx.fillStyle = 'white';
      ctx.fillText(node.type, node.size[0] / 2 - sz2.width / 2, node.size[1] / 2);
      ctx.restore();
    }
  }
  return r
}

/**
 * {
 *  nodeId: Element
 * }
 */
const nodeDocsEleMap = new Map()
/**
 * 当前激活的文档
 * @type {Element | null}
 */
let activeDocsEle = null

const hideActiveDocs = function() {
  if(activeDocsEle) {
    activeDocsEle.style.display = 'none'
  }
}

/**
 * 显示节点文档
 * @param {*} node
 * @returns
 */
const showNodeDocs = async function(node) {
  const ele = nodeDocsEleMap.get(node.id)
  const [nLeft, nTop, nWidth, nHeight] = node.getBounding()
  if(ele) {
    ele.style.display = 'block'
    // 更新位置
    // ele.style.left = (nLeft + nWidth + 20) + 'px'
    activeDocsEle = ele
    return
  }
  const divWrap = document.createElement('div')
  divWrap.style.position = 'absolute'

  divWrap.style.left = 'calc(50% - 400px)'
  divWrap.style.top = '20px'
  divWrap.style.width = '800px'
  divWrap.style.height = window.innerHeight - 100 + 'px'
  divWrap.style.backgroundColor = 'var(--comfy-menu-bg)'
  divWrap.style.color = 'white'
  divWrap.style.padding = '10px'
  divWrap.style.borderRadius = '10px'
  divWrap.style.zIndex = '9999'
  divWrap.style.overflow = 'hidden'
  divWrap.style.boxShadow = '3px 3px 8px rgba(0, 0, 0, 0.4)'

  document.body.appendChild(divWrap)

  const buttonClose = document.createElement('button')
  /**
   * background-color: rgba(0, 0, 0, 0);
    padding: 0;
    border: none;
    cursor: pointer;
    font-size: inherit;
   */
  buttonClose.style.backgroundColor = 'rgba(0, 0, 0, 0)'
  buttonClose.style.padding = '0'
  buttonClose.style.border = 'none'
  buttonClose.style.cursor = 'pointer'
  buttonClose.style.fontSize = '36px'
  buttonClose.innerText = '×'
  buttonClose.className = 'comfy-close-menu-btn'

  buttonClose.onclick = function() {
    divWrap.style.display = 'none'
  }

  const divButtonWrap = document.createElement('div')

  divButtonWrap.style.display = 'flex'
  divButtonWrap.style.justifyContent = 'flex-end'
  divButtonWrap.style.height = '32px'
  divButtonWrap.appendChild(buttonClose)

  const divContentWrap = document.createElement('div')
  divContentWrap.style.background = 'var(--comfy-input-bg)'
  divContentWrap.style.height = 'calc(100% - 44px)'
  divContentWrap.style.padding = '10px'
  divContentWrap.style.borderRadius = '10px'
  divContentWrap.style.overflowX = 'hidden'
  divContentWrap.style.overflowY = 'auto'

  divWrap.appendChild(divButtonWrap)
  divWrap.appendChild(divContentWrap)


  const res = await fetch('/customnode/getNodeInfo?nodeName=' + node.type)
  const jsonData = await res.json()
  console.log(marked, jsonData)
  const html = marked.parse(jsonData.content);

  divContentWrap.innerHTML = html || node.description || '暂无文档'

  if (activeDocsEle) {
    hideActiveDocs()
  }
  activeDocsEle = divWrap

  nodeDocsEleMap.set(node.id, divWrap)
}

/**
 * 节流函数
 */
const throttle = function(fn, delay) {
  let lastTime = 0
  return function() {
    const now = Date.now()
    if(now - lastTime > delay) {
      fn.apply(this, arguments)
      lastTime = now
    }
  }
}


// const wheel = LGraphCanvas.prototype.processMouseWheel
// console.log('🚀 ~ setup ~ wheel:', wheel)
// LGraphCanvas.prototype.processMouseWheel = function(e) {
//   console.log('🚀 ~ cacheNodePositonMap.forEach ~ node:')
//   wheel.apply(this, arguments)
//   cacheNodePositonMap.forEach((value, key) => {
//     const node = app.graph.getNodeById(key)
//     if(node) {
//       const [nLeft, nTop, nWidth, nHeight] = node.getBounding()
//       // 根据最新的node位置更新图标的位置信息
//       cacheNodePositonMap.set(node.id, {
//         x: [nLeft + nWidth - 22, nLeft + nWidth],
//         y: [nTop , nTop + 22]
//       })
//     }
//   })
// }

const processMouseDown = LGraphCanvas.prototype.processMouseDown
LGraphCanvas.prototype.processMouseDown = function(e) {
  console.log('🚀 ~ arguments:', arguments)
  processMouseDown.apply(this, arguments)
  const { canvasX, canvasY } = e
  const nodes = app.graph._nodes
  let isClickDoc = false
  for(let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    const [nL, nT, nW, nH] = node.getBounding()
    const iconX = nL + nW - 22
    const iconY = nT
    const iconX1 = nL + nW
    const iconY1 = nT + 22

    if(canvasX >= iconX && canvasX <= iconX1 && canvasY >= iconY && canvasY <= iconY1) {
      isClickDoc = true
      break
    }
  }

  if(!isClickDoc) {
    hideActiveDocs()
  }
}

app.registerExtension({
  name: 'Leo.NodeDocs',
  setup() {
    console.log('🚀 ~ setup ~ app', app)
    // app.canvasEl.addEventListener('click', function(e) {
    //   console.log('🚀 ~ app.canvasEl.addEventListener ~ e:', e)
    //   // 排除点击文档区域
    //   const { clientX, clientY } = e
    //   let isClickDoc = false
    //   // cacheNodePositonMap.forEach((value, key) => {
    //   //   const {x, y} = value
    //   //   // 排除文档图标区域
    //   //   if(clientX >= x[0] && clientX <= x[1] && clientY >= y[0] && clientY <= y[1]) {
    //   //     isClickDoc = true
    //   //     return
    //   //   }
    //   // })
    //   //获取所有的节点，计算出节点上的文档图标的位置
    //   const nodes = app.graph._nodes
    //   // console.log(clientX, clientY)
    //   for(let i = 0; i < nodes.length; i++) {
    //     const node = nodes[i]
    //     const [nL, nT, nW, nH] = node.getBounding()
    //     // console.log(nL, nT, nW, nH)
    //     const iconX = nL + nW - 22
    //     const iconY = nT
    //     const iconX1 = nL + nW
    //     const iconY1 = nT + 22

    //     // console.log(clientX, clientY, iconX, iconY, iconX1, iconY1)
    //     if(clientX >= iconX && clientX <= iconX1 && clientY >= iconY && clientY <= iconY1) {
    //       isClickDoc = true
    //       break
    //     }
    //   }

    //   if(!isClickDoc) {
    //     console.log('关闭文档')
    //     hideActiveDocs()
    //   }
    // }, false)

    // window resize重新计算所有文档的位置
    window.addEventListener('resize', throttle(() => {
      cacheNodePositonMap.forEach((value, key) => {
        const node = app.graph.getNodeById(key)
        if(node) {
          const [nLeft, nTop, nWidth, nHeight] = node.getBounding()
          const ele = nodeDocsEleMap.get(key)
          if(ele) {
            ele.style.left = (nLeft + nWidth + 20) + 'px'
          }
        }
      })
    }, 1000))

    // 画布缩放时更新图标位置
    // app.canvasEl.addEventListener('wheel', () => {
      // cacheNodePositonMap.forEach((value, key) => {
      //   const node = app.graph.getNodeById(key)
      //   if(node) {
      //     console.log('🚀 ~ app.canvasEl.addEventListener ~ node', node)
      //   }
      // })
    // }, false)



  },
  nodeCreated: function(node, app) {
    if(!node.doc_enabled) {
      let orig = node.onDrawForeground;
        if(!orig)
          orig = node.__proto__.onDrawForeground;
      node.onDrawForeground = function (ctx) {
        drawDocIcon(node, orig, arguments)
      };
      node.doc_enabled = true;
      console.log('=======', node)
    }
  },
  loadedGraphNode(node, app) {
		if(!node.doc_enabled) {
			const orig = node.onDrawForeground;
			node.onDrawForeground = function (ctx) { drawDocIcon(node, orig, arguments) };
		}
    const oDb = node.onMouseDown
    node.onMouseDown = function(e) {
      oDb?.apply(node, arguments)
      const { canvasX, canvasY } = e

      // 通过node的位置信息判断是否点击了文档图标
      const [nLeft, nTop, nWidth, nHeight] = node.getBounding()
      const iconX = nLeft + nWidth - 22
      const iconY = nTop
      const iconX1 = nLeft + nWidth
      const iconY1 = nTop + 22
      console.log(canvasX, canvasY, iconX, iconY, iconX1, iconY1)
      if(canvasX >= iconX && canvasX <= iconX1 && canvasY >= iconY && canvasY <= iconY1) {
        console.log('打开文档')
        showNodeDocs(node)
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      // const nodePos = cacheNodePositonMap.get(node.id)
      // if(nodePos) {
      //   const {x, y} = nodePos
      //   // 计算图标的位置
      //   console.log(canvasX, canvasY, x, y)
      //   if(canvasX >= x[0] && canvasX <= x[1] && canvasY >= y[0] && canvasY <= y[1]) {
      //     showNodeDocs(node)
      //     // app.showNodeDocs(node)
      //     e.preventDefault()
      //     e.stopPropagation()
      //     return false
      //   }
      // }
    }
	},
});