---
tags:
- Image
---

# Load Image Batch From Dir (Inspire)
## Documentation
- Class name: `LoadImagesFromDir __Inspire`
- Category: `image`
- Output node: `False`

This node is designed to load a batch of images from a specified directory, processing them for use in image-based machine learning or image processing tasks. It efficiently handles image loading, optional resizing, and format normalization to ensure compatibility with downstream processes.
## Input types
### Required
- **`directory`**
    - Specifies the directory path from which images are to be loaded. This parameter is crucial for determining the source of the images to be processed by the node.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`image_load_cap`**
    - Limits the number of images to be loaded from the directory, allowing for control over resource usage and processing time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_index`**
    - Determines the starting index for loading images, enabling partial loading of images from a directory based on order.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`load_always`**
    - A flag to indicate whether images should be loaded regardless of other conditions, ensuring flexibility in loading behavior.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The loaded images, processed and formatted for further use in image-based applications.
    - Python dtype: `List[torch.Tensor]`
- **`mask`**
    - Comfy dtype: `MASK`
    - Optional masks associated with the loaded images, useful for tasks requiring background separation or focus on specific image regions.
    - Python dtype: `List[torch.Tensor]`
- **`int`**
    - Comfy dtype: `INT`
    - The total number of images loaded, providing a count that can be useful for further processing steps or for informational purposes.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LoadImagesFromDirBatch:
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

    RETURN_TYPES = ("IMAGE", "MASK", "INT")
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
            raise FileNotFoundError(f"Directory '{directory} cannot be found.'")
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

        has_non_empty_mask = False

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
                has_non_empty_mask = True
            else:
                mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")
            images.append(image)
            masks.append(mask)
            image_count += 1

        if len(images) == 1:
            return (images[0], masks[0], 1)

        elif len(images) > 1:
            image1 = images[0]
            mask1 = None

            for image2 in images[1:]:
                if image1.shape[1:] != image2.shape[1:]:
                    image2 = comfy.utils.common_upscale(image2.movedim(-1, 1), image1.shape[2], image1.shape[1], "bilinear", "center").movedim(1, -1)
                image1 = torch.cat((image1, image2), dim=0)

            for mask2 in masks[1:]:
                if has_non_empty_mask:
                    if image1.shape[1:3] != mask2.shape:
                        mask2 = torch.nn.functional.interpolate(mask2.unsqueeze(0).unsqueeze(0), size=(image1.shape[2], image1.shape[1]), mode='bilinear', align_corners=False)
                        mask2 = mask2.squeeze(0)
                    else:
                        mask2 = mask2.unsqueeze(0)
                else:
                    mask2 = mask2.unsqueeze(0)

                if mask1 is None:
                    mask1 = mask2
                else:
                    mask1 = torch.cat((mask1, mask2), dim=0)

            return (image1, mask1, len(images))

```
