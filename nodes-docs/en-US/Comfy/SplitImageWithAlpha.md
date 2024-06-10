---
tags:
- AlphaChannel
- Image
---

# Split Image with Alpha
## Documentation
- Class name: `SplitImageWithAlpha`
- Category: `mask/compositing`
- Output node: `False`

The SplitImageWithAlpha node is designed to separate the color and alpha components of an image. It processes an input image tensor, extracting the RGB channels as the color component and the alpha channel as the transparency component, facilitating operations that require manipulation of these distinct image aspects.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image tensor from which the RGB and alpha channels are to be separated. It is crucial for the operation as it provides the source data for the split.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The 'image' output represents the separated RGB channels of the input image, providing the color component without the transparency information.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The 'mask' output represents the separated alpha channel of the input image, providing the transparency information.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PorterDuffImageComposite](../../Comfy/Nodes/PorterDuffImageComposite.md)



## Source code
```python
class SplitImageWithAlpha:
    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {
                    "image": ("IMAGE",),
                }
        }

    CATEGORY = "mask/compositing"
    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "split_image_with_alpha"

    def split_image_with_alpha(self, image: torch.Tensor):
        out_images = [i[:,:,:3] for i in image]
        out_alphas = [i[:,:,3] if i.shape[2] > 3 else torch.ones_like(i[:,:,0]) for i in image]
        result = (torch.stack(out_images), 1.0 - torch.stack(out_alphas))
        return result

```
