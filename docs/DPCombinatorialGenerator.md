# Documentation
- Class name: DPCombinatorialGenerator
- Category: sampling
- Output node: False
- Repo Ref: https://github.com/adieyal/comfyui-dynamicprompts.git

DPCombinatorialGenerator节点旨在基于给定的上下文生成提示的组合。它利用SamplingContext来确定生成提示的适当方法，在必要时确保采取组合方法。此节点在需要详尽的输入组合以进行彻底抽样的场景中至关重要。

# Input types
## Required
- wildcard_manager
    - 通配符管理器对于处理提示模板中的占位符至关重要。它影响节点如何解释和替换通配符，因此直接影响生成过程和输出提示的多样性。
    - Comfy dtype: WildcardManager
    - Python dtype: WildcardManager
- default_sampling_method
    - 默认的抽样方法决定了在没有指定特定方法时用于生成提示的方法。它很重要，因为它为节点的抽样行为设定了基础，影响了提示生成的整体策略。
    - Comfy dtype: SamplingMethod
    - Python dtype: SamplingMethod

# Output types
- prompts
    - 输出提示代表了基于输入上下文和抽样方法生成的组合。它们很重要，因为它们是节点操作的直接结果，包含了组合生成过程的精髓。
    - Comfy dtype: Iterable[str]
    - Python dtype: Iterable[str]

# Usage tips
- Infra type: CPU

# Source code
```
class DPCombinatorialGenerator(DPAbstractSamplerNode):

    @property
    @lru_cache(maxsize=1)
    def context(self) -> SamplingContext:
        return SamplingContext(wildcard_manager=self._wildcard_manager, default_sampling_method=SamplingMethod.COMBINATORIAL)
```