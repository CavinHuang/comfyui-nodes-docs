# Documentation
- Class name: AutoNegativePrompt
- Category: OneButtonPrompt
- Output node: False
- Repo Ref: https://github.com/AIrjen/OneButtonPrompt

该节点旨在基于给定的正面提示自动生成负面提示，增强两者之间的对比。它通过将输入文本中的正面情感替换为负面情感来创造性地修改文本，旨在提供鲜明的对比或对立点。节点的功能不仅限于直接文本反转，还包括使用预定义的负面属性列表来增强负面情感的能力。

# Input types
## Required
- postive_prompt
    - 正面提示是节点操作的基础。它是将被转换成负面对应物的文本。此参数至关重要，因为它决定了生成负面提示的上下文和主题内容。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- base_negative
    - 此参数提供了一个默认的负面提示，用作转换过程的起点。它对于建立节点可以进一步细化和增强的初始负面上下文很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- enhancenegative
    - 此参数控制应用于负面提示的增强级别，加强负面属性，使与正面提示的对比更加明显。它影响生成的负面提示的总体语气和严重程度。
    - Comfy dtype: INT
    - Python dtype: int
- insanitylevel
    - 疯狂等级参数在转换过程中引入了随机性元素，模拟更混乱或不可预测的负面提示。它影响最终输出中包含的负面词汇的多样性和创造性。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 种子参数通过为随机数生成器设置一个固定点来确保结果的可重复性。它对于保持节点操作的一致性至关重要，特别是在需要多次运行以进行测试或比较时。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- negative_prompt
    - 该节点的输出是一个与原始正面提示形成对比的精炼负面提示。它封装了转换过程的本质，提供了创造性和细腻的负面情感表达。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class AutoNegativePrompt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'postive_prompt': ('STRING', {'default': '', 'multiline': True})}, 'optional': {'base_negative': ('STRING', {'multiline': True, 'default': 'text, watermark'}), 'enhancenegative': ('INT', {'default': 0, 'min': 0, 'max': 1, 'step': 1}), 'insanitylevel': ('INT', {'default': 0, 'min': 0, 'max': 10, 'step': 1}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('negative_prompt',)
    FUNCTION = 'Comfy_OBP_AutoNegativePrompt'
    CATEGORY = 'OneButtonPrompt'

    def Comfy_OBP_AutoNegativePrompt(self, postive_prompt, insanitylevel, enhancenegative, base_negative, seed):
        generatedprompt = build_dynamic_negative(postive_prompt, insanitylevel, enhancenegative, base_negative)
        print('Generated negative prompt: ' + generatedprompt)
        return (generatedprompt,)
```