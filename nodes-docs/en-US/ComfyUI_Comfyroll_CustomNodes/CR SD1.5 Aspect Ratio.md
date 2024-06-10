---
tags:
- AspectRatio
- ImageSize
- ImageTransformation
---

# 🔳 CR SD1.5 Aspect Ratio
## Documentation
- Class name: `CR SD1.5 Aspect Ratio`
- Category: `🧩 Comfyroll Studio/✨ Essential/🔳 Aspect Ratio`
- Output node: `False`

This node is designed to adjust the aspect ratio of images for Stable Diffusion 1.5, allowing users to select from a variety of predefined aspect ratios, swap dimensions, and manage upscale factors. It's particularly useful for tailoring image dimensions to specific requirements or preferences.
## Input types
### Required
- **`width`**
    - The initial width of the image. This value is adjusted based on the selected aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The initial height of the image. This value is adjusted based on the selected aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`aspect_ratio`**
    - A predefined aspect ratio selection that determines the new dimensions of the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`swap_dimensions`**
    - A toggle to swap the width and height of the image, allowing for easy orientation changes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_factor`**
    - A factor by which the image is upscaled, affecting the final image size.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`batch_size`**
    - The number of images to process in a batch, affecting performance and memory usage.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`width`**
    - Comfy dtype: `INT`
    - The adjusted width of the image after applying the selected aspect ratio.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The adjusted height of the image after applying the selected aspect ratio.
    - Python dtype: `int`
- **`upscale_factor`**
    - Comfy dtype: `FLOAT`
    - The factor by which the image has been upscaled.
    - Python dtype: `float`
- **`batch_size`**
    - Comfy dtype: `INT`
    - The number of images processed in the batch.
    - Python dtype: `int`
- **`empty_latent`**
    - Comfy dtype: `LATENT`
    - The latent representation of the image with adjusted dimensions, ready for further processing or generation.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the help documentation for this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [ImpactSwitch](../../ComfyUI-Impact-Pack/Nodes/ImpactSwitch.md)
    - [EmptyLatentImage](../../Comfy/Nodes/EmptyLatentImage.md)
    - Reroute
    - Reroute (rgthree)



## Source code
```python
class CR_AspectRatioSD15:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
    
        aspect_ratios = ["custom",
                         "1:1 square 512x512",
                         "1:1 square 1024x1024",
                         "2:3 portrait 512x768",
                         "3:4 portrait 512x682",
                         "3:2 landscape 768x512",
                         "4:3 landscape 682x512",
                         "16:9 cinema 910x512",
                         "1.85:1 cinema 952x512",
                         "2:1 cinema 1024x512",
                         "2.39:1 anamorphic 1224x512"]
               
        return {
            "required": {
                "width": ("INT", {"default": 512, "min": 64, "max": 8192}),
                "height": ("INT", {"default": 512, "min": 64, "max": 8192}),
                "aspect_ratio": (aspect_ratios,),
                "swap_dimensions": (["Off", "On"],),
                "upscale_factor": ("FLOAT", {"default": 1.0, "min": 0.1, "max": 100.0, "step":0.1}),
                "batch_size": ("INT", {"default": 1, "min": 1, "max": 64})
            }
        }
    RETURN_TYPES = ("INT", "INT", "FLOAT", "INT", "LATENT", "STRING", )
    RETURN_NAMES = ("width", "height", "upscale_factor", "batch_size", "empty_latent", "show_help", )
    FUNCTION = "Aspect_Ratio"
    CATEGORY = icons.get("Comfyroll/Aspect Ratio")

    def Aspect_Ratio(self, width, height, aspect_ratio, swap_dimensions, upscale_factor, batch_size):
        if aspect_ratio == "2:3 portrait 512x768":
            width, height = 512, 768
        elif aspect_ratio == "3:2 landscape 768x512":
            width, height = 768, 512
        elif aspect_ratio == "1:1 square 512x512":
            width, height = 512, 512
        elif aspect_ratio == "1:1 square 1024x1024":
            width, height = 1024, 1024
        elif aspect_ratio == "16:9 cinema 910x512":
            width, height = 910, 512
        elif aspect_ratio == "3:4 portrait 512x682":
            width, height = 512, 682
        elif aspect_ratio == "4:3 landscape 682x512":
            width, height = 682, 512
        elif aspect_ratio == "1.85:1 cinema 952x512":            
            width, height = 952, 512
        elif aspect_ratio == "2:1 cinema 1024x512":
            width, height = 1024, 512
        elif aspect_ratio == "2.39:1 anamorphic 1224x512":
            width, height = 1224, 512

        if swap_dimensions == "On":
            width, height = height, width
           
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Aspect-Ratio-Nodes#cr-sd15-aspect-ratio"
           
        return(width, height, upscale_factor, batch_size, {"samples":latent}, show_help, )   

```
