
# Documentation
- Class name: SeamlessClone (simple)
- Category: Bmad/CV/C.Photography
- Output node: False

SeamlessClone节点提供了一个全面的接口，用于在图像上执行无缝克隆操作。它支持多种克隆模式，并允许精确控制克隆过程，包括指定源掩码克隆中心的能力。该节点旨在通过将源图像无缝地整合到目标图像中来促进复杂的图像混合任务。

# Input types
## Required
- dst
    - 目标图像，源图像将被克隆到这个图像上。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- src
    - 将被克隆到目标图像上的源图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- src_mask
    - 掩码图像，指示要克隆的源图像区域。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- flag
    - 指定要使用的克隆模式，从预定义的模式集中选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 无缝克隆操作后的结果图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SeamlessCloneSimpler:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "dst": ("IMAGE",),
                "src": ("IMAGE",),
                "src_mask": ("IMAGE",),
                "flag": (SeamlessClone.clone_modes, {"default": SeamlessClone.clone_modes[0]}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "paste"
    CATEGORY = "Bmad/CV/C.Photography"

    @staticmethod
    def get_center(cv_mask):
        br = cv.boundingRect(cv_mask)
        return br[0] + br[2] // 2, br[1] + br[3] // 2

    def paste(self, src, dst, src_mask, flag):
        src_mask_cv = tensor2opencv(src_mask, 1)
        cx, cy = SeamlessCloneSimpler.get_center(src_mask_cv)
        sc = SeamlessClone()
        return sc.paste(src, dst, src_mask, flag, cx, cy)

```
