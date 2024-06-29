---
tags:
- ImpactPack
- Segmentation
---

# SEGS Filter (label)
## Documentation
- Class name: `ImpactSEGSLabelFilter`
- Category: `ImpactPack/Util`
- Output node: `False`

The ImpactSEGSLabelFilter node is designed to filter segments (SEGS) based on specified labels, allowing for the selective processing of image segments. It supports custom label lists, including special groupings like 'eyes' or 'eyebrows', to fine-tune the segments that are included or excluded from further processing.
## Input types
### Required
- **`segs`**
    - The 'segs' parameter represents the segments to be filtered. It is crucial for determining which segments of the image are subject to processing based on the labels provided.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[Tuple[int, int], List[SEG]]`
- **`preset`**
    - The 'preset' parameter allows for the selection of predefined label sets or custom labels for filtering. It plays a key role in defining the scope of segments to be processed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`labels`**
    - The 'labels' parameter specifies the list of labels based on which the segments are filtered. It directly influences which segments are included or excluded, enabling targeted segment processing.
    - Comfy dtype: `STRING`
    - Python dtype: `List[str]`
## Output types
- **`filtered_SEGS`**
    - Comfy dtype: `SEGS`
    - This output contains the segments that match the specified labels, ready for further processing.
    - Python dtype: `Tuple[Tuple[int, int], List[SEG]]`
- **`remained_SEGS`**
    - Comfy dtype: `SEGS`
    - This output includes the segments that did not match the specified labels, potentially for alternative processing or exclusion.
    - Python dtype: `Tuple[Tuple[int, int], List[SEG]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SEGSLabelFilter:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "segs": ("SEGS", ),
                        "preset": (['all'] + defs.detection_labels, ),
                        "labels": ("STRING", {"multiline": True, "placeholder": "List the types of segments to be allowed, separated by commas"}),
                     },
                }

    RETURN_TYPES = ("SEGS", "SEGS",)
    RETURN_NAMES = ("filtered_SEGS", "remained_SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    @staticmethod
    def filter(segs, labels):
        labels = set([label.strip() for label in labels])

        if 'all' in labels:
            return (segs, (segs[0], []), )
        else:
            res_segs = []
            remained_segs = []

            for x in segs[1]:
                if x.label in labels:
                    res_segs.append(x)
                elif 'eyes' in labels and x.label in ['left_eye', 'right_eye']:
                    res_segs.append(x)
                elif 'eyebrows' in labels and x.label in ['left_eyebrow', 'right_eyebrow']:
                    res_segs.append(x)
                elif 'pupils' in labels and x.label in ['left_pupil', 'right_pupil']:
                    res_segs.append(x)
                else:
                    remained_segs.append(x)

        return ((segs[0], res_segs), (segs[0], remained_segs), )

    def doit(self, segs, preset, labels):
        labels = labels.split(',')
        return SEGSLabelFilter.filter(segs, labels)

```
