# Documentation
- Class name: CenterImage
- Category: ♾️Mixlab/Layer
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

CenterImage节点旨在将图像处理并居中放置在给定的画布内，重点关注指定的区域。它通过计算所需的坐标和尺寸来实现这一点，同时考虑所提供的边距。该节点的功能不仅限于简单的放置；它还生成一个与居中区域相对应的掩码，增强了其在各种图像处理任务中的适用性。

# Input types
## Required
- canvas
    - 画布参数是必需的，因为它代表了将执行居中操作的基础图像。它是节点执行的基础，直接影响输出的网格和掩码。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- left
    - left参数指定了居中操作的左边距。它对于确定图像在画布中的确切位置至关重要，并有助于最终居中的外观。
    - Comfy dtype: INT
    - Python dtype: int
- top
    - top参数定义了居中过程中的上边距。它在图像的垂直放置中起着重要作用，并影响整体的居中布局。
    - Comfy dtype: INT
    - Python dtype: int
- right
    - right参数设置了画布内图像的右边距。它是水平定位的重要因素，并有助于精确地构建居中图像的框架。
    - Comfy dtype: INT
    - Python dtype: int
- bottom
    - bottom参数指示了图像居中所需的下边距。它对于垂直对齐至关重要，并确保图像正确地包含在画布边界内。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- grid
    - 网格输出提供了画布内居中图像的坐标和尺寸。这些信息对于进一步的图像处理或操作任务至关重要。
    - Comfy dtype: _GRID
    - Python dtype: Tuple[int, int, int, int]
- mask
    - 掩码输出是一个二进制图像，它描绘了居中图像的区域。它在图像处理工作流程中的掩蔽、过滤或分割等应用中非常重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CenterImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'canvas': ('IMAGE',), 'left': ('INT', {'default': 24, 'min': 0, 'max': 5000, 'step': 1, 'display': 'number'}), 'top': ('INT', {'default': 24, 'min': 0, 'max': 5000, 'step': 1, 'display': 'number'}), 'right': ('INT', {'default': 24, 'min': 0, 'max': 5000, 'step': 1, 'display': 'number'}), 'bottom': ('INT', {'default': 24, 'min': 0, 'max': 5000, 'step': 1, 'display': 'number'})}}
    RETURN_TYPES = ('_GRID', 'MASK')
    RETURN_NAMES = ('grid', 'mask')
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Layer'
    INPUT_IS_LIST = False

    def run(self, canvas, left, top, right, bottom):
        canvas = tensor2pil(canvas)
        grid = centerImage((left, top, right, bottom), canvas)
        mask = createMask(canvas, left, top, canvas.width - left - right, canvas.height - top - bottom)
        return (grid, pil2tensor(mask))
```