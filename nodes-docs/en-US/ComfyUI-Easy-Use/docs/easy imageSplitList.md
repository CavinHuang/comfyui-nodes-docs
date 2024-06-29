---
tags:
- Batch
- Image
- ImageSplitting
---

# imageSplitList
## Documentation
- Class name: `easy imageSplitList`
- Category: `EasyUse/Image`
- Output node: `False`

The node 'easy imageSplitList' is designed to split a given image into a list of smaller images, facilitating operations that require individual processing of segments or portions of the original image.
## Input types
### Required
- **`images`**
    - The 'images' parameter accepts an image or a batch of images to be split. It plays a crucial role in determining how the original image(s) will be divided into smaller segments.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The output 'images' consists of a list of smaller images that have been split from the original input. This allows for individual processing or analysis of each segment.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class imageSplitList:
  @classmethod

  def INPUT_TYPES(s):
    return {
      "required": {
        "images": ("IMAGE",),
      },
    }

  RETURN_TYPES = ("IMAGE", "IMAGE", "IMAGE",)
  RETURN_NAMES = ("images", "images", "images",)
  FUNCTION = "doit"
  CATEGORY = "EasyUse/Image"

  def doit(self, images):
    length = len(images)
    new_images = ([], [], [])
    if length % 3 == 0:
      for index, img in enumerate(images):
        if index % 3 == 0:
          new_images[0].append(img)
        elif (index+1) % 3 == 0:
          new_images[2].append(img)
        else:
          new_images[1].append(img)
    elif length % 2 == 0:
      for index, img in enumerate(images):
        if index % 2 == 0:
          new_images[0].append(img)
        else:
          new_images[1].append(img)
    return new_images

```
