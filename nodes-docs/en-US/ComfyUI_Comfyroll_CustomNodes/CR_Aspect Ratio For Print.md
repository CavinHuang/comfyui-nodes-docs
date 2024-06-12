---
tags:
- AspectRatio
- ImageSize
- ImageTransformation
---

# 🔳 CR_Aspect Ratio For Print
## Documentation
- Class name: `CR_Aspect Ratio For Print`
- Category: `🧩 Comfyroll Studio/✨ Essential/🔳 Aspect Ratio`
- Output node: `False`

This node is designed to adjust the aspect ratio of images specifically for print purposes. It modifies image dimensions to fit standard print sizes, ensuring that the output is optimized for physical media.
## Input types
### Required
- **`width`**
    - Specifies the initial width of the image. This value is adjusted based on the selected aspect ratio and other parameters to fit standard print sizes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the initial height of the image. Similar to 'width', this value is adjusted to match the desired aspect ratio for print.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`aspect_ratio`**
    - Defines the target aspect ratio for the image, selected from a predefined list of standard print sizes. This choice determines the final dimensions of the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`swap_dimensions`**
    - Allows for the swapping of width and height dimensions, accommodating different orientation needs without altering the aspect ratio.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_factor`**
    - A multiplier for scaling the image's dimensions up, allowing for higher resolution prints.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`prescale_factor`**
    - A multiplier for scaling the image's dimensions before applying the aspect ratio adjustments. This can be used for initial size adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`batch_size`**
    - Determines the number of images processed in a single batch, allowing for efficient bulk processing of images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`width`**
    - Comfy dtype: `INT`
    - The adjusted width of the image, optimized for the selected print aspect ratio.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The adjusted height of the image, reflecting the chosen aspect ratio for print purposes.
    - Python dtype: `int`
- **`upscale_factor`**
    - Comfy dtype: `FLOAT`
    - The factor by which the image's dimensions have been scaled up, applicable if an upscale was performed.
    - Python dtype: `float`
- **`prescale_factor`**
    - Comfy dtype: `FLOAT`
    - The factor by which the image's dimensions were scaled before aspect ratio adjustments, applicable if a prescale was performed.
    - Python dtype: `float`
- **`batch_size`**
    - Comfy dtype: `INT`
    - The number of images processed, reflecting the input batch size.
    - Python dtype: `int`
- **`empty_latent`**
    - Comfy dtype: `LATENT`
    - A tensor placeholder for the processed images, structured to accommodate the adjusted dimensions.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a link to additional help and documentation regarding aspect ratio adjustments for print.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_AspectRatioForPrint:

    @classmethod
    def INPUT_TYPES(cls):

        aspect_ratios = list(PRINT_SIZES.keys())
                             
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

        # Iso sizes
        if aspect_ratio in PRINT_SIZES:
            width, height = PRINT_SIZES[aspect_ratio] 
        
        if swap_dimensions == "On":
            width, height = height, width
        
        width = int(width*prescale_factor)
        height = int(height*prescale_factor)
        
        print(f"Width: {width}, Height: {height}")
        
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Aspect-Ratio-Nodes#cr-aspect-ratio-scial-media"
           
        return(width, height, upscale_factor, prescale_factor, batch_size, {"samples":latent}, show_help, ) 

```
