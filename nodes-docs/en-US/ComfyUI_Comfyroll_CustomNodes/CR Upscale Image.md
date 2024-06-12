---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# 🔍 CR Upscale Image
## Documentation
- Class name: `CR Upscale Image`
- Category: `🧩 Comfyroll Studio/✨ Essential/🔍 Upscale`
- Output node: `False`

This node is designed to upscale images using a specified model, with options for adjusting the scale, resizing, and resampling methods. It provides flexibility in image processing by allowing for multiple loops of upscaling, choice of resampling methods, and control over the final image size and quality.
## Input types
### Required
- **`image`**
    - The input image to be upscaled. This parameter is crucial as it determines the base image that will undergo the upscaling process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`upscale_model`**
    - Specifies the model to be used for upscaling the image. This choice impacts the quality and characteristics of the upscaled image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`mode`**
    - Defines the method used for resizing the image, such as rescaling or cropping, affecting the final appearance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`rescale_factor`**
    - The factor by which the image is upscaled, directly influencing the increase in image dimensions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resize_width`**
    - Sets a specific width for the upscaled image, overriding the default scaling behavior.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resampling_method`**
    - Specifies the algorithm used for resampling during resizing, influencing the smoothness and clarity of the upscaled image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`supersample`**
    - When enabled, applies supersampling for improved image quality, particularly in reducing aliasing effects.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`rounding_modulus`**
    - Affects the final dimensions of the upscaled image by rounding them to the nearest multiple of this value, ensuring compatibility with certain processing or display requirements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The resulting tensor of upscaled images, potentially containing multiple images if loops are used.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation for the upscaling process.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - IPAdapterApply
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)
    - [VAEEncodeTiled](../../Comfy/Nodes/VAEEncodeTiled.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)
    - [ImageScaleBy](../../Comfy/Nodes/ImageScaleBy.md)



## Source code
```python
class CR_UpscaleImage:

    @classmethod
    def INPUT_TYPES(s):

        resampling_methods = ["lanczos", "nearest", "bilinear", "bicubic"]
       
        return {"required":
                    {"image": ("IMAGE",),
                     "upscale_model": (folder_paths.get_filename_list("upscale_models"), ),
                     "mode": (["rescale", "resize"],),
                     "rescale_factor": ("FLOAT", {"default": 2, "min": 0.01, "max": 16.0, "step": 0.01}),
                     "resize_width": ("INT", {"default": 1024, "min": 1, "max": 48000, "step": 1}),
                     "resampling_method": (resampling_methods,),                     
                     "supersample": (["true", "false"],),   
                     "rounding_modulus": ("INT", {"default": 8, "min": 8, "max": 1024, "step": 8}),
                     }
                }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "upscale"
    CATEGORY = icons.get("Comfyroll/Upscale")
    
    def upscale(self, image, upscale_model, rounding_modulus=8, loops=1, mode="rescale", supersample='true', resampling_method="lanczos", rescale_factor=2, resize_width=1024):

        # Load upscale model 
        up_model = load_model(upscale_model)

        # Upscale with model
        up_image = upscale_with_model(up_model, image)  

        for img in image:
            pil_img = tensor2pil(img)
            original_width, original_height = pil_img.size

        for img in up_image:
            # Get new size
            pil_img = tensor2pil(img)
            upscaled_width, upscaled_height = pil_img.size

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Upscale-Nodes#cr-upscale-image"

        # Return if no rescale needed
        if upscaled_width == original_width and rescale_factor == 1:
            return (up_image, show_help)
              
        # Image resize
        scaled_images = []
        
        for img in up_image:
            scaled_images.append(pil2tensor(apply_resize_image(tensor2pil(img), original_width, original_height, rounding_modulus, mode, supersample, rescale_factor, resize_width, resampling_method)))
        images_out = torch.cat(scaled_images, dim=0)
 
        return (images_out, show_help, )        

```
