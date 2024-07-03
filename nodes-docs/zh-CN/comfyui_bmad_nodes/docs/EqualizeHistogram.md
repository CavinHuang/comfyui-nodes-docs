
# Documentation
- Class name: EqualizeHistogram
- Category: Bmad/CV/Thresholding
- Output node: False

EqualizeHistogram节点通过重新分配图像的强度级别来对图像应用直方图均衡化，从而增强图像的对比度。

# Input types
## Required
- src
    - 需要处理的源图像。直方图均衡化将被应用于此图像以增强其对比度。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 经过直方图均衡化处理后的图像，具有增强的对比度。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class EqualizeHistogram:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "src": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "eq"
    CATEGORY = "Bmad/CV/Thresholding"

    def eq(self, src):
        src = tensor2opencv(src, 1)
        eq = cv.equalizeHist(src)
        eq = cv.cvtColor(eq, cv.COLOR_GRAY2RGB)
        eq = opencv2tensor(eq)
        return (eq,)

```
