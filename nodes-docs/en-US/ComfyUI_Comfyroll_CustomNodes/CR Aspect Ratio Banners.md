---
tags:
- AspectRatio
- ImageSize
- ImageTransformation
---

# 🔳 CR Aspect Ratio Banners
## Documentation
- Class name: `CR Aspect Ratio Banners`
- Category: `🧩 Comfyroll Studio/✨ Essential/🔳 Aspect Ratio`
- Output node: `False`

This node is designed to adjust the aspect ratio of banners, allowing for customization of width, height, and aspect ratio parameters. It supports operations such as swapping dimensions, upscaling, and prescaling, catering to various banner size requirements.
## Input types
### Required
- **`width`**
    - Specifies the desired width of the banner. It plays a crucial role in determining the final dimensions of the banner after aspect ratio adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Defines the desired height of the banner. This parameter is essential for calculating the banner's dimensions in accordance with the specified aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`aspect_ratio`**
    - Determines the target aspect ratio for the banner. This parameter is key to achieving the desired proportion between width and height.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`swap_dimensions`**
    - Allows for the swapping of width and height dimensions. This feature is useful for adapting the banner to different orientation requirements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_factor`**
    - Specifies the factor by which the banner's dimensions should be upscaled. This parameter enables the enlargement of banners while maintaining their aspect ratio.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`prescale_factor`**
    - Indicates the factor by which the banner's dimensions should be prescaled before any other adjustments. This is useful for initial size modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`batch_size`**
    - Defines the number of banners to process in a single batch. This parameter helps in optimizing the processing of multiple banners simultaneously.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`width`**
    - Comfy dtype: `INT`
    - The adjusted width of the banner after applying the specified aspect ratio and other adjustments.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The adjusted height of the banner after applying the specified aspect ratio and other adjustments.
    - Python dtype: `int`
- **`upscale_factor`**
    - Comfy dtype: `FLOAT`
    - The factor by which the banner's dimensions have been upscaled.
    - Python dtype: `float`
- **`prescale_factor`**
    - Comfy dtype: `FLOAT`
    - The factor by which the banner's dimensions have been prescaled before any other adjustments.
    - Python dtype: `float`
- **`batch_size`**
    - Comfy dtype: `INT`
    - The number of banners processed in the batch.
    - Python dtype: `int`
- **`empty_latent`**
    - Comfy dtype: `LATENT`
    - A tensor representing the latent space of the processed banners.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the help documentation for using the aspect ratio node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_AspectRatioBanners:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
    
        aspect_ratios = ["custom",
                         "Large Rectangle - 336x280", 
                         "Medium Rectangle - 300x250", 
                         "Small Rectangle - 180x150",
                         "Square - 250x250", 
                         "Small Square - 200x200",
                         "Button - 125x125", 
                         "Half Page - 300x600",
                         "Vertical Banner - 120x240", 
                         "Wide Skyscraper - 160x600", 
                         "Skyscraper - 120x600", 
                         "Billboard - 970x250", 
                         "Portrait - 300x1050", 
                         "Banner - 468x60", 
                         "Leaderboard - 728x90"]
                                 
        return {
            "required": {
                "width": ("INT", {"default": 1024, "min": 64, "max": 8192}),
                "height": ("INT", {"default": 1024, "min": 64, "max": 8192}),
                "aspect_ratio": (aspect_ratios,),
                "swap_dimensions": (["Off", "On"],),
                "upscale_factor": ("FLOAT", {"default": 1.0, "min": 0.1, "max": 100.0, "step":0.1}),
                "prescale_factor": ("FLOAT", {"default": 1.0, "min": 0.1, "max": 100.0, "step":0.1}),
                "batch_size": ("INT", {"default": 1, "min": 1, "max": 64})
            }
        }
    RETURN_TYPES = ("INT", "INT", "FLOAT", "FLOAT", "INT", "LATENT", "STRING", )
    RETURN_NAMES = ("width", "height", "upscale_factor", "prescale_factor", "batch_size", "empty_latent", "show_help", )
    FUNCTION = "Aspect_Ratio"
    CATEGORY = icons.get("Comfyroll/Aspect Ratio")

    def Aspect_Ratio(self, width, height, aspect_ratio, swap_dimensions, upscale_factor, prescale_factor, batch_size):
        
        # Banner sizes
        if aspect_ratio == "Large Rectangle - 336x280":
            width, height = 336, 280
        elif aspect_ratio == "Medium Rectangle - 300x250":
            width, height = 300, 250
        elif aspect_ratio == "Small Rectangle - 180x150":
            width, height = 180, 150
        elif aspect_ratio == "Square - 250x250":
            width, height = 250, 250
        elif aspect_ratio == "Small Square - 200x200":
            width, height = 200	, 200
        elif aspect_ratio == "Button - 125x125":
            width, height = 125	, 125
        elif aspect_ratio == "Half Page - 300x600":
            width, height = 300, 600
        elif aspect_ratio == "Vertical Banner - 120x240":
            width, height = 120, 240
        elif aspect_ratio == "Wide Skyscraper - 160x600":
            width, height = 160, 600
        elif aspect_ratio == "Skyscraper - 120x600":
            width, height = 120, 600
        elif aspect_ratio == "Billboard - 970x250":
            width, height = 970, 250
        elif aspect_ratio == "Portrait - 300x1050":
            width, height = 300, 1050
        elif aspect_ratio == "Banner - 468x60":
            width, height = 168, 60
        elif aspect_ratio == "Leaderboard - 728x90":
            width, height = 728, 90              
        
        if swap_dimensions == "On":
            width, height = height, width
        
        width = int(width*prescale_factor)
        height = int(height*prescale_factor)
        
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Aspect-Ratio-Nodes#cr-aspect-ratio-banners"
           
        return(width, height, upscale_factor, prescale_factor, batch_size, {"samples":latent}, show_help, ) 

```
