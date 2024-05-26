# Documentation
- Class name: SRFloatPromptInput
- Category: Mikey/Meta
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

SRFloatPromptInput节点旨在处理和管理浮点数值。它在接收和存储输入值方面发挥着关键作用，这些输入值随后在后续的计算操作中被使用。该节点确保输入是一个浮点数，从而在整个系统中维护数据的完整性。

# Input types
## Required
- input_float
    - input_float参数对于节点的操作至关重要，因为它表示要处理的浮点值。它是一个必需的输入，表明了它在节点功能中的基本重要性。节点依赖此参数执行其指定的任务。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- unique_id
    - unique_id参数在节点操作中作为input_float值的标识符。虽然它不是强制性的，但它可以用来跟踪和引用特定的输入，增强节点管理和组织数据的能力。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str
- prompt
    - prompt参数用于促进与节点的交互，允许自定义输入过程。它是一个可选输入，可以用来根据特定要求或环境调整节点的行为。
    - Comfy dtype: PROMPT
    - Python dtype: dict

# Output types
- result
    - result参数代表节点处理input_float后的输出。它标志着节点操作的完成，并将结果返回给用户以供进一步使用或分析。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class SRFloatPromptInput:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input_float': ('FLOAT', {'forceInput': True})}, 'hidden': {'unique_id': 'UNIQUE_ID', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('FLOAT',)
    FUNCTION = 'add'
    CATEGORY = 'Mikey/Meta'

    def add(self, input_float, unique_id=None, prompt=None):
        prompt.get(str(unique_id))['inputs']['sr_val'] = str(input_float)
        return (input_float,)
```