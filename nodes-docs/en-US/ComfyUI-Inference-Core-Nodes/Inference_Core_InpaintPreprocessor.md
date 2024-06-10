---
tags:
- DepthMap
- Image
- Inpaint
---

# [Inference.Core] Inpaint Preprocessor
## Documentation
- Class name: `Inference_Core_InpaintPreprocessor`
- Category: `ControlNet Preprocessors/others`
- Output node: `False`

The Inpaint Preprocessor node is designed for image preprocessing in inpainting tasks, where it prepares images by applying masks to indicate areas for inpainting, effectively setting masked pixels to a specific value for further processing.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image to be preprocessed for inpainting, serving as the primary data for mask application.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - The 'mask' parameter specifies the areas of the input image to be inpainted, indicating which pixels should be considered for modification.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a preprocessed image with specified areas masked for inpainting, ready for further processing steps.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


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
