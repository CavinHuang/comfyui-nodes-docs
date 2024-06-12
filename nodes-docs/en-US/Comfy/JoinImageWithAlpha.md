---
tags:
- AlphaChannel
- Image
---

# Join Image with Alpha
## Documentation
- Class name: `JoinImageWithAlpha`
- Category: `mask/compositing`
- Output node: `False`

This node is designed for compositing operations, specifically to join an image with its corresponding alpha mask to produce a single output image. It effectively combines visual content with transparency information, enabling the creation of images where certain areas are transparent or semi-transparent.
## Input types
### Required
- **`image`**
    - The main visual content to be combined with an alpha mask. It represents the image without transparency information.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`alpha`**
    - The alpha mask that defines the transparency of the corresponding image. It is used to determine which parts of the image should be transparent or semi-transparent.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a single image that combines the input image with the alpha mask, incorporating transparency information into the visual content.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class JoinImageWithAlpha:
    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {
                    "image": ("IMAGE",),
                    "alpha": ("MASK",),
                }
        }

    CATEGORY = "mask/compositing"
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "join_image_with_alpha"

    def join_image_with_alpha(self, image: torch.Tensor, alpha: torch.Tensor):
        batch_size = min(len(image), len(alpha))
        out_images = []

        alpha = 1.0 - resize_mask(alpha, image.shape[1:])
        for i in range(batch_size):
           out_images.append(torch.cat((image[i][:,:,:3], alpha[i].unsqueeze(2)), dim=2))

        result = (torch.stack(out_images),)
        return result

```
