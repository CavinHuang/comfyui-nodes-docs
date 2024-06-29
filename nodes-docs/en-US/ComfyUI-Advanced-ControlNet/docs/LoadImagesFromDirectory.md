---
tags:
- Image
- ImageLoad
---

# 🚫Load Images [DEPRECATED] 🛂🅐🅒🅝
## Documentation
- Class name: `LoadImagesFromDirectory`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/deprecated`
- Output node: `False`

This node is designed to load images from a specified directory, handling various image formats and optionally applying transformations such as EXIF orientation correction and conversion to a consistent color space. It supports loading a capped number of images, and can also generate masks for images with transparency, making it suitable for tasks that require both image and mask inputs.
## Input types
### Required
- **`directory`**
    - The path to the directory from which images are to be loaded. This parameter is crucial as it determines the source of the images for processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`image_load_cap`**
    - Limits the number of images to load from the directory, enabling control over the volume of data processed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_index`**
    - Specifies the index of the first image to load from the sorted list of files in the directory, allowing for selective loading of images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - A batch of loaded images, preprocessed and converted into tensors.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - A batch of masks corresponding to the loaded images, useful for segmentation tasks.
    - Python dtype: `torch.Tensor`
- **`int`**
    - Comfy dtype: `INT`
    - The total number of images successfully loaded from the directory.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LoadImagesFromDirectory:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "directory": ("STRING", {"default": ""}),
            },
            "optional": {
                "image_load_cap": ("INT", {"default": 0, "min": 0, "max": BIGMAX, "step": 1}),
                "start_index": ("INT", {"default": 0, "min": 0, "max": BIGMAX, "step": 1}),
            }
        }
    
    RETURN_TYPES = ("IMAGE", "MASK", "INT")
    FUNCTION = "load_images"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/deprecated"

    def load_images(self, directory: str, image_load_cap: int = 0, start_index: int = 0):
        if not os.path.isdir(directory):
            raise FileNotFoundError(f"Directory '{directory} cannot be found.'")
        dir_files = os.listdir(directory)
        if len(dir_files) == 0:
            raise FileNotFoundError(f"No files in directory '{directory}'.")

        dir_files = sorted(dir_files)
        dir_files = [os.path.join(directory, x) for x in dir_files]
        # start at start_index
        dir_files = dir_files[start_index:]

        images = []
        masks = []

        limit_images = False
        if image_load_cap > 0:
            limit_images = True
        image_count = 0

        for image_path in dir_files:
            if os.path.isdir(image_path):
                continue
            if limit_images and image_count >= image_load_cap:
                break
            i = Image.open(image_path)
            i = ImageOps.exif_transpose(i)
            image = i.convert("RGB")
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
            if 'A' in i.getbands():
                mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
                mask = 1. - torch.from_numpy(mask)
            else:
                mask = torch.zeros((64,64), dtype=torch.float32, device="cpu")
            images.append(image)
            masks.append(mask)
            image_count += 1
        
        if len(images) == 0:
            raise FileNotFoundError(f"No images could be loaded from directory '{directory}'.")

        return (torch.cat(images, dim=0), torch.stack(masks, dim=0), image_count)

```
