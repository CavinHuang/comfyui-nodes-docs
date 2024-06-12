---
tags:
- ImageScaling
- Upscale
---

# Image Scale Down To Size
## Documentation
- Class name: `easy imageScaleDownToSize`
- Category: `EasyUse/Image`
- Output node: `False`

This node provides functionality for scaling down images to a specified size while maintaining the aspect ratio. It allows users to choose between scaling down to the maximum or minimum dimension of the image, ensuring the final image dimensions do not exceed the specified size.
## Input types
### Required
- **`images`**
    - The input images to be scaled down. This parameter is crucial for defining the source images that the scaling operation will be applied to.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`size`**
    - The target size to scale down the images to. This parameter determines the maximum dimension (width or height) of the output images, depending on the mode selected.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mode`**
    - A boolean flag indicating the scaling mode: 'max' to scale down based on the larger dimension or 'min' to scale based on the smaller dimension. This affects how the aspect ratio is preserved during scaling.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output images after scaling down to the specified size, with aspect ratio maintained.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class imageScaleDownToSize(imageScaleDownBy):
  @classmethod
  def INPUT_TYPES(s):
    return {
      "required": {
        "images": ("IMAGE",),
        "size": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
        "mode": ("BOOLEAN", {"default": True, "label_on": "max", "label_off": "min"}),
      }
    }

  RETURN_TYPES = ("IMAGE",)
  CATEGORY = "EasyUse/Image"
  FUNCTION = "image_scale_down_to_size"

  def image_scale_down_to_size(self, images, size, mode):
    width = images.shape[2]
    height = images.shape[1]

    if mode:
      scale_by = size / max(width, height)
    else:
      scale_by = size / min(width, height)

    scale_by = min(scale_by, 1.0)
    return self.image_scale_down_by(images, scale_by)

```
