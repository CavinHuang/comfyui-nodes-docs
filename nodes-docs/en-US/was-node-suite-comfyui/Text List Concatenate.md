---
tags:
- List
- Text
---

# Text List Concatenate
## Documentation
- Class name: `Text List Concatenate`
- Category: `WAS Suite/Text`
- Output node: `False`

The node is designed to concatenate multiple lists into a single list. It processes optional lists provided as inputs and merges them in a sorted order, creating a unified list that combines all elements.
## Input types
### Required
### Optional
- **`list_a`**
    - Represents the first optional list to be concatenated. It plays a role in the overall merging process by contributing its elements to the final merged list.
    - Comfy dtype: `LIST`
    - Python dtype: `List[str]`
- **`list_b`**
    - Represents the second optional list to be concatenated. It contributes its elements to the final merged list, enhancing the overall content.
    - Comfy dtype: `LIST`
    - Python dtype: `List[str]`
- **`list_c`**
    - Represents the third optional list to be concatenated. Its elements are added to the final merged list, enriching the combined output.
    - Comfy dtype: `LIST`
    - Python dtype: `List[str]`
- **`list_d`**
    - Represents the fourth optional list to be concatenated. It adds its elements to the final merged list, completing the aggregation of content.
    - Comfy dtype: `LIST`
    - Python dtype: `List[str]`
## Output types
- **`list`**
    - Comfy dtype: `LIST`
    - The output is a single list that contains all elements from the input lists, merged in a sorted order.
    - Python dtype: `List[str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_List_Concatenate:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            },
            "optional": {
                "list_a": ("LIST", {"forceInput": True}),
                "list_b": ("LIST", {"forceInput": True}),
                "list_c": ("LIST", {"forceInput": True}),
                "list_d": ("LIST", {"forceInput": True}),
            }
        }

    RETURN_TYPES = ("LIST",)
    FUNCTION = "text_concatenate_list"

    CATEGORY = "WAS Suite/Text"

    def text_concatenate_list(self, **kwargs):
        merged_list: list[str] = []

        # Iterate over the received inputs in sorted order.
        for k in sorted(kwargs.keys()):
            v = kwargs[k]

            # Only process "list" input ports.
            if isinstance(v, list):
                merged_list += v

        return (merged_list,)

```
