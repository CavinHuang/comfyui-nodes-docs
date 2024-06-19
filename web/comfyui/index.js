//@ts-nocheck
import { app } from "../../scripts/app.js";
import { throttle } from './utils.js'
import { getSettingEnable } from './settings.js'
import { nodeDocsEleMap, activeDocsEle, hideActiveDocs, showNodeDocs } from './creatDocsElement.js'
import {ENABLED_SETTING_KEY} from './constants.js'

const iconSvg = `<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5348" width="200" height="200"><path d="M146.863158 0h538.947368l296.421053 296.421053v619.789473c0 59.284211-48.505263 107.789474-107.789474 107.789474H146.863158c-59.284211 0-107.789474-48.505263-107.789474-107.789474V107.789474c0-59.284211 48.505263-107.789474 107.789474-107.789474z" fill="#2F77F1" p-id="5349"></path><path d="M688.505263 0l296.421053 296.421053h-296.421053V0zM549.726316 661.557895H142.821053c-14.821053 0-25.6-12.126316-25.6-25.6V633.263158c0-14.821053 12.126316-25.6 25.6-25.6h406.905263c13.473684 0 25.6 12.126316 25.6 25.6v2.694737c0 13.473684-10.778947 25.6-25.6 25.6z m-134.736842-350.31579H142.821053c-14.821053 0-25.6-10.778947-25.6-25.6V282.947368c0-14.821053 12.126316-25.6 25.6-25.6h272.168421c13.473684 0 25.6 12.126316 25.6 25.6v2.694737c0 13.473684-10.778947 25.6-25.6 25.6z m-272.168421 121.263158h245.221052c13.473684 0 25.6 12.126316 25.6 25.6v2.694737c0 13.473684-12.126316 25.6-25.6 25.6H142.821053c-14.821053 0-25.6-10.778947-25.6-25.6V458.105263c0-14.821053 12.126316-25.6 25.6-25.6z" fill="#AFFCFE"></path></svg>`

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

const processMouseDown = LGraphCanvas.prototype.processMouseDown
LGraphCanvas.prototype.processMouseDown = function(e) {
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

// 注册前端插件
app.registerExtension({
  name: 'Leo.NodeDocs',
  setup() {
    if (!getSettingEnable()) return
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
  },
  nodeCreated: function(node, app) {
    if (!getSettingEnable()) return
    if(!node.doc_enabled) {
      let orig = node.onDrawForeground;
        if(!orig)
          orig = node.__proto__.onDrawForeground;
      node.onDrawForeground = function (ctx) {
        drawDocIcon(node, orig, arguments)
      };
      node.doc_enabled = true;

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
      }
    }
  },
  loadedGraphNode(node, app) {
    if (!app.ui.settings.getSettingValue(ENABLED_SETTING_KEY)) return
		if(!node.doc_enabled) {
			const orig = node.onDrawForeground;
			node.onDrawForeground = function (ctx) { drawDocIcon(node, orig, arguments) };
		}
	},
});
