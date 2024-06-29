# Documentation
- Class name: CreatePromptVariant
- Category: OneButtonPrompt
- Output node: False
- Repo Ref: https://github.com/AIrjen/OneButtonPrompt

CreatePromptVariant节点旨在根据用户输入和附加参数生成多样化和富有创造力的文本提示。它通过操作和组合各种元素，如对象、角色和场景，构建独特且引人入胜的文本提示，适用于内容创作和创意生成的广泛应用。

# Input types
## Required
- prompt_input
    - 输入提示是节点操作的基础，提供了生成内容的上下文和主题。它对于设定生成内容的初始方向和范围至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- insanitylevel
    - 疯狂等级参数控制应用于输入提示的变化和创造性程度。更高的等级会产生更多样化且可能非常规的输出，引入更广泛的想法和可能性。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 种子参数用于确保节点输出的可复现性。通过指定一个种子，用户可以在不同的运行中生成一致的结果，这对于测试和调试非常有益。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- prompt
    - 输出是基于输入参数进行了修改和增强的原始提示的版本。它包含了各种元素和调整，代表了可以激发进一步开发和探索的新创意方向。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CreatePromptVariant:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'prompt_input': ('STRING', {'default': '', 'multiline': True})}, 'optional': {'insanitylevel': ('INT', {'default': 5, 'min': 1, 'max': 10, 'step': 1}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('prompt',)
    FUNCTION = 'Comfy_OBP_PromptVariant'
    CATEGORY = 'OneButtonPrompt'

    def Comfy_OBP_PromptVariant(self, prompt_input, insanitylevel, seed):
        generatedprompt = createpromptvariant(prompt_input, insanitylevel)
        print(generatedprompt)
        return (generatedprompt,)
```