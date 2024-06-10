---
tags:
- ImageResolution
- ImageTransformation
---

# ImagePixelPerfect
## Documentation
- Class name: `easy imagePixelPerfect`
- Category: `EasyUse/Image`
- Output node: `True`

This node is designed to enhance image quality by adjusting the pixel perfection of images. It focuses on optimizing the resolution and sharpness to achieve the best possible visual clarity without altering the original image's content.
## Input types
### Required
- **`image`**
    - The input image to be processed for pixel perfection. This parameter is essential for the node to perform its function of optimizing the image's resolution and sharpness.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`resize_mode`**
    - Specifies the mode of resizing to be applied to the image, such as resizing to a specific dimension or scaling down while maintaining the aspect ratio. This parameter plays a crucial role in determining how the image's pixel perfection is enhanced.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`resolution`**
    - Comfy dtype: `INT`
    - The optimized resolution of the image after processing, indicating the enhanced pixel perfection.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class imagePixelPerfect:
  @classmethod
  def INPUT_TYPES(s):
    RESIZE_MODES = [ResizeMode.RESIZE.value, ResizeMode.INNER_FIT.value, ResizeMode.OUTER_FIT.value]
    return {
      "required": {
        "image": ("IMAGE",),
        "resize_mode": (RESIZE_MODES, {"default": ResizeMode.RESIZE.value})
      }
    }

  RETURN_TYPES = ("INT",)
  RETURN_NAMES = ("resolution",)
  OUTPUT_NODE = True
  FUNCTION = "execute"

  CATEGORY = "EasyUse/Image"

  def execute(self, image, resize_mode):

    _, raw_H, raw_W, _ = image.shape

    width = raw_W
    height = raw_H

    k0 = float(height) / float(raw_H)
    k1 = float(width) / float(raw_W)

    if resize_mode == ResizeMode.OUTER_FIT.value:
      estimation = min(k0, k1) * float(min(raw_H, raw_W))
    else:
      estimation = max(k0, k1) * float(min(raw_H, raw_W))

    result = int(np.round(estimation))
    text = f"Width:{str(width)}\nHeight:{str(height)}\nPixelPerfect:{str(result)}"

    return {"ui": {"text": text}, "result": (result,)}

```
