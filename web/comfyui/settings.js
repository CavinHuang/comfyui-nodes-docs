import {$el} from "../../scripts/ui.js";
import { app } from "../../scripts/app.js";
import { ENABLED_SETTING_KEY } from './constants.js'

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
  
export const getSettingEnable = () => {
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


  