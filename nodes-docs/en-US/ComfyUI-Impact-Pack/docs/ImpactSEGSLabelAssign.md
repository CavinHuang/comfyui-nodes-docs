---
tags:
- ImpactPack
- Segmentation
---

# SEGS Assign (label)
## Documentation
- Class name: `ImpactSEGSLabelAssign`
- Category: `ImpactPack/Util`
- Output node: `False`

This node is designed to assign user-defined labels to segments (SEGS) within a dataset, enhancing data annotation and organization for further processing or analysis.
## Input types
### Required
- **`segs`**
    - The segments to which labels will be assigned. It is crucial for organizing and categorizing data segments for analysis.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[str, List[Any]]`
- **`labels`**
    - A list of labels to be assigned to the segments, provided as a comma-separated string. This parameter is essential for the customization and detailed categorization of the segments.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`SEGS`**
    - Comfy dtype: `SEGS`
    - The segments with newly assigned labels, facilitating enhanced data management and analysis.
    - Python dtype: `Tuple[str, List[Any]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SEGSLabelAssign:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "segs": ("SEGS", ),
                        "labels": ("STRING", {"multiline": True, "placeholder": "List the label to be assigned in order of segs, separated by commas"}),
                     },
                }

    RETURN_TYPES = ("SEGS",)
    RETURN_NAMES = ("SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    @staticmethod
    def assign(segs, labels):
        labels = [label.strip() for label in labels]

        if len(labels) != len(segs[1]):
            print(f'Warning (SEGSLabelAssign): length of labels ({len(labels)}) != length of segs ({len(segs[1])})')

        labeled_segs = []

        idx = 0
        for x in segs[1]:
            if len(labels) > idx:
                x = x._replace(label=labels[idx])
            labeled_segs.append(x)
            idx += 1

        return ((segs[0], labeled_segs), )

    def doit(self, segs, labels):
        labels = labels.split(',')
        return SEGSLabelAssign.assign(segs, labels)

```
