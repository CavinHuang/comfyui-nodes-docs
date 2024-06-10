---
tags:
- DepthMap
- Image
- ImageFilter
- ImagePreprocessing
---

# CtrlNet CannyEdge Settings (JPS)
## Documentation
- Class name: `CtrlNet CannyEdge Settings (JPS)`
- Category: `JPS Nodes/Settings`
- Output node: `False`

This node is designed to configure settings for the Canny Edge detection process within a pipeline, allowing users to specify parameters such as edge detection strength, start and end thresholds, and high and low threshold values.
## Input types
### Required
- **`cannyedge_from`**
    - Specifies the source of the image for Canny Edge detection, allowing selection from predefined sources such as 'Source Image', 'Support Image', or 'Support Direct'.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`cannyedge_strength`**
    - Determines the intensity of the edge detection process, with a range allowing for fine-tuning of the edge detection's sensitivity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cannyedge_start`**
    - Sets the starting threshold for edge detection, enabling control over the minimum edge strength that will be considered.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cannyedge_end`**
    - Defines the ending threshold for edge detection, allowing users to limit the maximum edge strength that will be detected.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cannyedge_low`**
    - Specifies the low threshold value for the hysteresis procedure in Canny Edge detection, influencing the detection of weaker edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cannyedge_high`**
    - Sets the high threshold value for the hysteresis procedure in Canny Edge detection, affecting the detection of stronger edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`cannyedge_settings`**
    - Comfy dtype: `BASIC_PIPE`
    - Outputs the configured settings for Canny Edge detection as a tuple, ready to be used in the detection process.
    - Python dtype: `Tuple[int, float, float, float, int, int]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CtrlNet_CannyEdge_Settings:
    cannyedgefrom = ["Source Image", "Support Image", "Support Direct"]
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "cannyedge_from": (s.cannyedgefrom,),
                "cannyedge_strength": ("FLOAT", {"default": 1.00, "min": 0.00, "max": 10.00, "step": 0.10}),
                "cannyedge_start": ("FLOAT", {"default": 0.000, "min": 0.000, "max": 1.000, "step": 0.05}),
                "cannyedge_end": ("FLOAT", {"default": 1.000, "min": 0.000, "max": 1.000, "step": 0.05}),
                "cannyedge_low": ("INT", {"default": 100, "min": 0, "max": 255, "step": 1}),
                "cannyedge_high": ("INT", {"default": 200, "min": 0, "max": 255, "step": 1}),
            }   
        }
    RETURN_TYPES = ("BASIC_PIPE",) 
    RETURN_NAMES = ("cannyedge_settings",)
    FUNCTION = "get_ctrlnet_cannyedge"

    CATEGORY="JPS Nodes/Settings"

    def get_ctrlnet_cannyedge(self, cannyedge_from, cannyedge_strength, cannyedge_start, cannyedge_end, cannyedge_low, cannyedge_high):

        cannyedge_source = int (1)
        if (cannyedge_from == "Support Image"):
            cannyedge_source = int(2)
        if (cannyedge_from == "Support Direct"):
            cannyedge_source = int(3)
        
        cannyedge_settings = cannyedge_source, cannyedge_strength, cannyedge_start, cannyedge_end, cannyedge_low, cannyedge_high

        return(cannyedge_settings,)

```
