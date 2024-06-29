---
tags:
- Comparison
---

# Image Comparer (rgthree)
## Documentation
- Class name: `Image Comparer (rgthree)`
- Category: `rgthree`
- Output node: `True`

This node provides a user interface for comparing two images, allowing for a side-by-side comparison to evaluate differences or similarities.
## Input types
### Required
- **`image_a`**
    - The primary image to be compared. It is a required input for the comparison process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Tuple[torch.Tensor]`
### Optional
- **`image_b`**
    - The secondary image to be compared against the primary image. This input is optional; if not provided, a second image from the 'image_a' batch can be used.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[Tuple[torch.Tensor]]`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeImageComparer(PreviewImage):
  """A node that compares two images in the UI."""

  NAME = get_name('Image Comparer')
  CATEGORY = get_category()
  FUNCTION = "compare_images"

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    return {
      "required": {
        "image_a": ("IMAGE",),
      },
      "optional": {
        "image_b": ("IMAGE",),
      },
      "hidden": {
        "prompt": "PROMPT",
        "extra_pnginfo": "EXTRA_PNGINFO"
      },
    }

  def compare_images(self,
                     image_a,
                     image_b=None,
                     filename_prefix="rgthree.compare.",
                     prompt=None,
                     extra_pnginfo=None):
    images = []
    images.append(image_a[0])
    if image_b is not None and len(image_b) > 0:
      images.append(image_b[0])
    elif len(image_a) > 1:
      images.append(image_b[1])
    else:
      raise ValueError(
        "You must supply two images; either both image_a & image_b, or two batch images in image_a")

    return self.save_images(images, filename_prefix, prompt, extra_pnginfo)

```
