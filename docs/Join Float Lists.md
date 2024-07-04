
# Documentation
- Class name: Join Float Lists
- Category: List Stuff
- Output node: False

该节点旨在将两个浮点数列表合并成一个单一列表，保持输入列表中元素的原始顺序。它有助于需要连接数值数据的操作，如合并数据集或聚合来自不同来源的结果。

# Input types
## Required
- In1
    - 代表要连接的第一个浮点数列表。它的元素与'In2'的元素组合形成一个单一的连接列表。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
- In2
    - 表示要与'In1'合并的第二个浮点数列表。'In2'中的元素在连接后的输出列表中跟随'In1'的元素。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]

# Output types
- Joined
    - 由'In1'和'In2'派生的连接浮点数列表。此输出保持输入列表中元素出现的顺序。
    - Comfy dtype: FLOAT
    - Python dtype: Tuple[List[float]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class JoinFloatLists:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(self) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "In1": ("FLOAT", {"forceInput": True}),
                "In2": ("FLOAT", {"forceInput": True}),
            },
        }

    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("Joined",)
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "join_lists"

    CATEGORY = "List Stuff"

    def join_lists(self, In1: List[float], In2: List[float]) -> Tuple[List[float]]:
        return (In1 + In2,)

```
