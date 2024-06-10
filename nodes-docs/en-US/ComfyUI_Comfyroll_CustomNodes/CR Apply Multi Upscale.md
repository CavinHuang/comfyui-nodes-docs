---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# 🔍 CR Apply Multi Upscale
## Documentation
- Class name: `CR Apply Multi Upscale`
- Category: `🧩 Comfyroll Studio/✨ Essential/🔍 Upscale`
- Output node: `False`

This node is designed to apply multiple upscaling models sequentially to an image, enhancing its resolution. It allows for the customization of the upscaling process through a stack of models and rescaling factors, providing flexibility in achieving the desired image quality.
## Input types
### Required
- **`image`**
    - The input image to be upscaled. It serves as the base for the sequential application of multiple upscaling models, each potentially enhancing the image's resolution further.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`resampling_method`**
    - Specifies the method used for resampling during the upscaling process, affecting the quality and characteristics of the upscaled image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`supersample`**
    - Determines whether supersampling is applied, which can enhance the quality of the upscaled image by reducing aliasing effects.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`rounding_modulus`**
    - Used to round the dimensions of the upscaled image, ensuring they are multiples of a specified value, which can be important for compatibility with certain processing or display requirements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`upscale_stack`**
    - A list of tuples, each containing an upscaling model and a rescale factor. This stack defines the sequence and parameters of upscaling models applied to the image, allowing for complex and customized upscaling processes.
    - Comfy dtype: `UPSCALE_STACK`
    - Python dtype: `List[Tuple[str, float]]`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The output of the node is the upscaled image, which has undergone sequential upscaling and potential resizing based on the provided stack of models and rescaling factors.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional information and guidance on the use of the node and its parameters.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)
    - [VAEEncodeTiled](../../Comfy/Nodes/VAEEncodeTiled.md)



## Source code
```python
class CR_ApplyMultiUpscale:

    @classmethod
    def INPUT_TYPES(s):
    
        resampling_methods = ["lanczos", "nearest", "bilinear", "bicubic"]
        
        return {"required": {"image": ("IMAGE",),
                             "resampling_method": (resampling_methods,),
                             "supersample": (["true", "false"],),                     
                             "rounding_modulus": ("INT", {"default": 8, "min": 8, "max": 1024, "step": 8}),                   
                             "upscale_stack": ("UPSCALE_STACK",),
                            }
        }
    
    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "apply"
    CATEGORY = icons.get("Comfyroll/Upscale")

    def apply(self, image, resampling_method, supersample, rounding_modulus, upscale_stack):

        # Get original size
        pil_img = tensor2pil(image)
        original_width, original_height = pil_img.size
    
        # Extend params with upscale-stack items 
        params = list()
        params.extend(upscale_stack)

        # Loop through the list
        for tup in params:
            upscale_model, rescale_factor = tup
            print(f"[Info] CR Apply Multi Upscale: Applying {upscale_model} and rescaling by factor {rescale_factor}")
            # Load upscale model 
            up_model = load_model(upscale_model)

            # Upscale with model
            up_image = upscale_with_model(up_model, image)

            # Get new size
            pil_img = tensor2pil(up_image)
            upscaled_width, upscaled_height = pil_img.size

            # Return if no rescale needed
            if upscaled_width == original_width and rescale_factor == 1:
                image = up_image           
            else:      
                # Image resize
                scaled_images = []
                mode = "rescale"
                resize_width = 1024 
                
                for img in up_image:
                    scaled_images.append(pil2tensor(apply_resize_image(tensor2pil(img), original_width, original_height, rounding_modulus, mode, supersample, rescale_factor, resize_width, resampling_method)))
                image = torch.cat(scaled_images, dim=0)
            
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Upscale-Nodes#cr-apply-multi-upscale"

        return (image, show_help, )

```
