import { marked } from './marked.js'

/**
 * {
 *  nodeId: Element
 * }
 */
export const nodeDocsEleMap = new Map()

/**
 * 当前激活的文档
 * @type {Element | null}
 */
export let activeDocsEle = null

export const hideActiveDocs = function() {
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


let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
let dragElement = null
let moveElement = null

const dragMouseDown = function(e) {
    e = e || window.event
    e.preventDefault()
    pos3 = e.clientX
    pos4 = e.clientY
    document.addEventListener('mousemove', elementDrag, false)
    document.addEventListener('mouseup', closeDragElement, false)
}

function elementDrag(e) {
  e = e || window.event;
  e.preventDefault();
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;
  moveElement.style.top = (moveElement.offsetTop - pos2) + "px";
  moveElement.style.left = (moveElement.offsetLeft - pos1) + "px";
}

function closeDragElement() {
  console.log('=========')
  document.removeEventListener('mousemove', elementDrag, false)
  document.removeEventListener('mouseup', closeDragElement, false)
}

/**
 * 显示节点文档
 * @param {*} node
 * @returns
 */
export const showNodeDocs = async function(node) {
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
    buttonClose.style.cursor = 'pointer'
  
    buttonClose.onclick = function() {
      divWrap.style.display = 'none'
      return false
    }
  
    const divButtonWrap = document.createElement('div')
  
    divButtonWrap.style.display = 'flex'
    divButtonWrap.style.justifyContent = 'flex-end'
    divButtonWrap.style.height = '32px'
    divButtonWrap.style.cursor = 'move'
    divButtonWrap.appendChild(buttonClose)

    dragElement = divButtonWrap
    moveElement = divWrap
    divButtonWrap.onmousedown = dragMouseDown

    const divContentWrap = document.createElement('div')
    divContentWrap.style.background = 'var(--comfy-input-bg)'
    divContentWrap.style.height = 'calc(100% - 44px - 70px)'
    divContentWrap.style.padding = '10px'
    divContentWrap.style.borderRadius = '10px'
    divContentWrap.style.overflow = 'hidden'
    divContentWrap.style.overflowY = 'auto'
    divContentWrap.className = 'markdown-doc-body'
  
    divWrap.appendChild(divButtonWrap)
    divWrap.appendChild(divContentWrap)
  
  
    const res = await fetch('/customnode/getNodeInfo?nodeName=' + node.type)
    const jsonData = await res.json()
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

    const closeButton = document.createElement('button')
    closeButton.innerText = '关闭'
    closeButton.style.backgroundColor = 'var(--comfy-input-bg)'
    closeButton.style.color = 'white'
    closeButton.style.padding = '5px 10px'
    closeButton.style.border = 'none'
    closeButton.style.cursor = 'pointer'
    closeButton.style.borderRadius = '5px'
  
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
      closeButton.style.display = 'block'
      cancelEditButton.style.display = 'none'
    }
  
    editButton.onclick = function() {
      if(editWrap.style.display === 'none') {
        fetchCacheDNodeDoc(node.type)
        editWrap.style.display = 'block'
        divContentWrap.style.display = 'none'
        editButton.innerText = '保存'
        cancelEditButton.style.display = 'block'
        closeButton.style.display = 'none'
      } else {
        saveNodeDoc(node.type, editInput.value).then(res => {
          if (res.success) {
            divContentWrap.innerHTML = marked.parse(editInput.value)
            editWrap.style.display = 'none'
            divContentWrap.style.display = 'block'
            editButton.innerText = '编辑'
            cancelEditButton.style.display = 'none'
            closeButton.style.display = 'block'
          }
        })
      }
    }

    // resize
    const resize = document.createElement('div')
    resize.style.position = 'absolute'
    resize.style.right = '0'
    resize.style.bottom = '0'
    resize.style.width = '20px'
    resize.style.height = '20px'
    resize.style.cursor = 'nwse-resize'
    resize.style.color = 'white'
    resize.innerHTML = `<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
    <path d="M938.666667 938.666667h-85.333334v-85.333334h85.333334v85.333334m0-170.666667h-85.333334v-85.333333h85.333334v85.333333m-170.666667 170.666667h-85.333333v-85.333334h85.333333v85.333334m0-170.666667h-85.333333v-85.333333h85.333333v85.333333m-170.666667 170.666667h-85.333333v-85.333334h85.333333v85.333334m341.333334-341.333334h-85.333334v-85.333333h85.333334v85.333333z" fill="currentColor"></path>
    </svg>`
    divWrap.appendChild(resize)

    resize.addEventListener('mousedown', initResize, false);


    function initResize(e) {
      document.addEventListener('mousemove', resizeMove, false);
      document.addEventListener('mouseup', stopResize, false);
      e.preventDefault();
      e.stopPropagation();
    }

    function resizeMove(e) {
      divWrap.style.width = (e.clientX - divWrap.offsetLeft) + 'px';
      divWrap.style.height = (e.clientY - divWrap.offsetTop) + 'px';
      e.preventDefault();
      e.stopPropagation();
    }

    function stopResize(e) {
      document.removeEventListener('mousemove', resizeMove, false);
      document.removeEventListener('mouseup', stopResize, false);
      e.preventDefault();
      e.stopPropagation();
    }

    closeButton.onclick = function() {
      divWrap.style.display = 'none'
    }
    
    buttonWrap.appendChild(closeButton)
    buttonWrap.appendChild(editButton)
    buttonWrap.appendChild(cancelEditButton)
    divWrap.appendChild(buttonWrap)
  
    if (activeDocsEle) {
      hideActiveDocs()
    }
    activeDocsEle = divWrap
  
    nodeDocsEleMap.set(node.id, divWrap)
  }