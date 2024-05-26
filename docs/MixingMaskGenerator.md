# Documentation
- Class name: MixingMaskGeneratorNode
- Category: mask/generation
- Output node: False
- Repo Ref: https://github.com/ttulttul/ComfyUI-Iterative-Mixer

该节点旨在为迭代混合过程生成噪声掩码，提供了一种灵活的机制，用于创建可以提高混合质量和结果的各种类型的掩码。

# Input types
## Required
- mask_type
    - 掩码类型参数决定了要生成的噪声掩码的类型，如Perlin或random。它从根本上影响了输出掩码的性质及其在不同混合场景中的适用性。
    - Comfy dtype: COMBO[perlin,random]
    - Python dtype: str
- seed
    - 种子参数确保了噪声生成过程的可重复性。它对于在不同运行中获得一致的结果至关重要，这对于实验和测试目的尤其重要。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 宽度参数定义了噪声掩码的水平维度。它影响了掩码的空间分辨率，从而影响了其在混合输出中捕捉细节的能力。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 与宽度参数类似，高度参数定义了噪声掩码的垂直维度，影响其空间分辨率和它能表示的细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 批次大小参数决定了一次操作中生成的噪声掩码的数量。它对处理效率很重要，并可以影响流水线中节点的吞吐量。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- perlin_scale
    - 在生成Perlin噪声掩码时，此参数调整噪声的规模，这会影响掩码的细节水平和整体外观。它对于调整掩码以适应特定的混合要求至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- masks
    - 输出掩码对迭代混合过程至关重要，作为混合和组合不同元素的媒介。它们在决定混合的最终结果中起着关键作用。
    - Comfy dtype: TENSOR
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class MixingMaskGeneratorNode:
    """
    A node that can generate different kinds of noise mask batches for
    iterative mixing purposes.
    """
    MASK_TYPES = ['perlin', 'random']
    MAX_RESOLUTION = 8192

    def __init__(self):
        self.device = comfy.model_management.intermediate_device()

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask_type': (s.MASK_TYPES, {'default': 'perlin'}), 'perlin_scale': ('FLOAT', {'default': 10.0, 'min': 0.1, 'max': 400.0, 'step': 0.01}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'width': ('INT', {'default': 512, 'min': 16, 'max': s.MAX_RESOLUTION, 'step': 8}), 'height': ('INT', {'default': 512, 'min': 16, 'max': s.MAX_RESOLUTION, 'step': 8}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 4096})}}
    RETURN_TYPES = ('MASK',)
    CATEGORY = 'mask/generation'
    FUNCTION = 'get_masks'

    def get_masks(self, mask_type, perlin_scale, seed, width, height, batch_size):
        mask_height = height // 8
        mask_width = width // 8
        if mask_type == 'perlin':
            perlin_tensors = perlin_masks(batch_size, mask_width, mask_height, device=self.device, seed=seed, scale=perlin_scale)
            masks = perlin_tensors.view(batch_size, 1, mask_height, mask_width)
        elif mask_type == 'random':
            masks = torch.randn([batch_size, width // 8, height // 8])
        else:
            raise ValueError('invalid mask_type')
        return (masks,)
```