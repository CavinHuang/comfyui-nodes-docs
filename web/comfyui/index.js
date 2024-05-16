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
const showNodeDocs = async function(node) {
  const ele = nodeDocsEleMap.get(node.id)
  if(ele) {
    ele.style.display = 'block'
    return
  }
  const divWrap = document.createElement('div')
  divWrap.style.position = 'absolute'

  const [nLeft, nTop, nWidth, nHeight] = node.getBounding()
  divWrap.style.left = (nLeft + nWidth + 20) + 'px'
  divWrap.style.top = '20px'
  divWrap.style.width = '800px'
  divWrap.style.maxHeight = window.innerHeight - 100 + 'px'
  divWrap.style.backgroundColor = 'rgba(0,0,0, 1)'
  divWrap.style.color = 'white'
  divWrap.style.padding = '10px'
  divWrap.style.borderRadius = '10px'
  divWrap.style.zIndex = '9999'
  divWrap.style.overflowX = 'hidden'
  divWrap.style.overflowY = 'auto'

  document.body.appendChild(divWrap)

  const res = await fetch('/customnode/getNodeInfo?nodeName=' + node.type)
  const jsonData = await res.json()
  console.log(marked, jsonData)
  const html = marked.parse(jsonData.content);

  divWrap.innerHTML = html || node.description || '暂无文档'

  nodeDocsEleMap.set(node.id, divWrap)
}

app.registerExtension({
  name: 'Leo.NodeDocs',
  setup() {
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

      const nodePos = cacheNodePositonMap.get(node.id)
      console.log("🚀 ~ loadedGraphNode ~ nodePos:", nodePos)
      console.log("🚀 ~ loadedGraphNode ~ nodePos:", e)
      console.log("🚀 ~ loadedGraphNode ~ nodePos:", node.getBounding())
      if(nodePos) {
        const {x, y} = nodePos
        console.log(canvasX, canvasY, x, y)
        if(canvasX >= x[0] && canvasX <= x[1] && canvasY >= y[0] && canvasY <= y[1]) {
          console.log('🚀 ~ node.onMouseDown ~ nodePos11111', nodePos)
          showNodeDocs(node)
          // app.showNodeDocs(node)
        }
      }
    }
	},
});