---
tags:
- ImageResolution
- ImageTransformation
---

# [Inference.Core] Generation Resolution From Image
## Documentation
- Class name: `Inference_Core_ImageGenResolutionFromImage`
- Category: `ControlNet Preprocessors`
- Output node: `False`

This node is designed to calculate the generation resolution directly from an input image. It extracts the width and height of the input image and returns these dimensions as the intended resolution for image generation, facilitating the adjustment of output image size based on the input image's dimensions.
## Input types
### Required
- **`image`**
    - The input image for which the generation resolution is to be calculated. This image's dimensions are used to determine the output resolution, directly influencing the size of the generated image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
## Output types
- **`IMAGE_GEN_WIDTH (INT)`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
- **`IMAGE_GEN_HEIGHT (INT)`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageGenResolutionFromImage:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": { "image": ("IMAGE", ) }
        }
    
    RETURN_TYPES = ("INT", "INT")
    RETURN_NAMES = ("IMAGE_GEN_WIDTH (INT)", "IMAGE_GEN_HEIGHT (INT)")
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors"

    def execute(self, image):
        _, H, W, _ = image.shape
        return (W, H)

```
