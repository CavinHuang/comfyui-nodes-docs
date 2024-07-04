
# Documentation
- Class name: Kep_ReverseList
- Category: List Stuff
- Output node: False
- Repo Ref: https://github.com/city96/ComfyUI_ExtraFormatNodes

Kep_ReverseList节点用于反转列表中元素的顺序。它接收一个列表作为输入，并返回一个新列表，其中元素顺序与原列表相反，同时保持元素的原始数据类型不变。

# Input types
## Required
- In
    - 需要反转的输入列表。这个参数对于操作至关重要，因为它决定了将被反转的元素序列。
    - Comfy dtype: *
    - Python dtype: List[Any]

# Output types
- Reversed
    - 输出的反转后的列表，其元素顺序与输入列表相反。
    - Comfy dtype: *
    - Python dtype: Tuple[List[Any]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ReverseList:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(self) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {"In": (any_type, {})},
        }

    RETURN_TYPES = (any_type,)
    RETURN_NAMES = ("Reversed",)
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "reverse_list"

    CATEGORY = "List Stuff"

    def reverse_list(self, In: List[Any]) -> Tuple[List[Any]]:
        return (In[::-1],)

```
