---
tags:
- ImageScaling
- Upscale
---

# Image Scale Down By
## Documentation
- Class name: `easy imageScaleDownBy`
- Category: `EasyUse/Image`
- Output node: `False`

The node is designed to scale down images by a specified factor, adjusting the dimensions of the image while maintaining its aspect ratio. It provides a straightforward way to reduce the resolution of images for various applications, such as optimizing for performance or adjusting for display sizes.
## Input types
### Required
- **`images`**
    - Specifies the images to be scaled down. This parameter is crucial for defining the input images that will undergo the scaling process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`scale_by`**
    - Determines the factor by which the images will be scaled down. This parameter directly influences the output size of the images, allowing for precise control over the scaling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The scaled-down images, with dimensions adjusted according to the specified scale factor.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class imageScaleDownBy(imageScaleDown):
  @classmethod
  def INPUT_TYPES(s):
    return {
      "required": {
        "images": ("IMAGE",),
        "scale_by": (
          "FLOAT",
          {"default": 0.5, "min": 0.01, "max": 1.0, "step": 0.01},
        ),
      }
    }

  RETURN_TYPES = ("IMAGE",)
  CATEGORY = "EasyUse/Image"
  FUNCTION = "image_scale_down_by"

  def image_scale_down_by(self, images, scale_by):
    width = images.shape[2]
    height = images.shape[1]
    new_width = int(width * scale_by)
    new_height = int(height * scale_by)
    return self.image_scale_down(images, new_width, new_height, "center")

```
