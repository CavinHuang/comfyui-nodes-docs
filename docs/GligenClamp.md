---
tags:
- DataClamp

# GligenClamp
## 文档说明
### 类名：`GligenClamp`
### 分类：`clamp`
### 输出节点：`False`

`GligenClamp` 节点旨在原样传递 GLIGEN 数据，作为数据处理管道中的一个占位符或检查点。它确保 GLIGEN 数据在经过不同阶段的处理时保持完整，充当控制机制。
## 输入类型
### 必需项
- **`gligen`**
    - `gligen` 参数表示要被钳制的 GLIGEN 数据。此节点作为中转站，确保在整个过程中 GLIGEN 数据保持不变。
    - Comfy 数据类型：`GLIGEN`
    - Python 数据类型：`tuple`

## 输出类型
- **`gligen`**
    - Comfy 数据类型：`GLIGEN`
    - 返回未修改的 GLIGEN 数据，确保其在处理管道中保持完整性。
    - Python 数据类型：`tuple`

## 使用提示
- 硬件类型：`CPU`
- 常用节点：未知

## 源代码
```python
class GligenClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "gligen": ("GLIGEN",),
            },
        }

    RETURN_TYPES = ("GLIGEN",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, gligen):
        return (gligen,)
```