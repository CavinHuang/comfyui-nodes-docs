---
tags:
- Image
---

# Images to Linear
## Documentation
- Class name: `Images to Linear`
- Category: `WAS Suite/Image`
- Output node: `False`

The node is designed to convert a batch of images to a linear (grayscale) color space. It processes each image in the input batch, converting it from its original color space to grayscale, and then concatenates the results into a single tensor. This operation is useful for tasks that require uniformity in color space across multiple images, such as certain types of image analysis or preprocessing steps before feeding images into a machine learning model.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents a batch of images that the node will convert to grayscale. This conversion is crucial for tasks that benefit from or require image data in a linear color space, simplifying further processing or analysis.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a tensor containing the batch of images converted to grayscale. This uniform linear color space is beneficial for various image processing and analysis tasks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Images_To_Linear:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_to_linear"

    CATEGORY = "WAS Suite/Image"

    def image_to_linear(self, images):

        if len(images) > 1:
            tensors = []
            for image in images:
                tensors.append(pil2tensor(tensor2pil(image).convert('L')))
            tensors = torch.cat(tensors, dim=0)
            return (tensors, )
        else:
            return (pil2tensor(tensor2pil(images).convert("L")), )

```
