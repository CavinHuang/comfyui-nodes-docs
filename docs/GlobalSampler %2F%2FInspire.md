# Documentation
- Class name: GlobalSampler
- Category: InspirePack/Prompt
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

GlobalSampler节点抽象地表示了一个从给定集合中均匀抽样元素的系统，确保每个元素被选中的概率相等。它的设计是为了在过程中引入随机性，以公正无偏的方式，这对于需要随机行为或结果多样性的应用至关重要。

# Input types
## Required
- sampler_name
    - sampler_name参数至关重要，因为它决定了要使用的抽样方法。它通过确定将使用哪种抽样算法直接影响节点的操作，从而塑造结果的多样性和随机性。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- scheduler
    - scheduler参数对于管理抽样过程的执行流程至关重要。它影响节点如何协调抽样的时机和频率，确保有效地引入随机性，而不会影响整个过程。
    - Comfy dtype: COMBO[str]
    - Python dtype: str

# Output types
- sampled_data
    - sampled_data输出包含了抽样过程的结果，代表了被选中的元素。它是关键的输出，因为它直接反映了抽样方法的有效性和实现的随机性质量。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class GlobalSampler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,)}}
    RETURN_TYPES = ()
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Prompt'
    OUTPUT_NODE = True

    def doit(self, **kwargs):
        return {}
```