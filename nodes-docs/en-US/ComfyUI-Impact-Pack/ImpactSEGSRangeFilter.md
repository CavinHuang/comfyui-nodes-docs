---
tags:
- ImpactPack
- Segmentation
---

# SEGS Filter (range)
## Documentation
- Class name: `ImpactSEGSRangeFilter`
- Category: `ImpactPack/Util`
- Output node: `False`

The ImpactSEGSRangeFilter node is designed to filter segments (SEGS) based on specified range criteria. It evaluates each segment against given parameters such as area, width, height, or specific coordinates, and segregates them into new segments that meet or do not meet the criteria. This functionality is crucial for refining segment selection based on geometric properties.
## Input types
### Required
- **`segs`**
    - The input segments to be filtered. It's the primary data upon which the range filtering operation is performed.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[str, List[SEG]]`
- **`target`**
    - Specifies the geometric property (e.g., area, width, height, x1, y1, x2, y2, length_percent) based on which the segments will be filtered.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`mode`**
    - Determines the filtering mode. If true, segments within the specified range are included; if false, segments outside the range are included.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`min_value`**
    - The minimum value of the specified geometric property for a segment to be included or excluded, depending on the mode.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_value`**
    - The maximum value of the specified geometric property for a segment to be included or excluded, depending on the mode.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`filtered_SEGS`**
    - Comfy dtype: `SEGS`
    - Returns the segments that meet the specified criteria.
    - Python dtype: `Tuple[str, List[SEG]]`
- **`remained_SEGS`**
    - Comfy dtype: `SEGS`
    - Returns the segments that do not meet the specified criteria.
    - Python dtype: `Tuple[str, List[SEG]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SEGSRangeFilter:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "segs": ("SEGS", ),
                        "target": (["area(=w*h)", "width", "height", "x1", "y1", "x2", "y2", "length_percent"],),
                        "mode": ("BOOLEAN", {"default": True, "label_on": "inside", "label_off": "outside"}),
                        "min_value": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
                        "max_value": ("INT", {"default": 67108864, "min": 0, "max": sys.maxsize, "step": 1}),
                     },
                }

    RETURN_TYPES = ("SEGS", "SEGS",)
    RETURN_NAMES = ("filtered_SEGS", "remained_SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, segs, target, mode, min_value, max_value):
        new_segs = []
        remained_segs = []

        for seg in segs[1]:
            x1 = seg.crop_region[0]
            y1 = seg.crop_region[1]
            x2 = seg.crop_region[2]
            y2 = seg.crop_region[3]

            if target == "area(=w*h)":
                value = (y2 - y1) * (x2 - x1)
            elif target == "length_percent":
                h = y2 - y1
                w = x2 - x1
                value = max(h/w, w/h)*100
                print(f"value={value}")
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

            if mode and min_value <= value <= max_value:
                print(f"[in] value={value} / {mode}, {min_value}, {max_value}")
                new_segs.append(seg)
            elif not mode and (value < min_value or value > max_value):
                print(f"[out] value={value} / {mode}, {min_value}, {max_value}")
                new_segs.append(seg)
            else:
                remained_segs.append(seg)
                print(f"[filter] value={value} / {mode}, {min_value}, {max_value}")

        return ((segs[0], new_segs), (segs[0], remained_segs), )

```
