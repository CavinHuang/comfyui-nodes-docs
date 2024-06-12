---
tags:
- DepthMap
- Image
- Inpaint
---

# Inpaint Preprocessor
## Documentation
- Class name: `InpaintPreprocessor`
- Category: `ControlNet Preprocessors/others`
- Output node: `False`

The InpaintPreprocessor node is designed for preparing images for inpainting tasks by applying a mask to the input image. It modifies the image by marking specified areas (as defined by the mask) as needing inpainting, effectively setting up the image for further processing where these areas can be filled or corrected.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image that needs inpainting. It is crucial for defining the areas that will remain unchanged during the inpainting process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - The 'mask' parameter specifies the areas within the image that require inpainting. It plays a key role in identifying which parts of the image should be processed or filled by the inpainting algorithm.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a modified version of the input image, where areas specified by the mask are marked for inpainting, ready for further processing.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [ImageScale](../../Comfy/Nodes/ImageScale.md)



## Source code
```python
class InpaintPreprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "image": ("IMAGE",), "mask": ("MASK",)}}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "preprocess"

    CATEGORY = "ControlNet Preprocessors/others"

    def preprocess(self, image, mask):
        mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(image.shape[1], image.shape[2]), mode="bilinear")
        mask = mask.movedim(1,-1).expand((-1,-1,-1,3))
        image = image.clone()
        image[mask > 0.5] = -1.0  # set as masked pixel
        return (image,)

```
