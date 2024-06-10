---
tags:
- DepthMap
- Image
- ImageFilter
- ImagePreprocessing
---

# CtrlNet CannyEdge Pipe (JPS)
## Documentation
- Class name: `CtrlNet CannyEdge Pipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

The CtrlNet CannyEdge Pipe node is designed to process settings for Canny Edge detection, returning various parameters such as source, strength, start, end, and threshold values. This node is part of the JPS Nodes/Pipes category, focusing on image processing and manipulation by applying the Canny Edge detection algorithm.
## Input types
### Required
- **`cannyedge_settings`**
    - Specifies the configuration for Canny Edge detection, including source, strength, start and end positions, and low and high threshold values. This input is crucial for determining how the edge detection is performed and its sensitivity.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[int, float, float, float, int, int]`
## Output types
- **`cannyedge_source`**
    - Comfy dtype: `INT`
    - The source of the image for Canny Edge detection.
    - Python dtype: `int`
- **`cannyedge_strength`**
    - Comfy dtype: `FLOAT`
    - The strength of the Canny Edge detection effect.
    - Python dtype: `float`
- **`cannyedge_start`**
    - Comfy dtype: `FLOAT`
    - The start position for applying the Canny Edge detection.
    - Python dtype: `float`
- **`cannyedge_end`**
    - Comfy dtype: `FLOAT`
    - The end position for applying the Canny Edge detection.
    - Python dtype: `float`
- **`cannyedge_low`**
    - Comfy dtype: `INT`
    - The low threshold value for the Canny Edge detection.
    - Python dtype: `int`
- **`cannyedge_high`**
    - Comfy dtype: `INT`
    - The high threshold value for the Canny Edge detection.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CtrlNet_CannyEdge_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "cannyedge_settings": ("BASIC_PIPE",)
            },
        }
    RETURN_TYPES = ("INT", "FLOAT", "FLOAT", "FLOAT", "INT", "INT", )
    RETURN_NAMES = ("cannyedge_source", "cannyedge_strength", "cannyedge_start", "cannyedge_end", "cannyedge_low", "cannyedge_high",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Pipes"

    def give_values(self,cannyedge_settings):
        
        cannyedge_source, cannyedge_strength, cannyedge_start, cannyedge_end, cannyedge_low, cannyedge_high = cannyedge_settings

        return(cannyedge_source, cannyedge_strength, cannyedge_start, cannyedge_end, cannyedge_low, cannyedge_high,)

```
