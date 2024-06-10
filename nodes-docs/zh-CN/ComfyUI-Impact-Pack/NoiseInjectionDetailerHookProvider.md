# Documentation
- Class name: NoiseInjectionDetailerHookProvider
- Category: ImpactPack/Detailer
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

NoiseInjectionDetailerHookProvider 节点旨在通过在图像生成周期的特定阶段策略性地注入噪声来增强图像生成过程的细节。它利用噪声的力量增加可变性并微调输出，确保更细致和详细的结果。对于生成图像的保真度至关重要的应用，如创建复杂的纹理或图案，此节点至关重要。

# Input types
## Required
- schedule_for_cycle
    - schedule_for_cycle 参数确定噪声注入在生成周期内的时机。它对于控制引入噪声的阶段至关重要，允许精确操纵图像的细节水平。此参数对于在最终输出中实现噪声和清晰度之间的理想平衡至关重要。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- source
    - source 参数决定噪声生成将在 CPU 还是 GPU 上进行。这个选择可以显著影响噪声注入过程的性能和效率，使其成为优化节点操作的关键考虑因素。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- seed
    - seed 参数初始化随机数生成器，确保噪声的一致性和可复现性。它在保持噪声注入的可预测性方面发挥着重要作用，这对于在节点的不同运行中创建可靠和一致的输出非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- start_strength
    - start_strength 参数设置在生成周期开始时注入的噪声的初始强度。它是决定噪声对图像整体影响的关键因素，允许对引入的细节水平进行精细控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_strength
    - end_strength 参数定义了生成周期结束时噪声的强度。它允许噪声强度逐渐增加或减少，从而能够创建具有细节和纹理平滑过渡的图像。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- DETAILER_HOOK
    - NoiseInjectionDetailerHookProvider 节点的输出是一个细节钩子，这是一个用于将噪声注入图像生成过程的专用工具。这个钩子非常重要，因为它直接影响生成的图像的最终质量和细节，提供了一种增强输出视觉保真度的手段。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: DetailerHook

# Usage tips
- Infra type: GPU

# Source code
```
class NoiseInjectionDetailerHookProvider:
    schedules = ['skip_start', 'from_start']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'schedule_for_cycle': (s.schedules,), 'source': (['CPU', 'GPU'],), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'start_strength': ('FLOAT', {'default': 2.0, 'min': 0.0, 'max': 200.0, 'step': 0.01}), 'end_strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 200.0, 'step': 0.01})}}
    RETURN_TYPES = ('DETAILER_HOOK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detailer'

    def doit(self, schedule_for_cycle, source, seed, start_strength, end_strength):
        try:
            hook = hooks.InjectNoiseHookForDetailer(source, seed, start_strength, end_strength, from_start='from_start' in schedule_for_cycle)
            return (hook,)
        except Exception as e:
            print("[ERROR] NoiseInjectionDetailerHookProvider: 'ComfyUI Noise' custom node isn't installed. You must install 'BlenderNeko/ComfyUI Noise' extension to use this node.")
            print(f'\t{e}')
            pass
```