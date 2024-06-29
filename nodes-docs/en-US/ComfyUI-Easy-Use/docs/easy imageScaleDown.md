---
tags:
- ImageScaling
- Upscale
---

# Image Scale Down
## Documentation
- Class name: `easy imageScaleDown`
- Category: `EasyUse/Image`
- Output node: `False`

The node 'easy imageScaleDown' is designed to reduce the resolution of an image according to specified downscaling options. It focuses on adjusting the image size while maintaining essential details through various downscaling methods, such as bicubic interpolation. This node is particularly useful in scenarios where image size reduction is required without significant loss of visual quality, optimizing images for various applications like faster web loading or efficient storage.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the input images to be downscaled. It is crucial for determining the starting point of the downscaling process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`width`**
    - The 'width' parameter specifies the target width for the downscaled image. It directly influences the dimensions of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The 'height' parameter specifies the target height for the downscaled image. It directly influences the dimensions of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop`**
    - The 'crop' parameter determines how the image will be cropped during the downscaling process, affecting the final appearance and dimensions of the output image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is the downscaled version of the input images, optimized in size while aiming to preserve as much of the original detail as possible.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class imageScaleDown:
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
  CATEGORY = "EasyUse/Image"
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
      s = images[:, y: old_height - y, x: old_width - x, :]
    else:
      s = images

    results = []
    for image in s:
      img = tensor2pil(image).convert("RGB")
      img = img.resize((width, height), Image.LANCZOS)
      results.append(pil2tensor(img))

    return (torch.cat(results, dim=0),)

```
