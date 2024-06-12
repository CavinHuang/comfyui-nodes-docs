---
tags:
- ImageScaling
- Upscale
---

# Scale Down
## Documentation
- Class name: `ImageScaleDown`
- Category: `Art Venture/Utils`
- Output node: `False`

The ImageScaleDown node is designed to reduce the dimensions of an image or a batch of images to a smaller size, maintaining the aspect ratio and optionally center-cropping to fit the specified dimensions. This operation is essential for optimizing image processing workflows, reducing computational load, and preparing images for further processing or display.
## Input types
### Required
- **`images`**
    - The input images to be scaled down. This parameter is crucial as it directly influences the output by determining which images undergo the scaling process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`width`**
    - The target width for the scaled-down image(s). This parameter defines the horizontal dimension of the output images, affecting the scaling ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The target height for the scaled-down image(s). This parameter defines the vertical dimension of the output images, affecting the scaling ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop`**
    - A mode specifying if and how the images should be cropped after scaling to ensure they fit the target dimensions. This affects the final appearance of the scaled images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The scaled-down images, potentially cropped to fit the specified dimensions. This output is the direct result of the scaling operation applied to the input images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilImageScaleDown:
    crop_methods = ["disabled", "center"]

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "width": (
                    "INT",
                    {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1},
                ),
                "height": (
                    "INT",
                    {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1},
                ),
                "crop": (s.crop_methods,),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "image_scale_down"

    def image_scale_down(self, images, width, height, crop):
        if crop == "center":
            old_width = images.shape[2]
            old_height = images.shape[1]
            old_aspect = old_width / old_height
            new_aspect = width / height
            x = 0
            y = 0
            if old_aspect > new_aspect:
                x = round((old_width - old_width * (new_aspect / old_aspect)) / 2)
            elif old_aspect < new_aspect:
                y = round((old_height - old_height * (old_aspect / new_aspect)) / 2)
            s = images[:, y : old_height - y, x : old_width - x, :]
        else:
            s = images

        results = []
        for image in s:
            img = tensor2pil(image).convert("RGB")
            img = img.resize((width, height), Image.LANCZOS)
            results.append(pil2tensor(img))

        return (torch.cat(results, dim=0),)

```
