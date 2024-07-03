
# Documentation
- Class name: Inpaint
- Category: Bmad/CV/C.Photography
- Output node: False

Inpaint节点旨在通过利用特定的修复技术来重建图像中缺失或受损的部分。它使用蒙版来识别需要修复的区域，并应用选定的算法来无缝填充这些区域，从而提高整体图像质量。

# Input types
## Required
- img
    - img参数代表需要进行修复的图像。它至关重要，因为它提供了进行修复操作的视觉数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - mask参数指定了图像中需要修复的区域。它在引导修复过程集中于目标区域方面起着关键作用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- radius
    - radius参数决定了修复时每个点周围的邻域大小，影响修复效果的平滑度和范围。
    - Comfy dtype: INT
    - Python dtype: int
- flag
    - flag参数允许选择要使用的修复算法，提供了灵活性，可以选择最适合图像特定需求的方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输出是经过修复的图像，其中指定的区域已使用选定的修复技术进行了重建。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Inpaint:
    inpaint_method_map = {
        "TELEA": cv.INPAINT_TELEA,
        "NS": cv.INPAINT_NS,
    }
    inpaint_methods = list(inpaint_method_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "img": ("IMAGE",),
                "mask": ("IMAGE",),
                "radius": ("INT", {"default": 3, "min": 0, "step": 1}),
                "flag": (s.inpaint_methods, {"default": s.inpaint_methods[0]}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "paint"
    CATEGORY = "Bmad/CV/C.Photography"

    def paint(self, img, mask, radius, flag):
        img = tensor2opencv(img)
        mask = tensor2opencv(mask, 1)
        dst = cv.inpaint(img, mask, radius, self.inpaint_method_map[flag])
        result = opencv2tensor(dst)
        return (result,)

```
