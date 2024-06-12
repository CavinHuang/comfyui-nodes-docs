---
tags:
- ImageResolution
- ImageTransformation
---

# Generation Resolution From Image
## Documentation
- Class name: `ImageGenResolutionFromImage`
- Category: `ControlNet Preprocessors`
- Output node: `False`

This node is designed to compute the generation resolution from an input image. It analyzes the dimensions of the provided image and calculates the width and height that should be used for image generation, ensuring the output resolution is directly derived from the input image's size.
## Input types
### Required
- **`image`**
    - The input image for which the generation resolution is to be calculated. This parameter is crucial as it directly influences the output resolution by analyzing the image's dimensions.
    - Comfy dtype: `IMAGE`
    - Python dtype: `np.ndarray`
## Output types
- **`IMAGE_GEN_WIDTH (INT)`**
    - Comfy dtype: `INT`
    - The calculated width for image generation, derived from the input image's dimensions.
    - Python dtype: `int`
- **`IMAGE_GEN_HEIGHT (INT)`**
    - Comfy dtype: `INT`
    - The calculated height for image generation, derived from the input image's dimensions.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)



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
