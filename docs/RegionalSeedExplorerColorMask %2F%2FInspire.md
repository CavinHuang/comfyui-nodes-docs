# Documentation
- Class name: RegionalSeedExplorerColorMask
- Category: InspirePack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点基于颜色掩码和种子提示探索图像区域，能够在指定区域生成变化，控制噪声并增强特定特征。

# Input types
## Required
- color_mask
    - 颜色掩码至关重要，它定义了图像中将要进行变化和噪声探索的区域。它是节点操作的基础。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
- noise
    - 噪声是引入变化的基本输入，它允许产生多样化的结果和更丰富的生成图像集。
    - Comfy dtype: NOISE
    - Python dtype: torch.Tensor
- seed_prompt
    - 种子提示在指导变化过程中起着重要作用，为节点提供特定方向，以在图像中生成目标变化。
    - Comfy dtype: STRING
    - Python dtype: str
- enable_additional
    - 该参数决定了是否应用额外的种子提示，从而影响图像变化的复杂性和多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- noise_mode
    - 噪声模式决定了用于处理噪声的计算资源，GPU为模型密集型任务提供更快的计算，而CPU更适合不那么复杂的操作。
    - Comfy dtype: COMBO[GPU(=A1111), CPU]
    - Python dtype: str
## Optional
- mask_color
    - 掩码颜色参数对于识别颜色掩码中将用于创建二进制掩码以进行区域选择的特定颜色至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- additional_seed
    - 启用时，额外的种子为变化过程提供了另一层控制，允许进一步定制生成的内容。
    - Comfy dtype: INT
    - Python dtype: int
- additional_strength
    - 该参数调整额外种子的影响，允许用户微调应用于图像的变化的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- noise
    - 输出噪声代表了经过处理的带有应用变化的噪声，这是生成多样化图像结果的关键组成部分。
    - Comfy dtype: NOISE
    - Python dtype: torch.Tensor
- mask
    - 掩码输出是选定区域的二进制表示，这对于隔离和应用图像的特定更改至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class RegionalSeedExplorerColorMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'color_mask': ('IMAGE',), 'mask_color': ('STRING', {'multiline': False, 'default': '#FFFFFF'}), 'noise': ('NOISE',), 'seed_prompt': ('STRING', {'multiline': True, 'dynamicPrompts': False, 'pysssss.autocomplete': False}), 'enable_additional': ('BOOLEAN', {'default': True, 'label_on': 'true', 'label_off': 'false'}), 'additional_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'additional_strength': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'noise_mode': (['GPU(=A1111)', 'CPU'],)}}
    RETURN_TYPES = ('NOISE', 'MASK')
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Regional'

    def doit(self, color_mask, mask_color, noise, seed_prompt, enable_additional, additional_seed, additional_strength, noise_mode):
        device = comfy.model_management.get_torch_device()
        noise_device = 'cpu' if noise_mode == 'CPU' else device
        color_mask = color_mask.to(device)
        noise = noise.to(device)
        mask = color_to_mask(color_mask, mask_color)
        original_mask = mask
        mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(noise.shape[2], noise.shape[3]), mode='bilinear').squeeze(0)
        mask = mask.to(device)
        try:
            seed_prompt = seed_prompt.replace('\n', '')
            items = seed_prompt.strip().split(',')
            if items == ['']:
                items = []
            if enable_additional:
                items.append((additional_seed, additional_strength))
            noise = prompt_support.SeedExplorer.apply_variation(noise, items, noise_device, mask)
        except Exception:
            print(f'[ERROR] IGNORED: RegionalSeedExplorerColorMask is failed.')
            traceback.print_exc()
        color_mask.cpu()
        noise = noise.cpu()
        original_mask = original_mask.cpu()
        return (noise, original_mask)
```