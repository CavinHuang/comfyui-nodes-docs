---
tags:
- Image
- Pipeline
---

# 🛩 CR Image Pipe In
## Documentation
- Class name: `CR Image Pipe In`
- Category: `🧩 Comfyroll Studio/✨ Essential/🎷 Pipe/🛩️ Image`
- Output node: `False`

This node is designed to initialize and configure an image processing pipeline, allowing for the specification of image properties such as dimensions and upscale factor. It serves as the entry point for images into a customizable processing flow, facilitating subsequent manipulations or analyses.
## Input types
### Required
### Optional
- **`image`**
    - The initial image to be processed. It sets the starting point for the pipeline.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`width`**
    - Specifies the desired width of the image. It affects the dimensions of the image as it moves through the pipeline.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the desired height of the image. It affects the dimensions of the image as it moves through the pipeline.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`upscale_factor`**
    - Determines the factor by which the image should be upscaled. This parameter influences the resolution enhancement of the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - A pipeline configuration encapsulating the image and its specified properties.
    - Python dtype: `PIPE_LINE`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing detailed documentation and help for using the CR Image Pipe In node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CR Image Pipe Out](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Image Pipe Out.md)



## Source code
```python
class CR_ImagePipeIn:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
            },
            "optional": {
                "image": ("IMAGE",),
                "width": ("INT", {"default": 512, "min": 64, "max": 2048}),
                "height": ("INT", {"default": 512, "min": 64, "max": 2048}),
                "upscale_factor": ("FLOAT", {"default": 1, "min": 1, "max": 2000})
            },
        }

    RETURN_TYPES = ("PIPE_LINE", "STRING", )
    RETURN_NAMES = ("pipe", "show_help", )
    FUNCTION = "pipe_in"
    CATEGORY = icons.get("Comfyroll/Pipe/Image")

    def pipe_in(self, image=0, width=0, height=0, upscale_factor=0):
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-image-pipe-in"
        
        pipe_line = (image, width, height, upscale_factor)

        return (pipe_line, show_help, )

```
