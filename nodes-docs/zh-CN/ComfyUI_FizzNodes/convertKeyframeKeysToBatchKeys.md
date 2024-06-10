# Documentation
- Class name: convertKeyframeKeysToBatchKeys
- Category: FizzNodes 📅🅕🅝/HelperNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

在'convertKeyframeKeysToBatchKeys'节点中的'concat'方法旨在将关键帧数据高效地组合成单个批次进行处理。它通过将输入的关键帧数量乘以潜在维度的数量来实现这一点，从而创建一个适合批量操作的连续序列。此方法对于优化大规模动画或模拟中关键帧数据的处理至关重要。

# Input types
## Required
- input
    - 'input'参数代表要处理的关键帧数量。它是节点操作的基本部分，因为它直接影响创建的批次大小，进而影响后续处理步骤的效率。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- num_latents
    - 'num_latents'参数指定要考虑的关键帧数据中的潜在维度数量。它对于确定批次的最终结构至关重要，确保数据适当地组织以适应下游任务。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result
    - 'result'输出提供了计算出的批次关键序列，这是输入关键帧计数和潜在维度数量的乘积。这个输出很重要，因为它构成了动画或模拟流水线中进一步处理和分析的基础。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class convertKeyframeKeysToBatchKeys:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'input': ('INT', {'forceInput': True, 'default': 0}), 'num_latents': ('INT', {'default': 16})}}
    RETURN_TYPES = ('INT',)
    FUNCTION = 'concat'
    CATEGORY = 'FizzNodes 📅🅕🅝/HelperNodes'

    def concat(self, input, num_latents):
        c = input * num_latents - 1
        return (c,)
```