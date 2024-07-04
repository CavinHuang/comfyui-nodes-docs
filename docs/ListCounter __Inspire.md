
# Documentation
- Class name: ListCounter __Inspire
- Category: InspirePack/Util
- Output node: False

ListCounter节点设计用于维护和递增与唯一标识符相关联的计数，允许跟踪列表中特定动作或项目的出现次数或迭代。它提供了一种生成顺序计数的机制，该计数可以根据唯一标识符重置或继续，这在需要在动态或迭代上下文中进行计数的操作中非常有用。

# Input types
## Required
- signal
    - signal输入作为计数操作的触发器，指示何时增加计数。它对于启动计数增量过程至关重要。
    - Comfy dtype: *
    - Python dtype: Any
- base_value
    - base_value参数设置计数的起点，允许计数从零以外的指定值开始。这种灵活性对于需要自定义计数起点的操作很有用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 返回增量后的当前计数，已根据基础值进行调整。这个输出对于跟踪指定上下文中计数的进展至关重要。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ListCounter:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "signal": (utils.any_typ,),
                    "base_value": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    },
                "hidden": {"unique_id": "UNIQUE_ID"},
                }

    RETURN_TYPES = ("INT",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, signal, base_value, unique_id):
        if unique_id not in list_counter_map:
            count = 0
        else:
            count = list_counter_map[unique_id]

        list_counter_map[unique_id] = count + 1

        return (count + base_value, )

```
