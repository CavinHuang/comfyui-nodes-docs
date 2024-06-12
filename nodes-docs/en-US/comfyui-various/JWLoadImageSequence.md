---
tags:
- Image
- ImageSequence
---

# Batch Load Image Sequence
## Documentation
- Class name: `JWLoadImageSequence`
- Category: `jamesWalker55`
- Output node: `False`

This node is designed for batch loading of image sequences with a specified stop index, enabling the efficient handling and processing of multiple images at once by allowing users to define a specific range within the sequence.
## Input types
### Required
- **`path_pattern`**
    - Specifies the pattern or path used to locate and load the images in the sequence, playing a crucial role in identifying the files to be processed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`start_index`**
    - Defines the starting index for loading the image sequence, determining the initial image to be included in the processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frame_count`**
    - Indicates the number of frames to be loaded from the starting index, controlling the length of the image sequence to be processed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ignore_missing_images`**
    - Determines whether to ignore missing images within the specified range, allowing for flexible handling of incomplete sequences.
    - Comfy dtype: `['false', 'true']`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a batch of images loaded based on the specified criteria, ready for further processing or analysis.
    - Python dtype: `torch.Tensor`
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
