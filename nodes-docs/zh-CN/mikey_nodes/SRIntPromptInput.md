# Documentation
- Class name: SRIntPromptInput
- Category: Mikey/Meta
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

SRIntPromptInput节点旨在将整数输入集成到结构化的提示格式中。它在数据预处理中扮演着关键角色，确保整数值被正确地嵌入到提示结构中，从而促进依赖于这种结构化数据的后续操作。

# Input types
## Required
- input_int
    - 参数'input_int'对于节点的操作至关重要，因为它表示要合并到提示中的整数值。其正确输入对于提示的结构化格式至关重要，影响后续处理。
    - Comfy dtype: INT
    - Python dtype: int
- unique_id
    - 参数'unique_id'是一个唯一标识符，用于引用提示中的特定条目。它对于确保整数输入与提示结构中预期的上下文正确关联至关重要。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str
- prompt
    - 参数'prompt'是一个字典，包含结构化的提示信息。它对节点至关重要，因为这是整数输入被嵌入的地方，影响节点的最终输出。
    - Comfy dtype: PROMPT
    - Python dtype: Dict[str, Dict[str, str]]
## Optional
- extra_pnginfo
    - 参数'extra_pnginfo'虽然是可选的，但可以提供可能与提示相关的附加上下文或元数据。它增强了结构化数据的丰富性，并可能影响后续节点如何解释提示。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: str

# Output types
- output_int
    - 参数'output_int'代表已成功集成到提示中的原始整数值。它标志着节点主要功能的完成，对于后续操作中数据流的连续性至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SRIntPromptInput:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input_int': ('INT', {'forceInput': True})}, 'hidden': {'unique_id': 'UNIQUE_ID', 'extra_pnginfo': 'EXTRA_PNGINFO', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('INT',)
    RETURN_NAMES = ('output_int',)
    FUNCTION = 'add'
    CATEGORY = 'Mikey/Meta'

    def add(self, input_int, extra_pnginfo, unique_id, prompt):
        prompt.get(str(unique_id))['inputs']['sr_val'] = str(input_int)
        return (input_int,)
```