---
tags:
- ImpactPack
- Segmentation
---

# SEGSRangeFilterDetailerHookProvider
## Documentation
- Class name: `SEGSRangeFilterDetailerHookProvider`
- Category: `ImpactPack/Util`
- Output node: `False`

The SEGSRangeFilterDetailerHookProvider node is designed to create and configure a detailer hook that filters segments based on a range criteria. It allows for the dynamic filtering of segments within specified minimum and maximum values, tailored to various segment properties such as area, width, height, and coordinates. This node is instrumental in refining segment selection for further processing or analysis, enhancing the precision and relevance of the output.
## Input types
### Required
- **`target`**
    - Specifies the segment property to be filtered on, such as area, width, height, or coordinates. This parameter determines the basis for the range filtering operation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`mode`**
    - Determines the filtering mode, either including segments within the specified range ('inside') or excluding them ('outside'). This affects how the range criteria are applied to the segment selection.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`min_value`**
    - Sets the minimum value of the range for the specified segment property. Segments with values below this threshold can be either included or excluded based on the mode.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_value`**
    - Defines the maximum value of the range for the specified segment property. Segments with values above this threshold can be either included or excluded based on the mode.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`detailer_hook`**
    - Comfy dtype: `DETAILER_HOOK`
    - Produces a configured detailer hook capable of filtering segments based on the specified range criteria. This hook can be applied to segment data to refine the selection process.
    - Python dtype: `hooks.SEGSRangeFilterDetailerHook`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SEGSRangeFilterDetailerHookProvider:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "target": (["area(=w*h)", "width", "height", "x1", "y1", "x2", "y2", "length_percent"],),
                        "mode": ("BOOLEAN", {"default": True, "label_on": "inside", "label_off": "outside"}),
                        "min_value": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
                        "max_value": ("INT", {"default": 67108864, "min": 0, "max": sys.maxsize, "step": 1}),
                     },
                }

    RETURN_TYPES = ("DETAILER_HOOK", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, target, mode, min_value, max_value):
        hook = hooks.SEGSRangeFilterDetailerHook(target, mode, min_value, max_value)
        return (hook, )

```
