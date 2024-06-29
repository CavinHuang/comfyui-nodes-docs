---
tags:
- ImpactPack
- Segmentation
---

# SEGSLabelFilterDetailerHookProvider
## Documentation
- Class name: `SEGSLabelFilterDetailerHookProvider`
- Category: `ImpactPack/Util`
- Output node: `False`

The SEGSLabelFilterDetailerHookProvider node is designed to create and configure a detailer hook that filters segments based on specified labels. It allows for the customization of segment filtering through user-defined labels, enabling the targeting of specific segment types for processing or exclusion.
## Input types
### Required
- **`segs`**
    - The 'segs' parameter represents the segments to be filtered. It is crucial for determining which segments are subject to the filtering process.
    - Comfy dtype: `SEGS`
    - Python dtype: `SEGS`
- **`preset`**
    - The 'preset' parameter allows for the selection of a predefined set of labels or the inclusion of all detection labels. This flexibility aids in quickly configuring the filter based on common use cases or custom requirements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`labels`**
    - The 'labels' parameter specifies the types of segments to be allowed, separated by commas. It directly influences the filtering outcome by defining which segment labels are considered valid for inclusion.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`detailer_hook`**
    - Comfy dtype: `DETAILER_HOOK`
    - This output represents the configured detailer hook, ready to be applied for segment filtering based on the specified labels.
    - Python dtype: `DetailerHook`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SEGSLabelFilterDetailerHookProvider:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "segs": ("SEGS", ),
                        "preset": (['all'] + defs.detection_labels,),
                        "labels": ("STRING", {"multiline": True, "placeholder": "List the types of segments to be allowed, separated by commas"}),
                     },
                }

    RETURN_TYPES = ("DETAILER_HOOK", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, preset, labels):
        hook = hooks.SEGSLabelFilterDetailerHook(labels)
        return (hook, )

```
