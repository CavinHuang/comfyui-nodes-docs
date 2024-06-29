---
tags:
- Image
- ImageSequence
---

# Batch Load Image Sequence With Stop Index
## Documentation
- Class name: `JWLoadImageSequenceWithStopIndex`
- Category: `jamesWalker55`
- Output node: `False`

This node is designed to batch load a sequence of images based on a specified start and stop index, with options to include or exclude the stop index and to ignore missing images. It facilitates the dynamic loading of image sequences from a filesystem, allowing for flexible data handling in image processing workflows.
## Input types
### Required
- **`path_pattern`**
    - Specifies the pattern or path for locating the images to be loaded, using placeholders for indices.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`start_index`**
    - Defines the starting index for the sequence of images to be loaded.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`stop_index`**
    - Sets the ending index for the image sequence loading, determining the range of images to include.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`inclusive`**
    - Determines whether the stop index is included in the loading sequence, allowing for inclusive or exclusive range selection.
    - Comfy dtype: `['false', 'true']`
    - Python dtype: `str`
- **`ignore_missing_images`**
    - Controls whether to ignore missing images within the specified range, enabling robust handling of incomplete sequences.
    - Comfy dtype: `['false', 'true']`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns the loaded sequence of images as a tensor, ready for further processing or analysis.
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
