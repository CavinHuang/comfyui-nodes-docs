---
tags:
- ImageMask
- ImageMaskConversion
- Mask
- MaskGeneration
---

# Convert Mask to Image
## Documentation
- Class name: `MaskToImage`
- Category: `mask`
- Output node: `False`

The `MaskToImage` node is designed to convert a mask into an image format. This transformation allows for the visualization and further processing of masks as images, facilitating a bridge between mask-based operations and image-based applications.
## Input types
### Required
- **`mask`**
    - The mask input is essential for the conversion process, serving as the source data that will be transformed into an image format. This input dictates the shape and content of the resulting image.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image representation of the input mask, enabling visual inspection and further image-based manipulations.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [Paste By Mask](../../masquerade-nodes-comfyui/Nodes/Paste By Mask.md)
    - RegionalIPAdapterColorMask //Inspire
    - [ImageCompositeMasked](../../Comfy/Nodes/ImageCompositeMasked.md)
    - [ImageInvert](../../Comfy/Nodes/ImageInvert.md)
    - [Image To Mask](../../masquerade-nodes-comfyui/Nodes/Image To Mask.md)
    - [Cut By Mask](../../masquerade-nodes-comfyui/Nodes/Cut By Mask.md)
    - [Blur](../../masquerade-nodes-comfyui/Nodes/Blur.md)



## Source code
```python
class MaskToImage:
    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {
                    "mask": ("MASK",),
                }
        }

    CATEGORY = "mask"

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "mask_to_image"

    def mask_to_image(self, mask):
        result = mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])).movedim(1, -1).expand(-1, -1, -1, 3)
        return (result,)

```
