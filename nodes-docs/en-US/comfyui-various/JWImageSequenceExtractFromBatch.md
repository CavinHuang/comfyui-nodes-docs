---
tags:
- Batch
- Image
- ImageBatch
---

# Extract Image Sequence From Batch
## Documentation
- Class name: `JWImageSequenceExtractFromBatch`
- Category: `jamesWalker55`
- Output node: `False`

This node is designed to extract a sequence of images from a batch based on specified start and stop indices, optionally including the stop index in the extraction. It enables selective retrieval of image sequences from larger collections, facilitating operations on specific subsets of image data.
## Input types
### Required
- **`images`**
    - The batch of images from which a sequence is to be extracted. This parameter is crucial for defining the source of the images to be processed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`i_start`**
    - The start index for the sequence extraction, determining the first image in the sequence to be included.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`i_stop`**
    - The stop index for the sequence extraction, determining the last image in the sequence to potentially be included.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`inclusive`**
    - A flag indicating whether the stop index should be included in the extraction, allowing for flexible endpoint inclusion.
    - Comfy dtype: `['false', 'true']`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The extracted sequence of images as a tensor, representing a subset of the original batch based on the specified indices.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
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
