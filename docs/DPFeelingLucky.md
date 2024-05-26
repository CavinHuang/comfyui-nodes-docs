# Documentation
- Class name: DPFeelingLucky
- Category: Sampling
- Output node: False
- Repo Ref: https://github.com/adieyal/comfyui-dynamicprompts.git

该节点旨在通过利用随机种子和幸运感觉方法生成富有创意和潜在意外的提示。它旨在引入变异性和新颖性到采样过程中，为输出结果的多样性做出贡献。

# Input types
## Required
- text
    - 输入文本是生成提示的基础。它至关重要，因为它为节点提供了上下文和内容，直接影响生成提示的相关性和创造性。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- seed
    - 种子参数对于控制生成提示的随机性至关重要。它确保当种子固定时，相同的输入文本将产生一致的结果，这对于调试和可复现性非常有用。
    - Comfy dtype: int
    - Python dtype: int
- autorefresh
    - 自动刷新参数可用于确定节点是否应根据输入文本的变化自动生成新的提示。它影响节点的响应性和内容生成过程的动态性。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- prompt
    - 输出是一个生成的提示，是节点操作的结果。它代表了从输入文本和种子引入的随机性中派生出的创造性和潜在新颖的内容。
    - Comfy dtype: str
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class DPFeelingLucky(DPAbstractSamplerNode):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._random_generator = RandomPromptGenerator(wildcard_manager=self._wildcard_manager)
        self._prompt_generator = FeelingLuckyGenerator(generator=self._random_generator)

    def get_prompt(self, text: str, seed: int, autorefresh: str) -> tuple[str]:
        """
        Main entrypoint for this node.
        Using the sampling context, generate a new prompt.
        """
        if seed > 0:
            self.context.rand.seed(seed)
        if text.strip() == '':
            return ('',)
        try:
            prompt = self._prompt_generator.generate(text, 1)[0]
            return (str(prompt),)
        except Exception as e:
            logger.exception(e)
            return ('',)

    @property
    def context(self) -> SamplingContext:
        return self._random_generator._context
```