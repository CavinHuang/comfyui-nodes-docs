---
tags:
- Image
---

# Load Image List From Dir (Inspire)
## Documentation
- Class name: `LoadImageListFromDir __Inspire`
- Category: `image`
- Output node: `False`

This node is designed to load a list of images from a specified directory, facilitating batch processing or analysis of multiple images at once. It abstracts the complexities of reading and processing image files from the filesystem, making it easier to integrate image data into workflows.
## Input types
### Required
- **`directory`**
    - Specifies the directory path from which images will be loaded. This parameter is crucial for determining the source of the images to be processed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`image_load_cap`**
    - Limits the number of images to be loaded from the directory, allowing for control over resource usage and processing time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_index`**
    - Determines the starting index for loading images, enabling selective reading of images from a larger set.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`load_always`**
    - A flag that, when set, forces the node to load images regardless of other conditions that might normally prevent loading.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - A list of loaded images, processed and ready for further use in the workflow.
    - Python dtype: `List[torch.Tensor]`
- **`mask`**
    - Comfy dtype: `MASK`
    - A list of masks corresponding to the loaded images, useful for operations requiring image segmentation or modification.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LoadImagesFromDirList:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "directory": ("STRING", {"default": ""}),
            },
            "optional": {
                "image_load_cap": ("INT", {"default": 0, "min": 0, "step": 1}),
                "start_index": ("INT", {"default": 0, "min": 0, "step": 1}),
                "load_always": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK")
    OUTPUT_IS_LIST = (True, True)

    FUNCTION = "load_images"

    CATEGORY = "image"

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        if 'load_always' in kwargs and kwargs['load_always']:
            return float("NaN")
        else:
            return hash(frozenset(kwargs))

    def load_images(self, directory: str, image_load_cap: int = 0, start_index: int = 0, load_always=False):
        if not os.path.isdir(directory):
            raise FileNotFoundError(f"Directory '{directory}' cannot be found.")
        dir_files = os.listdir(directory)
        if len(dir_files) == 0:
            raise FileNotFoundError(f"No files in directory '{directory}'.")

        # Filter files by extension
        valid_extensions = ['.jpg', '.jpeg', '.png', '.webp']
        dir_files = [f for f in dir_files if any(f.lower().endswith(ext) for ext in valid_extensions)]

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
            if os.path.isdir(image_path) and os.path.ex:
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
                mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")

            images.append(image)
            masks.append(mask)
            image_count += 1

        return images, masks

```
