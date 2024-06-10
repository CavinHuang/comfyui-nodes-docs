---
tags:
- AspectRatio
- ImageSize
- ImageTransformation
---

# 🔳 CR Aspect Ratio
## Documentation
- Class name: `CR Aspect Ratio`
- Category: `🧩 Comfyroll Studio/✨ Essential/🔳 Aspect Ratio`
- Output node: `False`

This node is designed to adjust the aspect ratio of images, ensuring they fit specific dimensions or standards. It's particularly useful in scenarios where maintaining the visual integrity of an image across different display sizes or formats is crucial.
## Input types
### Required
- **`width`**
    - Specifies the desired width of the output image. This parameter plays a crucial role in determining the final dimensions of the image after aspect ratio adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the desired height of the output image. Along with width, this parameter is essential for defining the final dimensions of the image post-adjustment.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`aspect_ratio`**
    - Defines the aspect ratio to apply to the image. This parameter is key in ensuring the image fits the desired dimensions while maintaining its visual integrity.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`swap_dimensions`**
    - Determines whether the width and height dimensions should be swapped. This is useful for rotating images or changing their orientation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_factor`**
    - Specifies the factor by which the image should be upscaled. This is important for enhancing image quality in larger displays.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`prescale_factor`**
    - Specifies the factor by which the image should be prescaled before applying the aspect ratio adjustments. This helps in optimizing the processing for different image sizes.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`batch_size`**
    - Defines the number of images to process in a single batch. This parameter is crucial for optimizing performance and resource utilization during batch processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`width`**
    - Comfy dtype: `INT`
    - The adjusted width of the image after applying the aspect ratio adjustments.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The adjusted height of the image after applying the aspect ratio adjustments.
    - Python dtype: `int`
- **`upscale_factor`**
    - Comfy dtype: `FLOAT`
    - The factor by which the image has been upscaled during the aspect ratio adjustment process.
    - Python dtype: `float`
- **`prescale_factor`**
    - Comfy dtype: `FLOAT`
    - The factor by which the image has been prescaled before applying the aspect ratio adjustments.
    - Python dtype: `float`
- **`batch_size`**
    - Comfy dtype: `INT`
    - The number of images processed in the batch.
    - Python dtype: `int`
- **`empty_latent`**
    - Comfy dtype: `LATENT`
    - A tensor representing the latent space of the processed images.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to a help page with more information about aspect ratio adjustments.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - KSampler //Inspire
    - [CR Image Pipe In](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Image Pipe In.md)
    - [CR Module Pipe Loader](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Module Pipe Loader.md)
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)



## Source code
```python
class CR_AspectRatio:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
    
        aspect_ratios = ["custom",
                         "SD1.5 - 1:1 square 512x512",
                         "SD1.5 - 2:3 portrait 512x768",
                         "SD1.5 - 3:4 portrait 512x682",
                         "SD1.5 - 3:2 landscape 768x512",
                         "SD1.5 - 4:3 landscape 682x512",
                         "SD1.5 - 16:9 cinema 910x512",
                         "SD1.5 - 1.85:1 cinema 952x512",
                         "SD1.5 - 2:1 cinema 1024x512",
                         "SDXL - 1:1 square 1024x1024",
                         "SDXL - 3:4 portrait 896x1152",
                         "SDXL - 5:8 portrait 832x1216",
                         "SDXL - 9:16 portrait 768x1344",
                         "SDXL - 9:21 portrait 640x1536",
                         "SDXL - 4:3 landscape 1152x896",
                         "SDXL - 3:2 landscape 1216x832",
                         "SDXL - 16:9 landscape 1344x768",
                         "SDXL - 21:9 landscape 1536x640"]
               
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
        
        # SD1.5
        if aspect_ratio == "SD1.5 - 1:1 square 512x512":
            width, height = 512, 512
        elif aspect_ratio == "SD1.5 - 2:3 portrait 512x768":
            width, height = 512, 768
        elif aspect_ratio == "SD1.5 - 16:9 cinema 910x512":
            width, height = 910, 512
        elif aspect_ratio == "SD1.5 - 3:4 portrait 512x682":
            width, height = 512, 682
        elif aspect_ratio == "SD1.5 - 3:2 landscape 768x512":
            width, height = 768, 512    
        elif aspect_ratio == "SD1.5 - 4:3 landscape 682x512":
            width, height = 682, 512
        elif aspect_ratio == "SD1.5 - 1.85:1 cinema 952x512":            
            width, height = 952, 512
        elif aspect_ratio == "SD1.5 - 2:1 cinema 1024x512":
            width, height = 1024, 512
        elif aspect_ratio == "SD1.5 - 2.39:1 anamorphic 1224x512":
            width, height = 1224, 512 
        # SDXL   
        if aspect_ratio == "SDXL - 1:1 square 1024x1024":
            width, height = 1024, 1024
        elif aspect_ratio == "SDXL - 3:4 portrait 896x1152":
            width, height = 896, 1152
        elif aspect_ratio == "SDXL - 5:8 portrait 832x1216":
            width, height = 832, 1216
        elif aspect_ratio == "SDXL - 9:16 portrait 768x1344":
            width, height = 768, 1344
        elif aspect_ratio == "SDXL - 9:21 portrait 640x1536":
            width, height = 640, 1536
        elif aspect_ratio == "SDXL - 4:3 landscape 1152x896":
            width, height = 1152, 896
        elif aspect_ratio == "SDXL - 3:2 landscape 1216x832":
            width, height = 1216, 832
        elif aspect_ratio == "SDXL - 16:9 landscape 1344x768":
            width, height = 1344, 768
        elif aspect_ratio == "SDXL - 21:9 landscape 1536x640":
            width, height = 1536, 640                
        
        if swap_dimensions == "On":
            width, height = height, width
        
        width = int(width*prescale_factor)
        height = int(height*prescale_factor)
        
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Aspect-Ratio-Nodes#cr-aspect-ratio"
           
        return(width, height, upscale_factor, prescale_factor, batch_size, {"samples":latent}, show_help, )    

```
