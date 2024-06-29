---
tags:
- Image
---

# Image to Seed
## Documentation
- Class name: `Image to Seed`
- Category: `WAS Suite/Image/Analyze`
- Output node: `False`

This node transforms a collection of images into a corresponding set of numerical seeds. It serves as a bridge between visual content and numerical representations, enabling further processing or analysis based on these derived seeds.
## Input types
### Required
- **`images`**
    - The collection of images to be transformed into seeds. This input is crucial for generating a numerical representation that encapsulates the essence of the visual content.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - A list of integers, each representing a seed derived from the corresponding input image. These seeds serve as numerical representations of the images, facilitating further computational tasks.
    - Python dtype: `List[int]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_To_Seed:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "images": ("IMAGE",),
                }
            }

    RETURN_TYPES = ("INT",)
    OUTPUT_IS_LIST = (True,)

    FUNCTION = "image_to_seed"
    CATEGORY = "WAS Suite/Image/Analyze"

    def image_to_seed(self, images):

        seeds = []
        for image in images:
            image = tensor2pil(image)
            seeds.append(image2seed(image))

        return (seeds, )

```
