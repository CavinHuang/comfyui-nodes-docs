
# Documentation
- Class name: Inference_Core_ImageGenResolutionFromLatent
- Category: ControlNet Preprocessors
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

此节点旨在根据潜在空间表示计算图像生成分辨率。它从潜在样本中提取高度和宽度，并对其进行缩放以确定图像生成的最佳分辨率。

# Input types
## Required
- latent
    - 用于推导图像生成分辨率的潜在表示。它通过确定基本维度来影响输出，这些维度将被缩放以计算最终的图像分辨率。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- IMAGE_GEN_WIDTH (INT)
    - 输出的图像生成宽度，以像素为单位。
    - Comfy dtype: INT
    - Python dtype: int
- IMAGE_GEN_HEIGHT (INT)
    - 输出的图像生成高度，以像素为单位。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageGenResolutionFromLatent:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": { "latent": ("LATENT", ) }
        }
    
    RETURN_TYPES = ("INT", "INT")
    RETURN_NAMES = ("IMAGE_GEN_WIDTH (INT)", "IMAGE_GEN_HEIGHT (INT)")
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors"

    def execute(self, latent):
        _, _, H, W = latent["samples"].shape
        return (W * 8, H * 8)

```
