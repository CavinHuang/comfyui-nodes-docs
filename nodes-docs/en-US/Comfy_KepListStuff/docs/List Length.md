---
tags:
- Text
---

# List Length
## Documentation
- Class name: `List Length`
- Category: `List Stuff`
- Output node: `False`

The List Length node is designed to calculate the length of a given list. It abstracts the process of determining how many elements are contained within a list, providing a straightforward way to obtain this information.
## Input types
### Required
- **`In`**
    - Represents the input list whose length is to be calculated. The length of this list directly determines the output of the node.
    - Comfy dtype: `*`
    - Python dtype: `List[Any]`
## Output types
- **`Length`**
    - Comfy dtype: `INT`
    - The output is the length of the input list, indicating how many elements it contains.
    - Python dtype: `int`
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
