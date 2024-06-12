---
tags:
- ModelMerge
---

# Join Float Lists
## Documentation
- Class name: `Join Float Lists`
- Category: `List Stuff`
- Output node: `False`

This node is designed to merge two lists of floating-point numbers into a single list, maintaining the order of elements as they appear in the input lists. It facilitates operations that require the concatenation of numerical data, such as combining datasets or aggregating results from different sources.
## Input types
### Required
- **`In1`**
    - Represents the first list of floating-point numbers to be joined. Its elements are combined with those of 'In2' to form a single, concatenated list.
    - Comfy dtype: `FLOAT`
    - Python dtype: `List[float]`
- **`In2`**
    - Denotes the second list of floating-point numbers to be merged with 'In1'. The order of elements in 'In2' follows those of 'In1' in the concatenated output list.
    - Comfy dtype: `FLOAT`
    - Python dtype: `List[float]`
## Output types
- **`Joined`**
    - Comfy dtype: `FLOAT`
    - The concatenated list of floating-point numbers derived from 'In1' and 'In2'. This output preserves the order of elements as they appear in the input lists.
    - Python dtype: `Tuple[List[float]]`
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
