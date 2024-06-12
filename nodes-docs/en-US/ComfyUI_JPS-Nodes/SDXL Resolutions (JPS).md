---
tags:
- ImageResolution
- ImageTransformation
---

# SDXL Resolutions (JPS)
## Documentation
- Class name: `SDXL Resolutions (JPS)`
- Category: `JPS Nodes/Settings`
- Output node: `False`

This node is designed to calculate and return the width and height dimensions based on a predefined set of resolutions. It supports various aspect ratios and resolutions, facilitating the selection of appropriate dimensions for different image orientations and sizes.
## Input types
### Required
- **`resolution`**
    - Specifies the desired resolution from a predefined list, influencing the output dimensions of width and height. This selection determines the aspect ratio and size of the resulting image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`width`**
    - Comfy dtype: `INT`
    - The calculated width dimension based on the selected resolution.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The calculated height dimension based on the selected resolution.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CLIPTextEncodeSDXL](../../Comfy/Nodes/CLIPTextEncodeSDXL.md)
    - [Efficient Loader](../../efficiency-nodes-comfyui/Nodes/Efficient Loader.md)



## Source code
```python
class SDXL_Resolutions:
    resolution = ["square - 1024x1024 (1:1)","landscape - 1152x896 (4:3)","landscape - 1216x832 (3:2)","landscape - 1344x768 (16:9)","landscape - 1536x640 (21:9)", "portrait - 896x1152 (3:4)","portrait - 832x1216 (2:3)","portrait - 768x1344 (9:16)","portrait - 640x1536 (9:21)"]
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "resolution": (s.resolution,),
            }
        }
    RETURN_TYPES = ("INT","INT",)
    RETURN_NAMES = ("width", "height")
    FUNCTION = "get_resolutions"

    CATEGORY="JPS Nodes/Settings"

    def get_resolutions(self,resolution):
        width = 1024
        height = 1024
        width = int(width)
        height = int(height)
        if(resolution == "square - 1024x1024 (1:1)"):
            width = 1024
            height = 1024
        if(resolution == "landscape - 1152x896 (4:3)"):
            width = 1152
            height = 896
        if(resolution == "landscape - 1216x832 (3:2)"):
            width = 1216
            height = 832
        if(resolution == "landscape - 1344x768 (16:9)"):
            width = 1344
            height = 768
        if(resolution == "landscape - 1536x640 (21:9)"):
            width = 1536
            height = 640
        if(resolution == "portrait - 896x1152 (3:4)"):
            width = 896
            height = 1152
        if(resolution == "portrait - 832x1216 (2:3)"):
            width = 832
            height = 1216
        if(resolution == "portrait - 768x1344 (9:16)"):
            width = 768
            height = 1344
        if(resolution == "portrait - 640x1536 (9:21)"):
            width = 640
            height = 1536
            
        return(int(width),int(height))

```
