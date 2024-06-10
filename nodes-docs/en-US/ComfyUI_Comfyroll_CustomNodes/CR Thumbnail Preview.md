---
tags:
- Image
---

# 📱 CR Thumbnail Preview
## Documentation
- Class name: `CR Thumbnail Preview`
- Category: `🧩 Comfyroll Studio/👾 Graphics/📱 Template`
- Output node: `True`

This node is designed to generate thumbnail previews of images, optionally rescaling them and arranging them in a grid layout. It supports both individual and batch processing of images, allowing for flexible adjustments to the thumbnail presentation. The node also integrates with a websocket server to send the generated thumbnails for display, providing a link to further documentation for user assistance.
## Input types
### Required
- **`image`**
    - The input image or a batch of images to be processed into thumbnails. This parameter is crucial for determining the content that will be transformed into a thumbnail preview.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor or List[torch.Tensor]`
- **`rescale_factor`**
    - A factor by which the input images are rescaled. This affects the size of the resulting thumbnails, allowing for customization based on user preference or display requirements.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max_columns`**
    - Specifies the maximum number of columns in the grid layout for arranging the thumbnails. This parameter influences the overall layout and presentation of the thumbnails.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a link to further documentation for user assistance, enhancing the usability of the node.
    - Python dtype: `Tuple[str]`
- **`ui`**
    - The output UI component containing the generated thumbnails, ready for display via websocket.
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_ThumbnailPreview:

    @classmethod
    def INPUT_TYPES(s):
     
        return {"required":
                    {"image": ("IMAGE",),
                     "rescale_factor": ("FLOAT", {"default": 0.25, "min": 0.10, "max": 1.00, "step": 0.01}),
                     "max_columns": ("INT", {"default": 5, "min": 0, "max": 256}), 
                     }
                }           

    RETURN_TYPES = ("STRING", )
    RETURN_NAMES = ("show_help", )
    OUTPUT_NODE = True    
    FUNCTION = "thumbnail"
    CATEGORY = icons.get("Comfyroll/Graphics/Template")
    
    def thumbnail(self, image, rescale_factor, max_columns):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Template-Nodes#cr-thumbnail-preview"
        
        result_images = []
        outline_thickness = 1
      
        for img in image:
            pil_img = tensor2pil(img)
            original_width, original_height = pil_img.size        
            rescaled_img = apply_resize_image(tensor2pil(img), original_width, original_height, 8, "rescale", "false", rescale_factor, 256, "lanczos")
            outlined_img = ImageOps.expand(rescaled_img, outline_thickness, fill="black")
            result_images.append(outlined_img)
 
        combined_image = make_grid_panel(result_images, max_columns)
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
