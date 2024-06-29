---
tags:
- Image
---

# Load Image From URL
## Documentation
- Class name: `LoadImageFromUrl`
- Category: `Art Venture/Image`
- Output node: `False`

This node specializes in fetching and processing images from URLs, enabling the handling of various image formats with an option to maintain transparency information.
## Input types
### Required
- **`url`**
    - Specifies the URL from which the image will be loaded, supporting a wide range of sources.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`keep_alpha_channel`**
    - Indicates whether the transparency channel of the image should be retained, useful for images where transparency is key.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`output_mode`**
    - Controls the output format of the image, offering options between list and batch modes for flexibility in handling the loaded images.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `str`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The loaded images, potentially including transparency information if specified.
    - Python dtype: `torch.Tensor`
- **`masks`**
    - Comfy dtype: `MASK`
    - Generated masks from the images, useful for further image processing tasks.
    - Python dtype: `torch.Tensor`
- **`has_image`**
    - Comfy dtype: `BOOLEAN`
    - A boolean indicator of whether an image was successfully loaded.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilLoadImageFromUrl:
    def __init__(self) -> None:
        self.output_dir = folder_paths.get_temp_directory()
        self.filename_prefix = "TempImageFromUrl"

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "url": ("STRING", {"default": "", "multiline": True, "dynamicPrompts": False}),
            },
            "optional": {
                "keep_alpha_channel": (
                    "BOOLEAN",
                    {"default": False, "label_on": "enabled", "label_off": "disabled"},
                ),
                "output_mode": (
                    "BOOLEAN",
                    {"default": False, "label_on": "list", "label_off": "batch"},
                ),
            },
        }

    RETURN_TYPES = ("IMAGE", "MASK", "BOOLEAN")
    OUTPUT_IS_LIST = (True, True, False)
    RETURN_NAMES = ("images", "masks", "has_image")
    CATEGORY = "Art Venture/Image"
    FUNCTION = "load_image"

    def load_image(self, url: str, keep_alpha_channel=False, output_mode=False):
        urls = url.strip().split("\n")
        images, masks = load_images_from_url(urls, keep_alpha_channel)
        if len(images) == 0:
            image = torch.zeros((1, 64, 64, 3), dtype=torch.float32, device="cpu")
            mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")
            return ([image], [mask], False)

        previews = []
        np_images = []
        np_masks = []

        for image, mask in zip(images, masks):
            # save image to temp folder
            preview = prepare_image_for_preview(image, self.output_dir, self.filename_prefix)
            image = pil2tensor(image)

            if mask:
                mask = np.array(mask).astype(np.float32) / 255.0
                mask = 1.0 - torch.from_numpy(mask)
            else:
                mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")

            previews.append(preview)
            np_images.append(image)
            np_masks.append(mask.unsqueeze(0))

        if output_mode:
            result = (np_images, np_masks, True)
        else:
            has_size_mismatch = False
            if len(np_images) > 1:
                for image in np_images[1:]:
                    if image.shape[1] != np_images[0].shape[1] or image.shape[2] != np_images[0].shape[2]:
                        has_size_mismatch = True
                        break

            if has_size_mismatch:
                raise Exception("To output as batch, images must have the same size. Use list output mode instead.")

            result = ([torch.cat(np_images)], [torch.cat(np_masks)], True)

        return {"ui": {"images": previews}, "result": result}

```
