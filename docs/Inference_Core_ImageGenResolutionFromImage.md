
# Documentation
- Class name: Inference_Core_ImageGenResolutionFromImage
- Category: ControlNet Preprocessors
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

此节点旨在直接从输入图像计算生成分辨率。它提取输入图像的宽度和高度，并将这些尺寸作为预期的图像生成分辨率返回，从而便于根据输入图像的尺寸调整输出图像的大小。

# Input types
## Required
- image
    - 需要计算生成分辨率的输入图像。使用该图像的尺寸来确定输出分辨率，直接影响生成图像的大小。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray

# Output types
- IMAGE_GEN_WIDTH (INT)
    - 从输入图像提取的宽度值，用于设置生成图像的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- IMAGE_GEN_HEIGHT (INT)
    - 从输入图像提取的高度值，用于设置生成图像的高度。
    - Comfy dtype: INT
    - Python dtype: int


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
