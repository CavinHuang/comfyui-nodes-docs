
# Documentation
- Class name: ImageGenResolutionFromLatent
- Category: ControlNet Preprocessors
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageGenResolutionFromLatent节点的设计目的是根据给定潜在表示的尺寸计算图像生成分辨率。它从潜在表示的形状中提取高度和宽度，并对其进行缩放以确定适合图像生成的分辨率。这个过程对于确保生成的图像具有与输入潜在表示相匹配的适当尺寸至关重要，从而在保持图像质量的同时优化计算资源的使用。

# Input types
## Required
- latent
    - latent参数是ImageGenResolutionFromLatent节点的核心输入。它是一个包含潜在表示的字典，其中的张量形状用于计算所需的输出尺寸。这个潜在表示的结构直接决定了生成图像的最终分辨率，因此对节点的功能起着关键作用。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- IMAGE_GEN_WIDTH (INT)
    - 输出的IMAGE_GEN_WIDTH参数表示根据潜在表示尺寸计算得出的图像生成宽度。这个整数值经过适当缩放，以确保生成的图像具有合适的宽度，与输入的潜在表示保持一致性。
    - Comfy dtype: INT
    - Python dtype: int
- IMAGE_GEN_HEIGHT (INT)
    - 输出的IMAGE_GEN_HEIGHT参数表示根据潜在表示尺寸计算得出的图像生成高度。这个整数值也经过适当缩放，以确保生成的图像具有合适的高度，与输入的潜在表示保持一致性。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ImageScale](../../Comfy/Nodes/ImageScale.md)



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
