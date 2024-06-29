---
tags:
- Image
- VisualEffects
---

# 📱 CR Seamless Checker
## Documentation
- Class name: `CR Seamless Checker`
- Category: `🧩 Comfyroll Studio/👾 Graphics/📱 Template`
- Output node: `True`

The CR Seamless Checker node is designed to evaluate and ensure the seamless integration of various components within a system, focusing on compatibility and smooth operation across different modules or elements. It aims to identify and address potential discrepancies or conflicts that might disrupt the seamless functionality of the system.
## Input types
### Required
- **`image`**
    - The 'image' input represents the visual content to be checked for seamless integration, playing a crucial role in the evaluation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`rescale_factor`**
    - The 'rescale_factor' input determines the scaling factor to be applied to the image, affecting the node's execution and results.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`grid_options`**
    - The 'grid_options' input specifies the configuration for grid generation, influencing the seamless checker's operation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Dict[str, Union[int, str]]`
## Output types
- **`show_help`**
    - Comfy dtype: `STRING`
    - The 'show_help' output provides guidance or suggestions based on the seamless integration evaluation of the image.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SeamlessChecker:

    @classmethod
    def INPUT_TYPES(s):
     
        return {"required":
                    {"image": ("IMAGE",),
                     "rescale_factor": ("FLOAT", {"default": 0.25, "min": 0.10, "max": 1.00, "step": 0.01}),
                     "grid_options": (["2x2", "3x3", "4x4", "5x5", "6x6"],), 
                     }
                }           

    RETURN_TYPES = ("STRING", )
    RETURN_NAMES = ("show_help", )
    OUTPUT_NODE = True    
    FUNCTION = "thumbnail"
    CATEGORY = icons.get("Comfyroll/Graphics/Template")
    
    def thumbnail(self, image, rescale_factor, grid_options):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-seamless-checker"
        
        outline_thickness = 0
      
        pil_img = tensor2pil(image)
        original_width, original_height = pil_img.size        
        rescaled_img = apply_resize_image(tensor2pil(image), original_width, original_height, 8, "rescale", "false", rescale_factor, 256, "lanczos")
        outlined_img = ImageOps.expand(rescaled_img, outline_thickness, fill="black")
        
        max_columns = int(grid_options[0])
        repeat_images = [outlined_img] * max_columns ** 2
 
        combined_image = make_grid_panel(repeat_images, max_columns)
        images_out = pil2tensor(combined_image)
 
        # based on ETN_SendImageWebSocket
        results = []
        
        for tensor in images_out:
            array = 255.0 * tensor.cpu().numpy()
            image = Image.fromarray(np.clip(array, 0, 255).astype(np.uint8))

            server = PromptServer.instance
            server.send_sync(
                BinaryEventTypes.UNENCODED_PREVIEW_IMAGE,
                ["PNG", image, None],
                server.client_id,
            )
            results.append({"source": "websocket", "content-type": "image/png", "type": "output"})
            
        return {"ui": {"images": results}, "result": (show_help,) }

```
