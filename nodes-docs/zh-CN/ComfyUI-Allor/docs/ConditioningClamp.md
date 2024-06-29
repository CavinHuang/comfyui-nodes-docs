---
tags:
- DataClamp

# ConditioningClamp
## 文档说明
### 类名：`ConditioningClamp`
### 分类：`clamp`
### 输出节点：`False`

`ConditioningClamp` 节点旨在原样传递条件数据，作为数据处理管道中的占位符或检查点。
## 输入类型
### 必需项
- **`conditioning`**
    - 此参数表示通过节点不变地传递的条件数据，强调了其在维护数据流完整性的角色。
    - Comfy 数据类型：`CONDITIONING`
    - Python 数据类型：`List[Tuple[torch.Tensor, Dict[str, Any]]]`

## 输出类型
- **`conditioning`**
    - Comfy 数据类型：`CONDITIONING`
    - 输出未修改的条件数据，强调了节点作为管道中透明导管的功能。
    - Python 数据类型：`List[Tuple[torch.Tensor, Dict[str, Any]]]`

## 使用提示
- 硬件类型：`CPU`
- 常用节点：未知

## 源代码
```python
class ConditioningClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "conditioning": ("CONDITIONING",),
            },
        }

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, conditioning):
        return (conditioning,)
```