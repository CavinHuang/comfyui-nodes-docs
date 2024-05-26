# Documentation
- Class name: NoiseInjectionHookProvider
- Category: ImpactPack/Upscale
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

NoiseInjectionHookProvider 节点旨在将噪声注入图像生成过程，允许创建变化或对图像进行“反采样”。它提供了一个简单的时间表来控制噪声注入过程，并且能够处理 CPU 和 GPU 源。此节点对于需要精细控制噪声的工作流程至关重要，例如生成微妙的变化或重建具有特定噪声特性的图像。

# Input types
## Required
- schedule_for_iteration
    - schedule_for_iteration 参数确定噪声注入时间表，这对于在迭代中一致地应用噪声至关重要。它是节点生成变化或“反采样”图像能力的关键因素。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- source
    - source 参数指定噪声生成应使用 CPU 还是 GPU。这个选择可以显著影响噪声注入过程的性能和效率。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- seed
    - seed 参数初始化噪声生成过程，确保噪声模式是可复现的。它在保持节点不同运行之间的一致性中起着至关重要的作用。
    - Comfy dtype: INT
    - Python dtype: int
- start_strength
    - start_strength 参数设置要注入的噪声的初始强度。它是决定将要实现的变化程度或“反采样”的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_strength
    - end_strength 参数定义了注入过程结束时噪声的最终强度。它与 start_strength 配合使用，在过程的整个过程中创建噪声强度的梯度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- hook
    - hook 输出提供了将噪声注入功能集成到更大的图像生成工作流程中的方法。它封装了节点定义的设置和行为，允许在更广泛的流程中无缝应用。
    - Comfy dtype: PK_HOOK
    - Python dtype: PixelKSampleHook

# Usage tips
- Infra type: GPU

# Source code
```
class NoiseInjectionHookProvider:
    schedules = ['simple']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'schedule_for_iteration': (s.schedules,), 'source': (['CPU', 'GPU'],), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'start_strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 200.0, 'step': 0.01}), 'end_strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 200.0, 'step': 0.01})}}
    RETURN_TYPES = ('PK_HOOK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Upscale'

    def doit(self, schedule_for_iteration, source, seed, start_strength, end_strength):
        try:
            hook = None
            if schedule_for_iteration == 'simple':
                hook = hooks.InjectNoiseHook(source, seed, start_strength, end_strength)
            return (hook,)
        except Exception as e:
            print("[ERROR] NoiseInjectionHookProvider: 'ComfyUI Noise' custom node isn't installed. You must install 'BlenderNeko/ComfyUI Noise' extension to use this node.")
            print(f'\t{e}')
            pass
```