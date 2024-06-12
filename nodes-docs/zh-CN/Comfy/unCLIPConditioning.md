# Documentation
- Class name: unCLIPConditioning
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

unCLIPConditioning节点旨在修改和增强模型的调节输入，允许对生成过程进行更细致的控制。通过向调节输入添加额外的参数来实现，这些参数可以包括像强度和噪声增强这样的因素，以改善输出结果。

# Input types
## Required
- conditioning
    - 调节参数至关重要，因为它定义了将用于指导模型输出的基础输入。它是一组在确定生成内容的特征和属性中起着决定性作用的元素。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, dict]]
- clip_vision_output
    - 该参数作为调节过程的基础，为模型提供了期望输出的参考。它对塑造最终结果并确保其与预期方向一致起着至关重要的作用。
    - Comfy dtype: CLIP_VISION_OUTPUT
    - Python dtype: Dict[str, Any]
- strength
    - 强度参数作为调节输入的修饰符，允许微调模型的输出，以达到期望的细节或强度水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_augmentation
    - 该参数在调节过程中引入了一定程度的随机性，这可以导致更多样化和创造性的输出。对于增加生成多样性来说，这是一个重要的方面。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- conditioning
    - 输出调节表示根据提供的参数调整后的增强和修改的输入。这套经过优化的输入最终将指导模型的生成。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, dict]]

# Usage tips
- Infra type: CPU

# Source code
```
class unCLIPConditioning:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning': ('CONDITIONING',), 'clip_vision_output': ('CLIP_VISION_OUTPUT',), 'strength': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'noise_augmentation': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'apply_adm'
    CATEGORY = 'conditioning'

    def apply_adm(self, conditioning, clip_vision_output, strength, noise_augmentation):
        if strength == 0:
            return (conditioning,)
        c = []
        for t in conditioning:
            o = t[1].copy()
            x = {'clip_vision_output': clip_vision_output, 'strength': strength, 'noise_augmentation': noise_augmentation}
            if 'unclip_conditioning' in o:
                o['unclip_conditioning'] = o['unclip_conditioning'][:] + [x]
            else:
                o['unclip_conditioning'] = [x]
            n = [t[0], o]
            c.append(n)
        return (c,)
```