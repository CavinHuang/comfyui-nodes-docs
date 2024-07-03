
# Documentation
- Class name: SeamlessClone
- Category: Bmad/CV/C.Photography
- Output node: False

SeamlessClone节点旨在通过使用遮罩来定义混合区域并使用各种克隆模式来控制混合行为，从而将两个图像无缝地混合在一起。它允许使用复杂的图像合成技术，如普通克隆、混合克隆和单色传输。

# Input types
## Required
- dst
    - 目标图像，源图像将被克隆到该图像上。它作为操作的背景。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- src
    - 要克隆到目标图像上的源图像。这个图像将根据遮罩和克隆模式被混合到目标图像中。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- src_mask
    - 定义要克隆的源图像区域的遮罩图像。只有被遮罩覆盖的源图像部分会被克隆。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- flag
    - 指定要用于操作的克隆模式，如普通、混合或单色传输。这会影响源图像如何被混合到目标图像中。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- cx
    - 克隆目标点中心的x坐标。它影响克隆区域的定位。
    - Comfy dtype: INT
    - Python dtype: int
- cy
    - 克隆目标点中心的y坐标。它影响克隆区域的定位。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 无缝克隆操作的结果，是一个根据指定的遮罩和模式将源区域混合到目标中的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SeamlessClone:
    clone_modes_map = {
        "NORMAL": cv.NORMAL_CLONE,
        "MIXED": cv.MIXED_CLONE,
        "MONO": cv.MONOCHROME_TRANSFER
    }
    clone_modes = list(clone_modes_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "dst": ("IMAGE",),
                "src": ("IMAGE",),
                "src_mask": ("IMAGE",),
                "flag": (s.clone_modes, {"default": s.clone_modes[0]}),
                "cx": ("INT", {"default": 0, "min": -999999, "step": 1}),
                "cy": ("INT", {"default": 0, "min": -999999, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "paste"
    CATEGORY = "Bmad/CV/C.Photography"

    def paste(self, src, dst, src_mask, flag, cx, cy):
        src = tensor2opencv(src)
        dst = tensor2opencv(dst)
        src_mask = tensor2opencv(src_mask, 1)

        result = cv.seamlessClone(src, dst, src_mask, (cx, cy), self.clone_modes_map[flag])
        result = opencv2tensor(result)

        return (result,)

```
