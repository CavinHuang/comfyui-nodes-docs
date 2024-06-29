# Documentation
- Class name: MakeCircularVAE
- Category: latent
- Output node: False
- Repo Ref: https://github.com/spinagon/ComfyUI-seamless-tiling

MakeCircularVAE节点的`run`方法旨在修改变分自编码器（VAE）模型，以实现对卷积层的循环填充。这种调整允许模型处理具有周期性边界条件的数据，这对于具有固有循环对称性的数据特别有用。节点可以基于提供的平铺配置，将循环填充应用于x和y两个维度，或者选择性地应用于其中一个维度。

# Input types
## Required
- vae
    - 'vae'参数是要被修改的变分自编码器模型。它是节点操作的核心组件，因为它决定了将接受循环填充转换的模型。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- tiling
    - 'tiling'参数决定如何将循环填充应用于VAE模型的卷积层。它控制是否将填充应用于两个维度，或者只应用于一个维度，对于模型处理周期性数据的能力至关重要。
    - Comfy dtype: COMBO['enable', 'x_only', 'y_only', 'disable']
    - Python dtype: str
- copy_vae
    - 'copy_vae'参数决定是直接修改原始VAE模型还是首先创建模型的副本。这个选择可以影响内存使用和对模型所做的更改的范围。
    - Comfy dtype: COMBO['Make a copy', 'Modify in place']
    - Python dtype: str

# Output types
- VAE
    - 节点的输出是已修改或复制的变分自编码器模型，其卷积层已应用循环填充，增强了其处理具有循环对称性数据的能力。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class MakeCircularVAE:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'vae': ('VAE',), 'tiling': (['enable', 'x_only', 'y_only', 'disable'],), 'copy_vae': (['Make a copy', 'Modify in place'],)}}
    RETURN_TYPES = ('VAE',)
    FUNCTION = 'run'
    CATEGORY = 'latent'

    def run(self, vae, tiling, copy_vae):
        if copy_vae == 'Modify in place':
            vae_copy = vae
        else:
            vae_copy = copy.deepcopy(vae)
        if tiling == 'enable':
            make_circular_asymm(vae_copy.first_stage_model, True, True)
        elif tiling == 'x_only':
            make_circular_asymm(vae_copy.first_stage_model, True, False)
        elif tiling == 'y_only':
            make_circular_asymm(vae_copy.first_stage_model, False, True)
        else:
            make_circular_asymm(vae_copy.first_stage_model, False, False)
        return (vae_copy,)
```