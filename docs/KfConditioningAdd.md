# Documentation
- Class name: KfConditioningAdd
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点用于将两个调节输入相加以产生一个综合的调节输出。它强调数据的整合以增强整体调节影响，同时不改变各自的数据结构。

# Input types
## Required
- conditioning_1
    - 第一个调节输入对于节点的操作至关重要，提供了将与第二个输入结合的初始数据集。它为整合过程奠定了基础。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[torch.Tensor, Dict[str, Any]]
- conditioning_2
    - 第二个调节输入补充了第一个输入，允许将另一个数据集添加到混合中。这对于实现全面的调节结果至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[torch.Tensor, Dict[str, Any]]

# Output types
- CONDITIONING
    - 输出是两个输入相加后的综合调节集。它代表了可以进一步在过程中利用的增强调节影响。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, Any]]]

# Usage tips
- Infra type: CPU

# Source code
```
class KfConditioningAdd:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('CONDITIONING',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning_1': ('CONDITIONING',), 'conditioning_2': ('CONDITIONING',)}}

    def main(self, conditioning_1, conditioning_2):
        conditioning_1 = deepcopy(conditioning_1)
        conditioning_2 = deepcopy(conditioning_2)
        assert len(conditioning_1) == len(conditioning_2)
        outv = []
        for (i, ((c1_tensor, c1_dict), (c2_tensor, c2_dict))) in enumerate(zip(conditioning_1, conditioning_2)):
            c1_tensor += c2_tensor
            if 'pooled_output' in c1_dict and 'pooled_output' in c2_dict:
                c1_dict['pooled_output'] += c2_dict['pooled_output']
            outv.append((c1_tensor, c1_dict))
        return (outv,)
```