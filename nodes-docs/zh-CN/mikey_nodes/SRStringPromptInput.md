# Documentation
- Class name: SRStringPromptInput
- Category: Mikey/Meta
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

SRStringPromptInput节点旨在接受和处理文本输入，特别适用于字符串数据。它在处理字符串提示方面发挥关键作用，通过将它们整合成可用于各种应用的结构化格式。该节点确保输入的字符串被正确记录，并与唯一标识符关联，便于在后续操作中检索和使用。

# Input types
## Required
- input_str
    - input_str参数对于节点的操作至关重要，因为它代表了要处理的文本数据。它是节点处理的核心元素，其质量直接影响节点的输出和后续数据处理。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- unique_id
    - unique_id参数虽然是可选的，但在节点中起着关键作用，它为每个输入字符串提供独特的标识符。这有助于索引和引用输入字符串以备将来使用，从而提高了节点在管理和检索数据方面的效率。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str
- prompt
    - 当使用prompt参数时，它通过将输入字符串与特定提示关联，为输入字符串增加了一层上下文。这在输入需要在特定上下文中理解的情况下特别有用，从而丰富了节点的功能。
    - Comfy dtype: PROMPT
    - Python dtype: dict

# Output types
- output
    - SRStringPromptInput节点的输出是已处理的输入字符串，它已成功记录并与提供的唯一标识符和提示关联。这个输出很重要，因为它确认了输入数据已成功集成到系统中。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SRStringPromptInput:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input_str': ('STRING', {'forceInput': True})}, 'hidden': {'unique_id': 'UNIQUE_ID', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'add'
    CATEGORY = 'Mikey/Meta'

    def add(self, input_str, unique_id=None, prompt=None):
        prompt.get(str(unique_id))['inputs']['sr_val'] = input_str
        return (input_str,)
```