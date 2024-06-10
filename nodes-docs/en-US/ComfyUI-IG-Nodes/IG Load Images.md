---
tags:
- Image
- ImageLoad
---

# 📂 IG Load Images
## Documentation
- Class name: `IG Load Images`
- Category: `🐓 IG Nodes/IO`
- Output node: `False`

The IG Load Images From Folder node is designed for efficiently loading multiple images from a specified folder, offering options to limit the number of images loaded, skip a certain number of initial images, and select images at a specified interval. This functionality is crucial for managing and preprocessing large datasets of images for further analysis or processing within a pipeline.
## Input types
### Required
- **`folder`**
    - Specifies the directory from which images are to be loaded. This is a required input that determines the source of the images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`image_load_cap`**
    - Limits the number of images to be loaded from the folder. If set to 0, there is no limit.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`skip_first_images`**
    - Skips a specified number of images from the beginning of the folder. Useful for starting the loading process from a certain point.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`select_every_nth`**
    - Loads every nth image from the folder, allowing for selective loading of images at regular intervals.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The loaded images from the specified folder.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The masks associated with the loaded images, if available.
    - Python dtype: `torch.Tensor`
- **`int`**
    - Comfy dtype: `INT`
    - The total number of images loaded from the folder.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IG_LoadImagesFromFolder:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "folder": ("STRING", {"forceInput": True}),
            },
            "optional": {
                "image_load_cap": ("INT", {"default": 0, "min": 0, "step": 1}),
                "skip_first_images": ("INT", {"default": 0, "min": 0, "step": 1}),
                "select_every_nth": ("INT", {"default": 1, "min": 1, "step": 1}),
            }
        }
    
    RETURN_TYPES = ("IMAGE", "MASK", "INT")
    FUNCTION = "main"

    CATEGORY = TREE_IO

    def main(self, folder: str, **kwargs):
        return load_images(folder, **kwargs)
    
    @classmethod
    def IS_CHANGED(s, folder: str, **kwargs):
        return is_changed_load_images(folder, **kwargs)

    # @classmethod
    # def VALIDATE_INPUTS(s, folder: str, **kwargs):
    #     return validate_load_images(folder, **kwargs)

```
