//@ts-nocheck
import {$el} from "../../scripts/ui.js";
import { app } from "../../scripts/app.js";
import { marked } from './marked.js'
import { throttle } from './utils.js'

const ENABLED_SETTING_KEY = 'comfyui-nodes-docs.enabled'

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

// 缓存到本地
const fetchCacheDNodeDoc = async function(nodeName) {
  const res = await fetch('/customnode/cacheNodeInfo?nodeName=' + nodeName)
  const jsonData = await res.json()
  return jsonData
}

// 保存文档到本地
const saveNodeDoc = async function(nodeName, content) {
  const res = await fetch('/customnode/updateNodeInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nodeName,
      content
    })
  })

  return await res.json()
}

// 更新设置文件
const updateSettingFile = async function(setting) {
  const res = await fetch('/customnode/updateSetting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(setting)
  })
  const jsonData = await res.json()
  return jsonData
}

/**
 * 显示节点文档
 * @param {*} node
 * @returns
 */
const showNodeDocs = async function(node) {
  const ele = nodeDocsEleMap.get(node.id)
  // const [nLeft, nTop, nWidth, nHeight] = node.getBounding()
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
  divContentWrap.style.height = 'calc(100% - 44px - 70px)'
  divContentWrap.style.padding = '10px'
  divContentWrap.style.borderRadius = '10px'
  divContentWrap.style.overflow = 'hidden'
  divContentWrap.style.overflowY = 'auto'

  divWrap.appendChild(divButtonWrap)
  divWrap.appendChild(divContentWrap)


  const res = await fetch('/customnode/getNodeInfo?nodeName=' + node.type)
  const jsonData = await res.json()
  console.log(marked, jsonData)
  const html = marked.parse(jsonData.content);

  divContentWrap.innerHTML = html || node.description || '暂无文档'

  // 编辑框
  const editWrap = document.createElement('div')
  editWrap.style.display = 'none'
  editWrap.style.padding = '20px'
  editWrap.borderRadius = '10px'
  editWrap.style.backgroundColor = 'var(--comfy-menu-bg)'
  editWrap.style.color = 'white'
  editWrap.style.height = 'calc(100% - 44px - 70px)'
  editWrap.style.boxSizing = 'border-box'
  const editInput = document.createElement('textarea')
  editInput.style.width = '100%'
  editInput.style.height = '100%'
  editInput.style.backgroundColor = 'var(--comfy-input-bg)'
  editInput.style.color = 'white'
  editInput.style.border = 'none'
  editInput.style.borderRadius = '10px'
  editInput.style.padding = '10px'
  editInput.style.resize = 'none'
  editInput.style.fontSize = '16px'
  editInput.style.lineHeight = '1.5'
  editInput.value = jsonData.content
  editWrap.appendChild(editInput)
  divWrap.appendChild(editWrap)

  // 增加按钮
  const buttonWrap = document.createElement('div')
  buttonWrap.style.display = 'flex'
  buttonWrap.style.justifyContent = 'flex-end'
  buttonWrap.style.padding = '20px'

  const editButton = document.createElement('button')
  editButton.innerText = '编辑'
  editButton.style.backgroundColor = 'var(--theme-color)'
  editButton.style.color = 'white'
  editButton.style.padding = '5px 10px'
  editButton.style.border = 'none'
  editButton.style.cursor = 'pointer'
  editButton.style.borderRadius = '5px'

  const cancelEditButton = document.createElement('button')
  cancelEditButton.innerText = '取消'
  cancelEditButton.style.backgroundColor = 'var(--comfy-input-bg)'
  cancelEditButton.style.color = 'white'
  cancelEditButton.style.padding = '5px 10px'
  cancelEditButton.style.border = 'none'
  cancelEditButton.style.cursor = 'pointer'
  cancelEditButton.style.display = 'none'
  cancelEditButton.style.marginLeft = '16px'
  editButton.style.borderRadius = '5px'

  cancelEditButton.onclick = function() {
    editWrap.style.display = 'none'
    divContentWrap.style.display = 'block'
    editButton.innerText = '编辑'
    cancelEditButton.style.display = 'none'
  }

  editButton.onclick = function() {
    if(editWrap.style.display === 'none') {
      fetchCacheDNodeDoc(node.type)
      editWrap.style.display = 'block'
      divContentWrap.style.display = 'none'
      editButton.innerText = '保存'
      cancelEditButton.style.display = 'block'
    } else {
      saveNodeDoc(node.type, editInput.value).then(res => {
        if (res.success) {
          divContentWrap.innerHTML = marked.parse(editInput.value)
          editWrap.style.display = 'none'
          divContentWrap.style.display = 'block'
          editButton.innerText = '编辑'
          cancelEditButton.style.display = 'none'
        }
      })
    }
  }

  buttonWrap.appendChild(editButton)
  buttonWrap.appendChild(cancelEditButton)
  divWrap.appendChild(buttonWrap)

  if (activeDocsEle) {
    hideActiveDocs()
  }
  activeDocsEle = divWrap

  nodeDocsEleMap.set(node.id, divWrap)
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


// 增加设置项目
app.ui.settings.addSetting({
  id: ENABLED_SETTING_KEY,
  name: 'comfyui nodes docs enabled',
  type: 'boolean',
  defaultValue: true,
  onChange: (newValue, oldValue) => {
    if (newValue !== oldValue && oldValue !== undefined) {
      window.location.reload()
    }
  }
})

const getSettingEnable = () => {
  const settingValue = app.ui.settings.getSettingValue(ENABLED_SETTING_KEY)

  return settingValue === undefined ? true : settingValue
}

// 增加设置导出文档项目
const settingId = "comfyui.nodes.docs.export";
const htmlSettingId = settingId.replaceAll(".", "-");
app.ui.settings.addSetting({
  id: 'comfyui-nodes-docs.export',
  name: 'comfyui nodes docs export',
  type: (name, setter, value) => {
    return $el("tr", [
      $el("td", [
        $el("label", {
          textContent: "comfyui nodes docs export",
          for: htmlSettingId,
        }),
      ]),
      $el("td", [
        $el("button", {
          textContent: "export docs",
          onclick: async () => {
            const res = await fetch('/customnode/exportNodeInfo')
            const blob = await res.blob()
            // 把blob转成uri
            const uri = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = uri
            a.download = 'nodes-docs.zip'
            a.click()
          },
          style: {
            fontSize: "14px",
            display: "block",
            marginTop: "5px",
          },
        }),
      ]),
    ]);
  }
})

// 增加设置导入文档项目
const settingId2 = "comfyui.nodes.docs.import";
const htmlSettingId2 = settingId2.replaceAll(".", "-");
app.ui.settings.addSetting({
  id: 'comfyui-nodes-docs.import',
  name: 'comfyui nodes docs import',
  type: (name, setter, value) => {
    return $el("tr", [
      $el("td", [
        $el("label", {
          textContent: "comfyui nodes docs import",
          for: htmlSettingId2,
        }),
      ]),
      $el("td", [
        $el("input", {
          id: htmlSettingId2,
          type: "file",
          onchange: async (event) => {
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append('file', file)
            const res = await fetch('/customnode/importNodeInfo', {
              method: 'POST',
              body: formData
            })
            const jsonData = await res.json()
            if(jsonData.success) {
              alert('导入成功')
            } else {
              alert('导入失败')
            }
          },
        }),
      ]),
    ]);
  }
})

// 增加设置参与共建项目
app.ui.settings.addSetting({
  id: 'comfyui-nodes-docs.contribute',
  name: 'comfyui nodes docs contribute',
  type: 'boolean',
  defaultValue: true,
  onChange: (newValue, oldValue) => {
    if (newValue !== oldValue && oldValue !== undefined) {
      updateSettingFile({
        key: 'contribute',
        value: newValue
      })
    }
  }
})

// 注册前端插件
app.registerExtension({
  name: 'Leo.NodeDocs',
  setup() {
    console.log(getSettingEnable())
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
      console.log('=======', node)

      console.log(1, node)
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
