---
tags:
- ImageMask
- ImageMaskConversion
- Mask
- MaskGeneration
---

# Image To Mask
## Documentation
- Class name: `Image To Mask`
- Category: `Masquerade Nodes`
- Output node: `False`

The Image To Mask node is designed to convert images into masks based on specified criteria. It supports different methods of conversion, allowing for flexibility in how the mask is generated from the image.
## Input types
### Required
- **`image`**
    - The input image to be converted into a mask. This parameter is crucial as it provides the source material from which the mask will be generated.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`method`**
    - Specifies the method of conversion to be used for generating the mask from the image. This affects how the mask is derived, offering options such as intensity-based or alpha channel-based conversions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a mask derived from the input image according to the specified conversion method.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [InvertMask](../../Comfy/Nodes/InvertMask.md)



## Source code
```python
class ImageToMask:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "method": (["intensity", "alpha"],),
            },
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "convert"

    CATEGORY = "Masquerade Nodes"

    def convert(self, image, method):
        if method == "intensity":
            if len(image.shape) > 3 and image.shape[3] == 4:
                image = tensor2rgb(image)
            return (tensor2mask(image),)
        else:
            return (tensor2rgba(image)[:,:,:,0],)

```
