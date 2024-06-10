---
tags:
- ImpactPack
- Segmentation
---

# SEGS Filter (ordered)
## Documentation
- Class name: `ImpactSEGSOrderedFilter`
- Category: `ImpactPack/Util`
- Output node: `False`

The ImpactSEGSOrderedFilter node is designed to filter and order segmentation data based on specified criteria. It allows for the sorting of segments according to various attributes such as area, width, height, or coordinates, and enables the selection of a subset of these segments based on their order.
## Input types
### Required
- **`segs`**
    - The segmentation data to be filtered and ordered. This is the primary input over which the ordering and filtering operations are performed.
    - Comfy dtype: `SEGS`
    - Python dtype: `List[SEG]`
- **`target`**
    - Specifies the attribute based on which the segments should be ordered. This can include attributes like area, width, height, or coordinates, impacting how the segments are sorted.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`order`**
    - Determines the order in which the segments are sorted. A boolean value where True indicates descending order and False indicates ascending order.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`take_start`**
    - Defines the starting index from which segments should be taken after ordering, allowing for the selection of a specific subset of segments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`take_count`**
    - Specifies the number of segments to take starting from the 'take_start' index, enabling control over the size of the resulting segment subset.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`filtered_SEGS`**
    - Comfy dtype: `SEGS`
    - The segments that have been filtered and ordered according to the specified criteria.
    - Python dtype: `List[SEG]`
- **`remained_SEGS`**
    - Comfy dtype: `SEGS`
    - The segments that did not meet the filtering criteria and were not included in the ordered subset.
    - Python dtype: `List[SEG]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ImpactDilateMaskInSEGS](../../ComfyUI-Impact-Pack/Nodes/ImpactDilateMaskInSEGS.md)
    - [DetailerForEachDebug](../../ComfyUI-Impact-Pack/Nodes/DetailerForEachDebug.md)



## Source code
```python
class SEGSOrderedFilter:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "segs": ("SEGS", ),
                        "target": (["area(=w*h)", "width", "height", "x1", "y1", "x2", "y2"],),
                        "order": ("BOOLEAN", {"default": True, "label_on": "descending", "label_off": "ascending"}),
                        "take_start": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
                        "take_count": ("INT", {"default": 1, "min": 0, "max": sys.maxsize, "step": 1}),
                     },
                }

    RETURN_TYPES = ("SEGS", "SEGS",)
    RETURN_NAMES = ("filtered_SEGS", "remained_SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, segs, target, order, take_start, take_count):
        segs_with_order = []

        for seg in segs[1]:
            x1 = seg.crop_region[0]
            y1 = seg.crop_region[1]
            x2 = seg.crop_region[2]
            y2 = seg.crop_region[3]

            if target == "area(=w*h)":
                value = (y2 - y1) * (x2 - x1)
            elif target == "width":
                value = x2 - x1
            elif target == "height":
                value = y2 - y1
            elif target == "x1":
                value = x1
            elif target == "x2":
                value = x2
            elif target == "y1":
                value = y1
            else:
                value = y2

            segs_with_order.append((value, seg))

        if order:
            sorted_list = sorted(segs_with_order, key=lambda x: x[0], reverse=True)
        else:
            sorted_list = sorted(segs_with_order, key=lambda x: x[0], reverse=False)

        result_list = []
        remained_list = []

        for i, item in enumerate(sorted_list):
            if take_start <= i < take_start + take_count:
                result_list.append(item[1])
            else:
                remained_list.append(item[1])

        return ((segs[0], result_list), (segs[0], remained_list), )

```
