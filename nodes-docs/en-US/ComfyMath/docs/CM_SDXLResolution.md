---
tags:
- ImageResolution
- ImageTransformation
---

# SDXLResolution
## Documentation
- Class name: `CM_SDXLResolution`
- Category: `math/graphics`
- Output node: `False`

This node is designed to convert a string representation of a resolution into its numerical width and height components. It serves as a utility within the math/graphics category, facilitating the manipulation and analysis of image resolutions by breaking down their string format into distinct numerical values.
## Input types
### Required
- **`resolution`**
    - The 'resolution' parameter takes a string input representing an image resolution in the format 'widthxheight'. It is crucial for determining the output numerical values of width and height, effectively translating textual resolution data into a form that can be directly utilized in image processing tasks.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`width`**
    - Comfy dtype: `INT`
    - The 'width' output represents the numerical width component of the input resolution string.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The 'height' output represents the numerical height component of the input resolution string.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Eff. Loader SDXL](../../efficiency-nodes-comfyui/Nodes/Eff. Loader SDXL.md)
    - intToFloat _O



## Source code
```python
class SDXLResolution:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "resolution": (
                    [f"{res[0]}x{res[1]}" for res in SDXL_SUPPORTED_RESOLUTIONS],
                )
            }
        }

    RETURN_TYPES = ("INT", "INT")
    RETURN_NAMES = ("width", "height")
    FUNCTION = "op"
    CATEGORY = "math/graphics"

    def op(self, resolution: str) -> tuple[int, int]:
        width, height = resolution.split("x")
        return (int(width), int(height))

```
