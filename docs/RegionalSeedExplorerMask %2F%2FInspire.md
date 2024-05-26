# Documentation
- Class name: RegionalSeedExplorerMask
- Category: InspirePack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

RegionalSeedExplorerMask节点旨在通过基于指定的种子提示和附加参数引入噪声场的变化来增强创作过程。它通过操作噪声生成多样化的视觉元素，这些元素可用于各种艺术和设计应用中。

# Input types
## Required
- mask
    - 掩码参数至关重要，因为它定义了噪声场中将受到种子探索过程影响的区域。它作为节点的指南，用于理解在哪里应用变化。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- noise
    - 噪声参数是节点将要操作的基础噪声场。它对于生成变化的输出至关重要，因为它构成了应用种子探索的基础。
    - Comfy dtype: NOISE
    - Python dtype: torch.Tensor
- seed_prompt
    - 种子提示是一个包含变化种子的字符串。它是一个关键的输入，因为它直接影响将引入噪声场的变化类型。
    - Comfy dtype: STRING
    - Python dtype: str
- enable_additional
    - 此参数控制是否使用额外的种子提示。它很重要，因为它决定了应用于噪声场的变化的复杂性和多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- noise_mode
    - 噪声模式参数决定了用于处理噪声的计算设备。它对于确定变化应用的度和效率很重要。
    - Comfy dtype: COMBO[GPU(=A1111), CPU]
    - Python dtype: str
## Optional
- additional_seed
    - 附加种子参数在使用时，提供了对变化过程的额外控制级别。它允许根据提供的种子引入更具体的变化。
    - Comfy dtype: INT
    - Python dtype: int
- additional_strength
    - 附加强度参数调整附加变化的强度。它很重要，因为它允许对噪声场上的变化效果进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- noise
    - 输出噪声是种子探索过程的结果。它代表了应用了变化的噪声场，可以进一步用于下游应用。
    - Comfy dtype: NOISE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class RegionalSeedExplorerMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'noise': ('NOISE',), 'seed_prompt': ('STRING', {'multiline': True, 'dynamicPrompts': False, 'pysssss.autocomplete': False}), 'enable_additional': ('BOOLEAN', {'default': True, 'label_on': 'true', 'label_off': 'false'}), 'additional_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'additional_strength': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'noise_mode': (['GPU(=A1111)', 'CPU'],)}}
    RETURN_TYPES = ('NOISE',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Regional'

    def doit(self, mask, noise, seed_prompt, enable_additional, additional_seed, additional_strength, noise_mode):
        device = comfy.model_management.get_torch_device()
        noise_device = 'cpu' if noise_mode == 'CPU' else device
        noise = noise.to(device)
        mask = mask.to(device)
        if len(mask.shape) == 2:
            mask = mask.unsqueeze(0)
        mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(noise.shape[2], noise.shape[3]), mode='bilinear').squeeze(0)
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
        noise = noise.cpu()
        mask.cpu()
        return (noise,)
```