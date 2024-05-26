# Documentation
- Class name: SplitImage
- Category: ♾️Mixlab/Layer
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

SplitImage节点旨在将输入的图像分割成较小的图像网格，并生成相应的掩码。它通过启用创建分段输出的功能，增强了图像处理工作流程，这些输出可用于各种应用，如图像编辑、特征提取和数据增强。

# Input types
## Required
- image
    - 图像参数至关重要，因为它是节点操作的主要输入。它决定了生成的分割图像和掩码的质量与分辨率。图像的特征直接影响节点在分割和掩码制作方面的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- num
    - num参数决定了图像将被分割成多少个段。它非常重要，因为它影响着分割图像的粒度和掩码的细节层次。较高的值将导致更多的段，这对于详细分析或处理可能是有益的。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- seed
    - seed参数用于控制网格坐标的随机性。它对于确保图像分割过程中的可重复性非常重要，特别是当节点用于需要一致结果的较大工作流程中时。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- grids
    - grids输出是从原始输入中派生的分割图像的集合。它代表了节点操作的主要结果，展示了图像分割的有效性。
    - Comfy dtype: _GRID
    - Python dtype: List[Tuple[int, int, int, int]]
- grid
    - grid输出是基于seed参数选择的单个分割图像。它很重要，因为它提供了一个特定段的详细视图，可用于专注分析或进一步处理。
    - Comfy dtype: _GRID
    - Python dtype: Tuple[int, int, int, int]
- mask
    - mask输出是一个二值图像，对应于选定的grid。它对于隔离和突出显示图像的特定区域以进行进一步分析或操作至关重要。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class SplitImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'num': ('INT', {'default': 4, 'min': 1, 'max': 500, 'step': 1, 'display': 'number'}), 'seed': ('INT', {'default': 4, 'min': 1, 'max': 500, 'step': 1, 'display': 'number'})}}
    RETURN_TYPES = ('_GRID', '_GRID', 'MASK')
    RETURN_NAMES = ('grids', 'grid', 'mask')
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Layer'
    INPUT_IS_LIST = False

    def run(self, image, num, seed):
        image = tensor2pil(image)
        grids = splitImage(image, num)
        if seed > num:
            num = int(seed / 500 * num) - 1
        else:
            num = seed - 1
        num = max(0, num)
        g = grids[num]
        (x, y, w, h) = g
        mask = createMask(image, x, y, w, h)
        mask = pil2tensor(mask)
        return (grids, g, mask)
```