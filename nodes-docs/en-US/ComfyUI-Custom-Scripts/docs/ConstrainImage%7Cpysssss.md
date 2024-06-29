---
tags:
- ImageResize
- ImageScaling
- ImageSize
- ImageTransformation
---

# Constrain Image 🐍
## Documentation
- Class name: `ConstrainImage|pysssss`
- Category: `image`
- Output node: `False`

This node is designed to adjust the dimensions of an image to fit within specified maximum and minimum sizes, ensuring the image's aspect ratio is preserved. It can optionally crop the image if it exceeds the maximum dimensions.
## Input types
### Required
- **`images`**
    - The images to be constrained. This parameter is crucial as it directly influences the node's core functionality of resizing and potentially cropping images to meet the specified size constraints.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
- **`max_width`**
    - Specifies the maximum width the image can have after processing. It plays a key role in determining if and how the image needs to be resized.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_height`**
    - Defines the maximum height the image can have after processing, influencing the resizing logic to ensure the image fits within the specified dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`min_width`**
    - Sets the minimum width the image should have, ensuring the image is not resized below this width.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`min_height`**
    - Determines the minimum height the image should have, preventing the image from being resized below this height.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_if_required`**
    - A flag indicating whether the image should be cropped if it exceeds the maximum dimensions, affecting the final output by potentially altering the image's composition.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed images, resized and optionally cropped to fit within the specified constraints.
    - Python dtype: `List[Image]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConstrainImage:
    """
    A node that constrains an image to a maximum and minimum size while maintaining aspect ratio.
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "max_width": ("INT", {"default": 1024, "min": 0}),
                "max_height": ("INT", {"default": 1024, "min": 0}),
                "min_width": ("INT", {"default": 0, "min": 0}),
                "min_height": ("INT", {"default": 0, "min": 0}),
                "crop_if_required": (["yes", "no"], {"default": "no"}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "constrain_image"
    CATEGORY = "image"
    OUTPUT_IS_LIST = (True,)

    def constrain_image(self, images, max_width, max_height, min_width, min_height, crop_if_required):
        crop_if_required = crop_if_required == "yes"
        results = []
        for image in images:
            i = 255. * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8)).convert("RGB")

            current_width, current_height = img.size
            aspect_ratio = current_width / current_height

            constrained_width = max(min(current_width, min_width), max_width)
            constrained_height = max(min(current_height, min_height), max_height)

            if constrained_width / constrained_height > aspect_ratio:
                constrained_width = max(int(constrained_height * aspect_ratio), min_width)
                if crop_if_required:
                    constrained_height = int(current_height / (current_width / constrained_width))
            else:
                constrained_height = max(int(constrained_width / aspect_ratio), min_height)
                if crop_if_required:
                    constrained_width = int(current_width / (current_height / constrained_height))

            resized_image = img.resize((constrained_width, constrained_height), Image.LANCZOS)

            if crop_if_required and (constrained_width > max_width or constrained_height > max_height):
                left = max((constrained_width - max_width) // 2, 0)
                top = max((constrained_height - max_height) // 2, 0)
                right = min(constrained_width, max_width) + left
                bottom = min(constrained_height, max_height) + top
                resized_image = resized_image.crop((left, top, right, bottom))

            resized_image = np.array(resized_image).astype(np.float32) / 255.0
            resized_image = torch.from_numpy(resized_image)[None,]
            results.append(resized_image)
                
        return (results,)

```
