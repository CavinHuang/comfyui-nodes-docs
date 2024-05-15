# Documentation
- Class name: SplitSigmas
- Category: sampling/custom_sampling/sigmas
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SplitSigmas节点旨在将给定的一组sigma值根据指定的步长索引划分为两个不同的子集。此操作对于需要在特定迭代中对sigma值进行划分以进行进一步处理的自定义采样技术至关重要。节点的功能不依赖于特定方法，而是专注于概念上的数据划分，为更复杂的采样工作流程提供基础步骤。

# Input types
## Required
- sigmas
    - 参数'sigmas'代表一组对采样过程至关重要的值。它之所以重要，是因为它决定了采样算法的初始条件，影响生成样本的质量和特性。该参数在节点操作中扮演核心角色，因为它是sigma值划分的主要输入。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
## Optional
- step
    - 参数'step'定义了sigma值被分割的索引。它之所以重要，是因为它决定了sigma值的分割点，从而影响输出的结构。该参数是可选的，提供了在处理sigma值时的一定灵活性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- sigmas1
    - 输出'sigmas1'包含了直到指定步长的第一部分sigma值。它是节点输出的关键组成部分，因为它代表了sigma值的初始部分，可能用于特定的采样技术或进一步分析。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
- sigmas2
    - 输出'sigmas2'包含了指定步长之后剩余的sigma值。这个输出很重要，因为它代表了sigma序列的延续，可以在后续的采样迭代中使用，或用于其他计算目的。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]

# Usage tips
- Infra type: CPU

# Source code
```
class SplitSigmas:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'sigmas': ('SIGMAS',), 'step': ('INT', {'default': 0, 'min': 0, 'max': 10000})}}
    RETURN_TYPES = ('SIGMAS', 'SIGMAS')
    CATEGORY = 'sampling/custom_sampling/sigmas'
    FUNCTION = 'get_sigmas'

    def get_sigmas(self, sigmas, step):
        sigmas1 = sigmas[:step + 1]
        sigmas2 = sigmas[step:]
        return (sigmas1, sigmas2)
```