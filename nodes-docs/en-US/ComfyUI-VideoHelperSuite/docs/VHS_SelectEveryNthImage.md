---
tags:
- Image
- Multimedia
---

# Select Every Nth Image 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_SelectEveryNthImage`
- Category: `Video Helper Suite 🎥🅥🅗🅢/image`
- Output node: `False`

This node is designed to filter through a batch of images, selecting every nth image according to a specified interval. It's useful for thinning out image datasets or preparing sequences of images for processing that requires reduced density.
## Input types
### Required
- **`images`**
    - The collection of images to be filtered. This parameter determines the set of images from which every nth image will be selected, based on the interval defined by 'select_every_nth'.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Tensor`
- **`select_every_nth`**
    - The interval at which images are selected from the input batch. An interval of 'n' means every nth image is kept, with the rest discarded, effectively thinning the batch.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The filtered subset of images, where only every nth image from the original batch is included.
    - Python dtype: `Tensor`
- **`count`**
    - Comfy dtype: `INT`
    - The total number of images selected and returned by the node.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SelectEveryNthImage:
    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {
                    "images": ("IMAGE",),
                    "select_every_nth": ("INT", {"default": 1, "min": 1, "max": BIGMAX, "step": 1}),
                },
            }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/image"

    RETURN_TYPES = ("IMAGE", "INT",)
    RETURN_NAMES = ("IMAGE", "count",)
    FUNCTION = "select_images"

    def select_images(self, images: Tensor, select_every_nth: int):
        sub_images = images[0::select_every_nth]
        return (sub_images, sub_images.size(0))

```
