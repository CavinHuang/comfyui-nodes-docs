---
tags:
- DataClamp

# ControlNetClamp
## 文档说明
### 类名：`ControlNetClamp`
### 分类：`clamp`
### 输出节点：`False`

`ControlNetClamp` 节点旨在原样传递控制网络数据，作为确保控制网络信息在数据处理管道中的完整性和原始状态的“钳子”。
## 输入类型
### 必需项
- **`control_net_clamp`**
    - 表示要以不变形式通过的数据，强调了节点在保持控制网络信息原始状态方面的作用。
    - Comfy 数据类型：`CONTROL_NET`
    - Python 数据类型：`tuple`

## 输出类型
- **`control_net`**
    - Comfy 数据类型：`CONTROL_NET`
    - 输出未修改的控制网络数据，维持原始输入的完整性。
    - Python 数据类型：`tuple`

## 使用提示
- 硬件类型：`CPU`
- 常用节点：未知

## 源代码
```python
class ControlNetClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "control_net_clamp": ("CONTROL_NET",),
            },
        }

    RETURN_TYPES = ("CONTROL_NET",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, control_net_clamp):
        return (control_net_clamp,)
```