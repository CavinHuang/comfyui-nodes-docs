
# Documentation
- Class name: SDXL Resolutions (JPS)
- Category: JPS Nodes/Settings
- Output node: False

该节点旨在根据预定义的分辨率集计算并返回宽度和高度尺寸。它支持各种纵横比和分辨率，便于为不同的图像方向和大小选择适当的尺寸。

# Input types
## Required
- resolution
    - 指定从预定义列表中选择所需的分辨率，影响宽度和高度的输出尺寸。此选择决定了生成图像的纵横比和大小。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- width
    - 基于所选分辨率计算得出的宽度尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 基于所选分辨率计算得出的高度尺寸。
    - Comfy dtype: INT
    - Python dtype: int


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
