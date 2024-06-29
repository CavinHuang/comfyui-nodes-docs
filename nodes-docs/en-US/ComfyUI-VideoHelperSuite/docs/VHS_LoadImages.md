---
tags:
- Image
- ImageLoad
---

# Load Images (Upload) 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_LoadImages`
- Category: `Video Helper Suite 🎥🅥🅗🅢`
- Output node: `False`

The node 'VHS_LoadImages' is designed to facilitate the loading of images from a specified directory, supporting operations such as image capping, skipping initial images, and selecting every nth image to efficiently manage and process image batches for video or image-based projects.
## Input types
### Required
- **`directory`**
    - Specifies the directory from which images are to be loaded, serving as the primary source for the image loading operation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`image_load_cap`**
    - Limits the number of images to be loaded from the directory, allowing for control over the batch size for processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`skip_first_images`**
    - Skips a specified number of initial images in the directory, useful for starting the loading process from a certain point.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`select_every_nth`**
    - Loads every nth image from the directory, enabling selective processing of images at regular intervals.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The loaded images, processed and ready for further use in the workflow.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The masks associated with the loaded images, if available, for use in image processing tasks.
    - Python dtype: `torch.Tensor`
- **`int`**
    - Comfy dtype: `INT`
    - The total count of images loaded from the directory, providing insight into the batch size.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - Reroute
    - [ScribblePreprocessor](../../comfyui_controlnet_aux/Nodes/ScribblePreprocessor.md)
    - [EmptyLatentImage](../../Comfy/Nodes/EmptyLatentImage.md)
    - [DWPreprocessor](../../comfyui_controlnet_aux/Nodes/DWPreprocessor.md)
    - [TilePreprocessor](../../comfyui_controlnet_aux/Nodes/TilePreprocessor.md)
    - [LineArtPreprocessor](../../comfyui_controlnet_aux/Nodes/LineArtPreprocessor.md)
    - [Zoe-DepthMapPreprocessor](../../comfyui_controlnet_aux/Nodes/Zoe-DepthMapPreprocessor.md)



## Source code
```python
class LoadImagesFromDirectoryUpload:
    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        directories = []
        for item in os.listdir(input_dir):
            if not os.path.isfile(os.path.join(input_dir, item)) and item != "clipspace":
                directories.append(item)
        return {
            "required": {
                "directory": (directories,),
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
        directory = folder_paths.get_annotated_filepath(directory.strip())
        return load_images(directory, **kwargs)
    
    @classmethod
    def IS_CHANGED(s, directory: str, **kwargs):
        directory = folder_paths.get_annotated_filepath(directory.strip())
        return is_changed_load_images(directory, **kwargs)

    @classmethod
    def VALIDATE_INPUTS(s, directory: str, **kwargs):
        directory = folder_paths.get_annotated_filepath(directory.strip())
        return validate_load_images(directory)

```
