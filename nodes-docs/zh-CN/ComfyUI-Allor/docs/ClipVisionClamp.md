---
tags:
- DataClamp

# ClipVisionClamp
## 文档说明
### 类名：`ClipVisionClamp`
### 分类：`clamp`
### 输出节点：`False`

`ClipVisionClamp` 节点旨在处理并以原样传递 CLIP_VISION 数据，作为管道中 CLIP_VISION 数据的直接通道。
## 输入类型
### 必需项
- **`clip_vision`**
    - 此参数表示要通过节点处理的 CLIP_VISION 数据。对于节点的操作至关重要，因为它直接处理输入数据而不进行任何修改，确保整个流程中 CLIP_VISION 数据的完整性得到维护。
    - Comfy 数据类型：`CLIP_VISION`
    - Python 数据类型：`tuple`

## 输出类型
- **`clip_vision`**
    - Comfy 数据类型：`CLIP_VISION`
    - 输出接收到的未修改 CLIP_VISION 数据，确保数据的完整性和一致性，以供进一步处理或在后续节点中使用。
    - Python 数据类型：`tuple`

## 使用提示
- 硬件类型：`CPU`
- 常用节点：未知

## 源代码
```python
class ClipVisionClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "clip_vision": ("CLIP_VISION",),
            },
        }

    RETURN_TYPES = ("CLIP_VISION",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, clip_vision):
        return (clip_vision,)
```