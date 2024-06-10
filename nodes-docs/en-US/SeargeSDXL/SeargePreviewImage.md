---
tags:
- Preview
---

# SeargePreviewImage
## Documentation
- Class name: `SeargePreviewImage`
- Category: `Searge/UI`
- Output node: `True`

The SeargePreviewImage node is designed to provide a preview of images by optionally saving them to a temporary directory. It allows for the conditional processing and display of images based on the enabled state and the presence of images to preview, incorporating additional image metadata if provided.
## Input types
### Required
- **`enabled`**
    - Determines whether the image preview functionality is active. When false, the node will not process or display any images.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`images`**
    - The images to be previewed. This parameter is optional and allows for the display of images if they are provided and the preview is enabled.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The images that have been processed for preview, potentially saved with additional metadata.
    - Python dtype: `List[Image]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargePreviewImage(nodes.SaveImage):
    def __init__(self):
        super().__init__()
        self.output_dir = folder_paths.get_temp_directory()
        self.type = "temp"
        self.prefix_append = "_temp_" + ''.join(random.choice("abcdefghijklmnopqrstupvxyz") for _ in range(5))

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "enabled": ("BOOLEAN", {"default": True},),
            },
            "optional": {
                "images": ("IMAGE",),
            },
            "hidden": {
                "prompt": "PROMPT",
                "extra_pnginfo": "EXTRA_PNGINFO",
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)
    FUNCTION = "preview_images"

    CATEGORY = UI.CATEGORY_UI

    def preview_images(self, enabled, images=None, prompt=None, extra_pnginfo=None):
        if images is None or not enabled:
            return {
                "result": (images,),
                "ui": {"images": list(), },
            }

        saved_images = nodes.SaveImage.save_images(self, images, "srg_sdxl_preview", prompt, extra_pnginfo)
        saved_images["result"] = (images,)

        return saved_images

```
