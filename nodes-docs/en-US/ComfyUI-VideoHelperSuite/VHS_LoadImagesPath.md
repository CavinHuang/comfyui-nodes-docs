---
tags:
- Image
- ImageLoad
---

# Load Images (Path) 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_LoadImagesPath`
- Category: `Video Helper Suite 🎥🅥🅗🅢`
- Output node: `False`

The VHS_LoadImagesPath node is designed for loading images from a specified directory path into a video editing or processing workflow. It supports filtering and selection options to customize the set of images loaded, facilitating efficient management and manipulation of image batches within the Video Helper Suite.
## Input types
### Required
- **`directory`**
    - Specifies the directory from which images are to be loaded. This parameter is crucial for determining the source of the images to be processed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`image_load_cap`**
    - Limits the number of images to be loaded from the directory, allowing for control over the batch size for processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`skip_first_images`**
    - Skips a specified number of images at the beginning of the directory, enabling selective loading of images based on order.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`select_every_nth`**
    - Loads every nth image from the directory, providing a method to thin out the image set for processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The loaded images, ready for further processing or manipulation within the workflow.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - Generated masks for the loaded images, useful for image editing tasks that require segmentation or selective editing.
    - Python dtype: `torch.Tensor`
- **`int`**
    - Comfy dtype: `INT`
    - The total count of images loaded, offering insight into the batch size after applying loading parameters.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ImpactImageBatchToImageList](../../ComfyUI-Impact-Pack/Nodes/ImpactImageBatchToImageList.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [IPAdapterEncoder](../../ComfyUI_IPAdapter_plus/Nodes/IPAdapterEncoder.md)
    - LinearBatchCreativeInterpolation



## Source code
```python
class LoadImagesFromDirectoryPath:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "directory": ("STRING", {"default": "X://path/to/images", "vhs_path_extensions": []}),
            },
            "optional": {
                "image_load_cap": ("INT", {"default": 0, "min": 0, "max": BIGMAX, "step": 1}),
                "skip_first_images": ("INT", {"default": 0, "min": 0, "max": BIGMAX, "step": 1}),
                "select_every_nth": ("INT", {"default": 1, "min": 1, "max": BIGMAX, "step": 1}),
            }
        }
    
    RETURN_TYPES = ("IMAGE", "MASK", "INT")
    FUNCTION = "load_images"

    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢"

    def load_images(self, directory: str, **kwargs):
        if directory is None or validate_load_images(directory) != True:
            raise Exception("directory is not valid: " + directory)

        return load_images(directory, **kwargs)
    
    @classmethod
    def IS_CHANGED(s, directory: str, **kwargs):
        if directory is None:
            return "input"
        return is_changed_load_images(directory, **kwargs)

    @classmethod
    def VALIDATE_INPUTS(s, directory: str, **kwargs):
        if directory is None:
            return True
        return validate_load_images(directory)

```
