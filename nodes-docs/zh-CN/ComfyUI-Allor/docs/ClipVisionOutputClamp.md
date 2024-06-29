---
tags:
- DataClamp

# ClipVisionOutputClamp
## 文档说明
### 类名：`ClipVisionOutputClamp`
### 分类：`clamp`
### 输出节点：`False`

`ClipVisionOutputClamp` 节点旨在原样传递 CLIP 视觉输出数据，作为确保处理 CLIP 视觉输出管道中数据一致性和完整性的实用工具。
## 输入类型
### 必需项
- **`clip_vision_output`**
    - 此参数表示要通过节点处理的 CLIP 视觉输出数据。对于数据在处理管道中的移动至关重要，以保持数据的完整性和一致性。
    - Comfy 数据类型：`CLIP_VISION_OUTPUT`
    - Python 数据类型：`tuple`

## 输出类型
- **`clip_vision_output`**
    - Comfy 数据类型：`CLIP_VISION_OUTPUT`
    - 此输出是未修改的 CLIP 视觉输出数据，从输入传递通过，确保管道中的数据一致性和完整性。
    - Python 数据类型：`tuple`

## 使用提示
- 硬件类型：`CPU`
- 常用节点：未知

## 源代码
```python
class ClipVisionOutputClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "clip_vision_output": ("CLIP_VISION_OUTPUT",),
            },
        }

    RETURN_TYPES = ("CLIP_VISION_OUTPUT",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, clip_vision_output):
        return (clip_vision_output,)
```