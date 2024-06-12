---
tags:
- Image
- Pipeline
---

# 🛩️ CR Image Pipe Out
## Documentation
- Class name: `CR Image Pipe Out`
- Category: `🧩 Comfyroll Studio/✨ Essential/🎷 Pipe/🛩️ Image`
- Output node: `False`

The CR_ImagePipeOut node is designed for extracting and outputting image data and its associated parameters from a pipeline. It facilitates the retrieval of image properties such as dimensions and upscale factor, along with providing a help link for further guidance.
## Input types
### Required
- **`pipe`**
    - The 'pipe' parameter is a pipeline input that carries image data and its associated parameters such as width, height, and upscale factor. It is essential for the node's operation as it determines the image and its properties to be outputted.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Tuple[torch.Tensor, int, int, float]`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Returns the original pipeline input, allowing for further processing or extraction of image data and parameters.
    - Python dtype: `Tuple[torch.Tensor, int, int, float]`
- **`image`**
    - Comfy dtype: `IMAGE`
    - Outputs the image data extracted from the pipeline.
    - Python dtype: `torch.Tensor`
- **`width`**
    - Comfy dtype: `INT`
    - Outputs the width of the image extracted from the pipeline.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - Outputs the height of the image extracted from the pipeline.
    - Python dtype: `int`
- **`upscale_factor`**
    - Comfy dtype: `FLOAT`
    - Outputs the upscale factor associated with the image extracted from the pipeline.
    - Python dtype: `float`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a link to a help page for further guidance on using the CR_ImagePipeOut node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ImagePipeOut:
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"pipe": ("PIPE_LINE",)},
            }

    RETURN_TYPES = ("PIPE_LINE", "IMAGE", "INT", "INT", "FLOAT", "STRING", )
    RETURN_NAMES = ("pipe", "image", "width", "height", "upscale_factor", "show_help", )
    FUNCTION = "pipe_out"
    CATEGORY = icons.get("Comfyroll/Pipe/Image")
    
    def pipe_out(self, pipe):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-image-pipe-out"

        image, width, height, upscale_factor = pipe
        
        return (pipe, image, width, height, upscale_factor, show_help, )

```
