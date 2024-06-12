---
tags:
- Image
- Pipeline
---

# 🛩️ CR Image Pipe Edit
## Documentation
- Class name: `CR Image Pipe Edit`
- Category: `🧩 Comfyroll Studio/✨ Essential/🎷 Pipe/🛩️ Image`
- Output node: `False`

This node is designed for editing the parameters of an image pipeline, allowing users to modify or replace the image and its attributes such as width, height, and upscale factor within the pipeline.
## Input types
### Required
- **`pipe`**
    - The current state of the image pipeline, encapsulating the image and its attributes that may be modified or replaced.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Tuple[Any, int, int, float]`
### Optional
- **`image`**
    - An optional new image to replace the current one in the pipeline.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Any`
- **`width`**
    - An optional new width for the image, overriding the current width in the pipeline.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - An optional new height for the image, overriding the current height in the pipeline.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`upscale_factor`**
    - An optional new upscale factor to apply to the image, overriding the current upscale factor in the pipeline.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The updated image pipeline, reflecting any modifications or replacements made to the image and its attributes.
    - Python dtype: `Tuple[Any, int, int, float]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the documentation or help page for this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ImagePipeEdit:
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"pipe": ("PIPE_LINE",)
            },
            "optional": {
                "image": ("IMAGE",),
                "width": ("INT", {"default": 512, "min": 64, "max": 2048, "forceInput": True}),
                "height": ("INT", {"default": 512, "min": 64, "max": 2048, "forceInput": True}),
                "upscale_factor": ("FLOAT", {"default": 1, "min": 1, "max": 2000, "forceInput": True}),
            },
        }

    RETURN_TYPES = ("PIPE_LINE", "STRING", )
    RETURN_NAMES = ("pipe", "show_help", )
    FUNCTION = "pipe_edit"
    CATEGORY = icons.get("Comfyroll/Pipe/Image")

    def pipe_edit(self, pipe, image=None, width=None, height=None, upscale_factor=None):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-image-pipe-edit"
            
        new_image, new_width, new_height, new_upscale_factor = pipe

        if image is not None:
            new_image = image
            
        if width is not None:
            new_width = width
            
        if height is not None:
            new_height = height

        if upscale_factor is not None:
            new_upscale_factor = upscale_factor
            
        pipe = new_image, new_width, new_height, new_upscale_factor
        
        return (pipe, show_help, )

```
