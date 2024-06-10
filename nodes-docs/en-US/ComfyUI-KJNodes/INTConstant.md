---
tags:
- Constant
---

# INT Constant
## Documentation
- Class name: `INTConstant`
- Category: `KJNodes/constants`
- Output node: `False`

The INTConstant node provides a mechanism to define a constant integer value within a node-based programming environment. It allows for the specification of a static integer value that can be used as a constant input across various computational graphs or pipelines.
## Input types
### Required
- **`value`**
    - Specifies the integer value to be used as a constant. This value serves as a fixed input that influences the node's output by providing a predetermined integer.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`value`**
    - Comfy dtype: `INT`
    - Outputs the specified constant integer value. This output can be utilized as a fixed input in subsequent nodes or processes within the computational graph.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)
    - SetNode
    - [ImageGrabPIL](../../ComfyUI-KJNodes/Nodes/ImageGrabPIL.md)
    - [PixelPerfectResolution](../../comfyui_controlnet_aux/Nodes/PixelPerfectResolution.md)
    - [EmptyLatentImage](../../Comfy/Nodes/EmptyLatentImage.md)



## Source code
```python
class INTConstant:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "value": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
        },
        }
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("value",)
    FUNCTION = "get_value"
    CATEGORY = "KJNodes/constants"

    def get_value(self, value):
        return (value,)

```
