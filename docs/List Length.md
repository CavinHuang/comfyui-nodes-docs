
# Documentation
- Class name: List Length
- Category: List Stuff
- Output node: False

List Length节点用于计算给定列表的长度。它简化了确定列表中包含多少元素的过程，提供了一种直接获取这一信息的简便方法。

# Input types
## Required
- In
    - 代表需要计算长度的输入列表。这个列表的长度直接决定了节点的输出结果。
    - Comfy dtype: *
    - Python dtype: List[Any]

# Output types
- Length
    - 输出是输入列表的长度，表示列表包含的元素数量。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ListLengthNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(self) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {"In": (any_type, {})},
        }

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("Length",)
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (False,)
    FUNCTION = "get_len"

    CATEGORY = "List Stuff"

    def get_len(self, In: List[Any]) -> Tuple[int]:
        return (len(In),)

```
