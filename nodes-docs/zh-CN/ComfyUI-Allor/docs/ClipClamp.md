---
tags:
- DataClamp

# ClipClamp
## 文档说明
### 类名：`ClipClamp`
### 分类：`clamp`
### 输出节点：`False`

`ClipClamp` 节点旨在处理 CLIP 数据而不进行修改，作为数据处理管道中的占位符或检查点。
## 输入类型
### 必需项
- **`clip`**
    - `clip` 参数是此节点处理的 CLIP 数据。它充当直接通过器，确保 CLIP 数据在节点中保持不变。
    - Comfy 数据类型：`CLIP`
    - Python 数据类型：`tuple`

## 输出类型
- **`clip`**
    - Comfy 数据类型：`CLIP`
    - 返回未修改的 CLIP 数据，维护其完整性以供进一步处理或分析。
    - Python 数据类型：`tuple`

## 使用提示
- 硬件类型：`CPU`
- 常用节点：未知

## 源代码
```python
class ClipClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "clip": ("CLIP",),
            },
        }

    RETURN_TYPES = ("CLIP",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, clip):
        return (clip,)
```