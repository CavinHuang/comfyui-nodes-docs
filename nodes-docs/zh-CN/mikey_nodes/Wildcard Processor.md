# Documentation
- Class name: WildcardProcessor
- Category: Mikey/Text
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

WildcardProcessor节点旨在通过替换通配符来操作和处理文本输入，使用特定模式或值。它通过识别输入提示中的占位符，并将它们替换为相应的数据，从而实现基于用户定义标准的动态文本生成。

# Input types
## Required
- prompt
    - ‘prompt’参数是节点的主要输入，作为将进行通配符替换的源文本。它至关重要，因为它决定了节点将处理和转换的上下文和内容。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - ‘seed’参数是一个整数，用于初始化随机数生成器，确保通配符替换过程的可重复性。它在确定从通配符文件中选择行的过程中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- prompt_
    - ‘prompt_’参数是一个可选的字典，提供通配符替换的额外上下文或特定指令。它通过允许用户根据自己的需求定制替换过程，增强了节点操作的定制性。
    - Comfy dtype: PROMPT
    - Python dtype: Dict[str, Any]
- extra_pnginfo
    - ‘extra_pnginfo’参数是一个可选的JSON对象，包含通配符替换的额外信息。它用于提供可能影响节点处理输入提示的额外数据。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Union[str, Dict[str, Any]]

# Output types
- processed_prompt
    - ‘processed_prompt’输出是节点操作的结果，其中输入提示的通配符已被适当的值替换。它标志着文本处理的完成，并已准备好进一步使用或输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WildcardProcessor:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'prompt': ('STRING', {'multiline': True, 'placeholder': 'Prompt Text'}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'hidden': {'prompt_': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'process'
    CATEGORY = 'Mikey/Text'

    def process(self, prompt, seed, prompt_=None, extra_pnginfo=None):
        if prompt_ is None:
            prompt_ = {}
        if extra_pnginfo is None:
            extra_pnginfo = {}
        prompt = search_and_replace(prompt, extra_pnginfo, prompt_)
        prompt = find_and_replace_wildcards(prompt, seed)
        return (prompt,)
```