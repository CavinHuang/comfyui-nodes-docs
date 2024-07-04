
# Documentation
- Class name: CLAHE
- Category: Bmad/CV/Thresholding
- Output node: False

CLAHE节点应用对比度受限自适应直方图均衡算法来增强图像对比度。它通过局部调整图像强度来增强对比度，同时考虑了诸如裁剪限制和网格大小等特定参数，以实现对处理过程更精细的控制。

# Input types
## Required
- src
    - 待处理的源图像。它作为输入，CLAHE算法将在其上应用以增强局部对比度。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- clip_limit
    - 定义对比度限制的阈值。该参数有助于控制对比度增强程度，防止在图像相对均匀的区域过度放大噪声。
    - Comfy dtype: INT
    - Python dtype: int
- tile_grid_x
    - 指定图像在水平方向上的分块数量。它决定了对比度增强过程的细粒度。
    - Comfy dtype: INT
    - Python dtype: int
- tile_grid_y
    - 指定图像在垂直方向上的分块数量。与tile_grid_x类似，它影响对比度增强的细粒度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 应用CLAHE后的输出图像。它是输入图像的增强版本，具有改善的局部对比度。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CLAHE:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "src": ("IMAGE",),
                "clip_limit": ("INT", {"default": 2, "step": 1}),
                # 40 is the default in documentation, but prob. a bit high no?
                "tile_grid_x": ("INT", {"default": 8, "min": 2, "step": 1}),
                "tile_grid_y": ("INT", {"default": 8, "min": 2, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "eq"
    CATEGORY = "Bmad/CV/Thresholding"

    def eq(self, src, clip_limit, tile_grid_x, tile_grid_y):
        src = tensor2opencv(src, 1)
        clahe = cv.createCLAHE(clipLimit=clip_limit, tileGridSize=(tile_grid_x, tile_grid_y))
        eq = clahe.apply(src)
        eq = cv.cvtColor(eq, cv.COLOR_GRAY2RGB)
        eq = opencv2tensor(eq)
        return (eq,)

```
