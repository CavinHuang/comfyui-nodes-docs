---
tags:
- ImpactPack
- Segmentation
---

# SEGSOrderedFilterDetailerHookProvider
## Documentation
- Class name: `SEGSOrderedFilterDetailerHookProvider`
- Category: `ImpactPack/Util`
- Output node: `False`

The SEGSOrderedFilterDetailerHookProvider node is designed to create a detailer hook that filters and orders segmentation results based on specified criteria. It allows for the customization of the ordering and filtering process, enabling the selection and prioritization of segmentation results according to user-defined parameters.
## Input types
### Required
- **`target`**
    - Specifies the target attribute of the segmentation results to be filtered and ordered. This could be attributes like area, width, height, or coordinates, which determine the basis for filtering and ordering.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[List[str]]`
- **`order`**
    - Determines the order in which the segmentation results are sorted. A boolean value where True indicates descending order and False indicates ascending order.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`take_start`**
    - Defines the starting index from which to take the filtered and ordered segmentation results, allowing for pagination or skipping initial results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`take_count`**
    - Specifies the number of segmentation results to take after applying the filter and order, enabling control over the quantity of results returned.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`detailer_hook`**
    - Comfy dtype: `DETAILER_HOOK`
    - Returns a detailer hook configured to filter and order segmentation results based on the provided criteria.
    - Python dtype: `Tuple[DetailerHook]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SEGSOrderedFilterDetailerHookProvider:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "target": (["area(=w*h)", "width", "height", "x1", "y1", "x2", "y2"],),
                        "order": ("BOOLEAN", {"default": True, "label_on": "descending", "label_off": "ascending"}),
                        "take_start": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
                        "take_count": ("INT", {"default": 1, "min": 0, "max": sys.maxsize, "step": 1}),
                     },
                }

    RETURN_TYPES = ("DETAILER_HOOK", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, target, order, take_start, take_count):
        hook = hooks.SEGSOrderedFilterDetailerHook(target, order, take_start, take_count)
        return (hook, )

```
