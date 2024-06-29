---
tags:
- AspectRatio
- ImageSize
- ImageTransformation
---

# 🔳 CR SDXL Aspect Ratio
## Documentation
- Class name: `CR SDXL Aspect Ratio`
- Category: `🧩 Comfyroll Studio/✨ Essential/🔳 Aspect Ratio`
- Output node: `False`

This node is designed to adjust the aspect ratio of images specifically for the SDXL model, accommodating a variety of predefined aspect ratios to fit different use cases, such as portraits, landscapes, and cinema formats. It allows for customization of image dimensions based on the selected aspect ratio, ensuring that the output images are optimally sized for the SDXL model's requirements.
## Input types
### Required
- **`width`**
    - Specifies the initial width of the image before aspect ratio adjustment. It serves as a base dimension that might be altered based on the selected aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the initial height of the image before aspect ratio adjustment. It acts as a base dimension that might be modified according to the chosen aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`aspect_ratio`**
    - Determines the target aspect ratio for the image, offering a selection of predefined ratios tailored for the SDXL model. This choice dictates the final dimensions of the output image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`swap_dimensions`**
    - Allows for the swapping of width and height dimensions of the image, accommodating orientation adjustments as needed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`upscale_factor`**
    - Defines the factor by which the image's dimensions are scaled up, enhancing the resolution of the output image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`batch_size`**
    - Specifies the number of images to process in a single batch, facilitating efficient batch processing of images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`width`**
    - Comfy dtype: `INT`
    - The adjusted width of the image after applying the selected aspect ratio and any scaling.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The adjusted height of the image after applying the selected aspect ratio and any scaling.
    - Python dtype: `int`
- **`upscale_factor`**
    - Comfy dtype: `FLOAT`
    - The factor by which the image's dimensions have been scaled up.
    - Python dtype: `float`
- **`batch_size`**
    - Comfy dtype: `INT`
    - The number of images processed in the batch.
    - Python dtype: `int`
- **`empty_latent`**
    - Comfy dtype: `LATENT`
    - unknown
    - Python dtype: `unknown`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing additional information and guidance on using the aspect ratio node.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ImpactSwitch](../../ComfyUI-Impact-Pack/Nodes/ImpactSwitch.md)
    - [EmptyLatentImage](../../Comfy/Nodes/EmptyLatentImage.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)
    - Reroute (rgthree)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)



## Source code
```python
class CR_SDXLAspectRatio:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
    
        aspect_ratios = ["custom",
                                  "1:1 square 1024x1024",
                                  "3:4 portrait 896x1152",
                                  "5:8 portrait 832x1216",
                                  "9:16 portrait 768x1344",
                                  "9:21 portrait 640x1536",
                                  "4:3 landscape 1152x896",
                                  "3:2 landscape 1216x832",
                                  "16:9 landscape 1344x768",
                                  "21:9 landscape 1536x640"]
        
        return {
            "required": {
                "width": ("INT", {"default": 1024, "min": 64, "max": 8192}),
                "height": ("INT", {"default": 1024, "min": 64, "max": 8192}),
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
            width, height = height, width
             
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Aspect-Ratio-Nodes#cr-sdxl-aspect-ratio"
           
        return(width, height, upscale_factor, batch_size, {"samples":latent}, show_help, )  

```
