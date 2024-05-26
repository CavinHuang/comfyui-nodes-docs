# Documentation
- Class name: DPRandomGenerator
- Category: Sampling
- Output node: False
- Repo Ref: https://github.com/adieyal/comfyui-dynamicprompts.git

DPRandomGenerator节点旨在根据一组给定的规则和变量产生多种输出。它通过解释命令结构并使用抽样方法来生成多样化的结果，确保对可能的结果进行广泛的探索。

# Input types
## Required
- command
    - 命令参数至关重要，因为它定义了节点将生成的提示的结构和内容。它是采样过程的蓝图，直接影响输出的多样性和性质。
    - Comfy dtype: Command
    - Python dtype: dynamicprompts.commands.Command
## Optional
- num_prompts
    - num_prompts参数规定了节点将生成的提示的最大数量。它在控制输出范围方面起着重要作用，根据设定的值允许输出范围集中或广泛。
    - Comfy dtype: int
    - Python dtype: int

# Output types
- prompts
    - 输出提示是节点执行的结果，反映了输入命令和抽样方法的应用。它们代表了基于初始输入成功生成的多样化和相关的结果。
    - Comfy dtype: List[SamplingResult]
    - Python dtype: List[dynamicprompts.SamplingResult]

# Usage tips
- Infra type: CPU

# Source code
```
class DPRandomGenerator(DPAbstractSamplerNode):

    @property
    @lru_cache(maxsize=1)
    def context(self) -> SamplingContext:
        return SamplingContext(wildcard_manager=self._wildcard_manager, default_sampling_method=SamplingMethod.RANDOM)
```