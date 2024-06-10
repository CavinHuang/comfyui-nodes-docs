---
tags:
- Image
- ImageSave
---

# Batch Save Image Sequence
## Documentation
- Class name: `JWSaveImageSequence`
- Category: `jamesWalker55`
- Output node: `True`

The JWSaveImageSequence node is designed for batch saving of image sequences to a specified path, allowing for customization of file naming, indexing, and the option to overwrite existing files. It facilitates the organized output of image data, supporting additional metadata and prompt information for each image saved.
## Input types
### Required
- **`images`**
    - A tensor of images to be saved. This collection represents the sequence of images that will be saved in the batch operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`path_pattern`**
    - A string pattern that defines the file naming convention and path for saving each image in the sequence. It supports formatting to include indices.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`start_index`**
    - The starting index for naming the saved image files, which is used in conjunction with the path pattern to generate file names.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`overwrite`**
    - A string indicating whether existing files at the target save locations should be overwritten. Accepts 'true' or 'false' as values.
    - Comfy dtype: `['false', 'true']`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWLoadImageSequence", "Batch Load Image Sequence")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "path_pattern": (
                "STRING",
                {"default": "./frame{:06d}.png", "multiline": False},
            ),
            "start_index": ("INT", {"default": 0, "min": 0, "step": 1}),
            "frame_count": ("INT", {"default": 16, "min": 1, "step": 1}),
            "ignore_missing_images": (("false", "true"), {"default": "false"}),
        }
    }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(
        self,
        path_pattern: str,
        start_index: int,
        frame_count: int,
        ignore_missing_images: str,
    ):
        ignore_missing_images: bool = ignore_missing_images == "true"

        # generate image paths to load
        image_paths = []
        for i in range(start_index, start_index + frame_count):
            try:
                image_paths.append(path_pattern.format(i))
            except KeyError:
                image_paths.append(path_pattern.format(i=i))

        if ignore_missing_images:
            # remove missing images
            image_paths = [p for p in image_paths if os.path.exists(p)]
        else:
            # early check for missing images
            for path in image_paths:
                if not os.path.exists(path):
                    raise FileNotFoundError(f"Image does not exist: {path}")

        if len(image_paths) == 0:
            raise RuntimeError("Image sequence empty - no images to load")

        imgs = []
        for path in image_paths:
            img = load_image(path)
            # img.shape => torch.Size([1, 768, 768, 3])
            imgs.append(img)

        imgs = torch.cat(imgs, dim=0)

        return (imgs,)

```
