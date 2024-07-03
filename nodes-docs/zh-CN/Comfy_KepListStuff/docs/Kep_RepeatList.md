
# Documentation
- Class name: `Kep_RepeatList`
- Category: `List Stuff`
- Output node: `False`

Kep_RepeatList节点旨在将给定列表重复指定次数，有效地通过重复其元素来扩展列表。该节点属于"List Stuff"类别，强调了它在数据处理流程中操作列表结构的实用性。

# Input types
## Required
- **`In`**
    - 需要重复的输入列表。它作为基础列表，其元素将根据指定的次数进行复制。
    - Comfy dtype: `*`
    - Python dtype: `List[Any]`
- **`Count`**
    - 指定输入列表应重复的次数。这个参数通过将原始列表的长度相乘来决定输出列表的最终长度。
    - Comfy dtype: `INT`
    - Python dtype: `int`

# Output types
- **`Extended`**
    - 通过将输入列表元素重复指定次数而产生的输出列表。它代表了原始列表的扩展版本。
    - Comfy dtype: `*`
    - Python dtype: `Tuple[List[Any]]`


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RepeatList:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(self) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "In": (any_type, {}),
                "Count": ("INT", {"default": 0, "min": 0, "max": 99999, "step": 1}),
            },
        }

    RETURN_TYPES = (any_type,)
    RETURN_NAMES = ("Extended",)
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "repeat_list"

    CATEGORY = "List Stuff"

    def repeat_list(self, In: List[Any], Count: List[int]) -> Tuple[List[Any]]:
        if len(Count) != 1:
            raise ValueError("Count does not support multiple values")
        return (In * Count[0],)

```
