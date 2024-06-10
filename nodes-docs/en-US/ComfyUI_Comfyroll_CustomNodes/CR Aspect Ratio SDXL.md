---
tags:
- AspectRatio
- ImageSize
- ImageTransformation
---

# CR Aspect Ratio SDXL (Legacy)
## Documentation
- Class name: `CR Aspect Ratio SDXL`
- Category: `🧩 Comfyroll Studio/✨ Essential/💀 Legacy`
- Output node: `False`

This node dynamically adjusts the aspect ratio of images, supporting a variety of predefined aspect ratios for different media formats such as cinema, portrait, and landscape. It caters specifically to the requirements of SDXL models, facilitating the resizing and reshaping of images according to the selected aspect ratio.
## Input types
### Required
- **`width`**
    - The 'width' parameter specifies the initial width of the image before aspect ratio adjustments. It's essential for calculating the new dimensions based on the selected aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The 'height' parameter specifies the initial height of the image before aspect ratio adjustments. It's crucial for determining the new dimensions in line with the chosen aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`aspect_ratio`**
    - This parameter allows selection from a range of predefined aspect ratios, influencing the final dimensions of the image to match specific media formats.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`swap_dimensions`**
    - When enabled, this parameter swaps the width and height of the image, effectively rotating it 90 degrees.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_factor1`**
    - This parameter specifies the first factor by which the image's dimensions are upscaled after adjusting the aspect ratio.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`upscale_factor2`**
    - This parameter specifies the second factor by which the image's dimensions are upscaled, offering additional control over the final image size.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`batch_size`**
    - Defines the number of images processed in a batch, affecting the computation and memory usage.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`INT`**
    - Comfy dtype: `INT`
    - The adjusted width of the image after applying the aspect ratio changes.
    - Python dtype: `int`
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The adjusted height of the image after applying the aspect ratio changes.
    - Python dtype: `float`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional information and guidance on using the aspect ratio node.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_AspectRatio_SDXL:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "width": ("INT", {"default": 1024, "min": 64, "max": 2048}),
                "height": ("INT", {"default": 1024, "min": 64, "max": 2048}),
                "aspect_ratio": (["custom", "1:1 square 1024x1024", "3:4 portrait 896x1152", "5:8 portrait 832x1216", "9:16 portrait 768x1344",
                "9:21 portrait 640x1536", "4:3 landscape 1152x896", "3:2 landscape 1216x832", "16:9 landscape 1344x768", "21:9 landscape 1536x640"],),
                "swap_dimensions": (["Off", "On"],),
                "upscale_factor1": ("FLOAT", {"default": 1, "min": 1, "max": 2000}),
                "upscale_factor2": ("FLOAT", {"default": 1, "min": 1, "max": 2000}),
                "batch_size": ("INT", {"default": 1, "min": 1, "max": 64})
            }
        }
    RETURN_TYPES = ("INT", "INT", "FLOAT", "FLOAT", "INT", "STRING", )
    RETURN_NAMES = ("INT", "INT", "FLOAT", "FLOAT", "INT", "show_help", )
    #RETURN_NAMES = ("Width", "Height")
    FUNCTION = "Aspect_Ratio"

    CATEGORY = icons.get("Comfyroll/Essential/Legacy")

    def Aspect_Ratio(self, width, height, aspect_ratio, swap_dimensions, upscale_factor1, upscale_factor2, batch_size):
       
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Legacy-Nodes#cr-aspect-ratio-sdxl"

        if aspect_ratio == "1:1 square 1024x1024":
            width, height = 1024, 1024
        elif aspect_ratio == "3:4 portrait 896x1152":
            width, height = 896, 1152
        elif aspect_ratio == "5:8 portrait 832x1216":
            width, height = 832, 1216
        elif aspect_ratio == "9:16 portrait 768x1344":
            width, height = 768, 1344
        elif aspect_ratio == "9:21 portrait 640x1536":
            width, height = 640, 1536
        elif aspect_ratio == "4:3 landscape 1152x896":
            width, height = 1152, 896
        elif aspect_ratio == "3:2 landscape 1216x832":
            width, height = 1216, 832
        elif aspect_ratio == "16:9 landscape 1344x768":
            width, height = 1344, 768
        elif aspect_ratio == "21:9 landscape 1536x640":
            width, height = 1536, 640
            
        if swap_dimensions == "On":
            return(height, width, upscale_factor1, upscale_factor2, batch_size,show_help,)
        else:
            return(width, height, upscale_factor1, upscale_factor2, batch_size,show_help,)        

```
