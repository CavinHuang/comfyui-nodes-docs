---
tags:
- AspectRatio
- ImageSize
- ImageTransformation
---

# 🔳 CR Aspect Ratio Social Media
## Documentation
- Class name: `CR Aspect Ratio Social Media`
- Category: `🧩 Comfyroll Studio/✨ Essential/🔳 Aspect Ratio`
- Output node: `False`

This node is designed to adjust the dimensions of images to fit specific aspect ratios tailored for social media platforms. It provides functionality to modify width and height based on predefined social media sizes, allowing for dimension swapping, scaling, and batch processing of images.
## Input types
### Required
- **`width`**
    - Specifies the initial width of the image. It's a crucial parameter as it serves as a base for calculating the new dimensions according to the selected aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the initial height of the image. Along with width, it forms the basis for the new dimensions calculation according to the selected aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`aspect_ratio`**
    - Determines the target aspect ratio for the image, based on common social media platform requirements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`swap_dimensions`**
    - Allows for the swapping of width and height dimensions to accommodate different orientation needs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_factor`**
    - Defines the factor by which the image should be upscaled after adjusting to the target aspect ratio.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`prescale_factor`**
    - Defines the factor by which the image should be prescaled before adjusting to the target aspect ratio.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`batch_size`**
    - Specifies the number of images to process in a batch, facilitating batch processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`width`**
    - Comfy dtype: `INT`
    - The adjusted width of the image after applying the aspect ratio and scaling factors.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The adjusted height of the image after applying the aspect ratio and scaling factors.
    - Python dtype: `int`
- **`upscale_factor`**
    - Comfy dtype: `FLOAT`
    - The factor by which the image has been upscaled.
    - Python dtype: `float`
- **`prescale_factor`**
    - Comfy dtype: `FLOAT`
    - The factor by which the image has been prescaled.
    - Python dtype: `float`
- **`batch_size`**
    - Comfy dtype: `INT`
    - The number of images processed in the batch.
    - Python dtype: `int`
- **`empty_latent`**
    - Comfy dtype: `LATENT`
    - A tensor placeholder for further processing, representing the batch of images after resizing and scaling.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation related to aspect ratio adjustments for social media.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_AspectRatioSocialMedia:

    @classmethod
    def INPUT_TYPES(s):
    
        aspect_ratios = ["custom",
                         "Instagram Portrait - 1080x1350",
                         "Instagram Square - 1080x1080",
                         "Instagram Landscape - 1080x608", 
                         "Instagram Stories/Reels - 1080x1920",
                         "Facebook Landscape - 1080x1350",
                         "Facebook Marketplace - 1200x1200",
                         "Facebook Stories - 1080x1920",                         
                         "TikTok - 1080x1920",
                         "YouTube Banner - 2560×1440",
                         "LinkedIn Profile Banner - 1584x396",
                         "LinkedIn Page Cover - 1128x191",
                         "LinkedIn Post - 1200x627",                        
                         "Pinterest Pin Image - 1000x1500",
                         "CivitAI Cover - 1600x400",
                         "OpenArt App - 1500x1000"
                        ]
                                 
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
        
        # Social media sizes
        if aspect_ratio == "Instagram Portrait - 1080x1350":
            width, height = 1080, 1350
        elif aspect_ratio == "Instagram Square - 1080x1080":
            width, height = 1080, 1080
        elif aspect_ratio == "Instagram Landscape - 1080x608":
            width, height = 1080, 608
        elif aspect_ratio == "Instagram Stories/Reels - 1080x1920":
            width, height = 1080, 1920          
        elif aspect_ratio == "Facebook Landscape - 1080x1350":
            width, height = 1080, 1350
        elif aspect_ratio == "Facebook Marketplace - 1200x1200":
            width, height = 1200, 1200
        elif aspect_ratio == "Facebook Stories - 1080x1920":
            width, height = 1080, 1920
        elif aspect_ratio == "TikTok - 1080x1920":
            width, height = 1080, 1920
        elif aspect_ratio == "YouTube Banner - 2560×1440":
            width, height = 2560, 1440             
        elif aspect_ratio == "LinkedIn Profile Banner - 1584x396":
            width, height = 1584, 396
        elif aspect_ratio == "LinkedIn Page Cover - 1128x191":
            width, height = 1584, 396
        elif aspect_ratio == "LinkedIn Post - 1200x627":
            width, height = 1200, 627            
        elif aspect_ratio == "Pinterest Pin Image - 1000x1500":
            width, height = 1000, 1500
        elif aspect_ratio == "Pinterest Cover Image - 1920x1080":
            width, height = 1920, 1080    
        elif aspect_ratio == "CivitAI Cover - 1600x400":
            width, height = 1600, 400      
        elif aspect_ratio == "OpenArt App - 1500x1000":
            width, height = 1500, 1000             
        
        if swap_dimensions == "On":
            width, height = height, width
        
        width = int(width*prescale_factor)
        height = int(height*prescale_factor)
        
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Aspect-Ratio-Nodes#cr-aspect-ratio-scial-media"
           
        return(width, height, upscale_factor, prescale_factor, batch_size, {"samples":latent}, show_help, ) 

```
