# Documentation
- Class name: SeedExplorer
- Category: InspirePack/Prompt
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

SeedExplorer是一个旨在根据提供的种子和附加参数操作和生成噪声模式的节点，旨在在噪声生成任务中激发和促进创造性过程。

# Input types
## Required
- latent
    - 潜在变量对于SeedExplorer节点至关重要，因为它为噪声生成提供了基础结构，影响了输出的整体质量和特性。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- seed_prompt
    - 种子提示对于指导噪声生成过程至关重要，允许用户将特定的模式或风格注入到输出中。
    - Comfy dtype: STRING
    - Python dtype: str
- enable_additional
    - enable_additional参数决定是否应用额外的种子变化，这可以为生成的噪声引入多样性和复杂性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- noise_mode
    - noise_mode参数决定了用于噪声生成的计算资源，对于密集型任务推荐使用GPU，对于需求较低的操作使用CPU。
    - Comfy dtype: COMBO
    - Python dtype: str
- initial_batch_seed_mode
    - 该参数控制初始噪声批次的种子模式，可能会影响生成的噪声模式的整体一致性和连贯性。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- additional_seed
    - 额外的种子参数在使用时，为噪声引入了额外的变化层，有助于最终输出的多样性。
    - Comfy dtype: INT
    - Python dtype: int
- additional_strength
    - 额外的强度参数调整了额外种子的影响，允许微调噪声变化的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- noise
    - 输出噪声代表噪声生成程的最终结果，包含了应用的创意输入和参数。
    - Comfy dtype: NOISE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class SeedExplorer:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'latent': ('LATENT',), 'seed_prompt': ('STRING', {'multiline': True, 'dynamicPrompts': False, 'pysssss.autocomplete': False}), 'enable_additional': ('BOOLEAN', {'default': True, 'label_on': 'true', 'label_off': 'false'}), 'additional_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'additional_strength': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'noise_mode': (['GPU(=A1111)', 'CPU'],), 'initial_batch_seed_mode': (['incremental', 'comfy'],)}}
    RETURN_TYPES = ('NOISE',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Prompt'

    @staticmethod
    def apply_variation(start_noise, seed_items, noise_device, mask=None):
        noise = start_noise
        for x in seed_items:
            if isinstance(x, str):
                item = x.split(':')
            else:
                item = x
            if len(item) == 2:
                try:
                    variation_seed = int(item[0])
                    variation_strength = float(item[1])
                    noise = utils.apply_variation_noise(noise, noise_device, variation_seed, variation_strength, mask=mask)
                except Exception:
                    print(f"[ERROR] IGNORED: SeedExplorer failed to processing '{x}'")
                    traceback.print_exc()
        return noise

    def doit(self, latent, seed_prompt, enable_additional, additional_seed, additional_strength, noise_mode, initial_batch_seed_mode):
        latent_image = latent['samples']
        device = comfy.model_management.get_torch_device()
        noise_device = 'cpu' if noise_mode == 'CPU' else device
        seed_prompt = seed_prompt.replace('\n', '')
        items = seed_prompt.strip().split(',')
        if items == ['']:
            items = []
        if enable_additional:
            items.append((additional_seed, additional_strength))
        try:
            hd = items[0]
            tl = items[1:]
            if isinstance(hd, tuple):
                hd_seed = int(hd[0])
            else:
                hd_seed = int(hd)
            noise = utils.prepare_noise(latent_image, hd_seed, None, noise_device, initial_batch_seed_mode)
            noise = noise.to(device)
            noise = SeedExplorer.apply_variation(noise, tl, noise_device)
            noise = noise.cpu()
            return (noise,)
        except Exception:
            print(f'[ERROR] IGNORED: SeedExplorer failed')
            traceback.print_exc()
        noise = torch.zeros(latent_image.size(), dtype=latent_image.dtype, layout=latent_image.layout, device=noise_device)
        return (noise,)
```