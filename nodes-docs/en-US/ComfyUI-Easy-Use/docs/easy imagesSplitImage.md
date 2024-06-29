---
tags:
- Batch
- Image
- ImageSplitting
---

# imagesSplitImage
## Documentation
- Class name: `easy imagesSplitImage`
- Category: `EasyUse/Image`
- Output node: `False`

The `easy imagesSplitImage` node is designed to split a single image tensor into multiple segments, distributing the original image's content across several new image tensors. This operation facilitates the manipulation and analysis of image data by breaking it down into more manageable pieces.
## Input types
### Required
- **`images`**
    - The `images` parameter represents the input image tensor that is to be split into multiple segments. This parameter is crucial for determining how the original image is divided and influences the resulting segmented images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image1`**
    - Comfy dtype: `IMAGE`
    - Represents the first segment of the split image.
    - Python dtype: `torch.Tensor`
- **`image2`**
    - Comfy dtype: `IMAGE`
    - Represents the second segment of the split image.
    - Python dtype: `torch.Tensor`
- **`image3`**
    - Comfy dtype: `IMAGE`
    - Represents the third segment of the split image.
    - Python dtype: `torch.Tensor`
- **`image4`**
    - Comfy dtype: `IMAGE`
    - Represents the fourth segment of the split image.
    - Python dtype: `torch.Tensor`
- **`image5`**
    - Comfy dtype: `IMAGE`
    - Represents the fifth segment of the split image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class imagesSplitImage:
    @classmethod
    def INPUT_TYPES(s):
        return {
          "required": {
              "images": ("IMAGE",),
          }
        }

    RETURN_TYPES = ("IMAGE", "IMAGE", "IMAGE", "IMAGE", "IMAGE")
    RETURN_NAMES = ("image1", "image2", "image3", "image4", "image5")
    FUNCTION = "split"
    CATEGORY = "EasyUse/Image"

    def split(self, images,):
      new_images = torch.chunk(images, len(images), dim=0)
      return new_images

```
