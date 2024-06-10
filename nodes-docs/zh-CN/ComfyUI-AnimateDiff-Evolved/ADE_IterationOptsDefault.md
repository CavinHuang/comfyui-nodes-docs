# Documentation
- Class name: IterationOptionsNode
- Category: Animate Diff 🎭🅐🅓/iteration opts
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

迭代选项节点类的 `create_iter_opts` 方法旨在为采样过程配置迭代设置。它允许用户指定迭代次数以及批次和种子的偏移量，这对于控制采样程序并确保生成多样化的输出至关重要。

# Input types
## Required
- iterations
    - 参数 'iterations' 定义了采样过程将重复的次数。它是节点操作的一个基本方面，因为它直接影响生成的输出数量。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- iter_batch_offset
    - 参数 'iter_batch_offset' 用于调整每次迭代的批次索引。它在采样过程中发挥作用，允许生成的输出序列中存在变化。
    - Comfy dtype: INT
    - Python dtype: int
- iter_seed_offset
    - 参数 'iter_seed_offset' 指定了每次迭代中使用的种子的偏移量。通过改变每次迭代的随机数生成的起始点，这可以在采样中引入多样性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- ITERATION_OPTS
    - 输出 'ITERATION_OPTS' 表示采样过程的配置迭代选项。它封装了用户定义的设置，对于采样工作流中的后续步骤至关重要。
    - Comfy dtype: ITERATION_OPTS
    - Python dtype: IterationOptions

# Usage tips
- Infra type: CPU

# Source code
```
class IterationOptionsNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'iterations': ('INT', {'default': 1, 'min': 1})}, 'optional': {'iter_batch_offset': ('INT', {'default': 0, 'min': 0, 'max': BIGMAX}), 'iter_seed_offset': ('INT', {'default': 0, 'min': BIGMIN, 'max': BIGMAX})}}
    RETURN_TYPES = ('ITERATION_OPTS',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/iteration opts'
    FUNCTION = 'create_iter_opts'

    def create_iter_opts(self, iterations: int, iter_batch_offset: int=0, iter_seed_offset: int=0):
        iter_opts = IterationOptions(iterations=iterations, iter_batch_offset=iter_batch_offset, iter_seed_offset=iter_seed_offset)
        return (iter_opts,)
```