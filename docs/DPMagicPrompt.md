# Documentation
- Class name: DPMagicPrompt
- Category: Sampling
- Output node: False
- Repo Ref: https://github.com/adieyal/comfyui-dynamicprompts.git

DPMagicPrompt是一个旨在使用随机和魔法生成技术生成创意和与上下文相关的提示的节点。它利用预训练语言模型的力量，根据提供的输入文本和参数生成多样化和引人入胜的文本内容。

# Input types
## Required
- text
    - 输入文本是节点操作的基础，指导提示的生成。它非常重要，因为它直接影响生成内容的上下文和相关性。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- seed
    - 种子参数对于控制提示生成中的随机性至关重要，确保不同运行之间的可复现性和一致性。
    - Comfy dtype: int
    - Python dtype: int
- autorefresh
    - 自动刷新参数用于确定节点是否应根据最新的输入文本生成新的提示，有助于内容创作的动态性。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- prompt
    - 输出提示是节点操作的结果，包含了既具有创造性又与输入文本相关的生成内容。
    - Comfy dtype: str
    - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class DPMagicPrompt(DPAbstractSamplerNode):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._random_generator = RandomPromptGenerator(wildcard_manager=self._wildcard_manager)
        self._prompt_generator = MagicPromptGenerator(prompt_generator=self._random_generator)

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