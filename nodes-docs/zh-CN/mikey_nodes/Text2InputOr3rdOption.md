# Documentation
- Class name: Text2InputOr3rdOption
- Category: Mikey/Text
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

Text2InputOr3rdOption节点的'output'函数旨在根据条件逻辑处理并返回文本输入。它使用提供的提示中的值替换输入文本中的占位符，并可以返回两个单独的文本或一对相同的文本，这取决于一个布尔标志。

# Input types
## Required
- text_a
    - 参数'text_a'是一个字符串输入，预计包含文本。它至关重要，因为它是将要被处理并可能用提示中的值替换占位符的主要输入之一。
    - Comfy dtype: STRING
    - Python dtype: str
- text_b
    - 参数'text_b'是另一个字符串输入，将与'text_a'进行相同的处理。它很重要，因为当'use_text_c_for_both'设置为'false'时，它决定了次要文本输出。
    - Comfy dtype: STRING
    - Python dtype: str
- text_c
    - 参数'text_c'是一个字符串输入，如果' use_text_c_for_both'标志设置为'true'，它可能会被用作'text_a'和'text_b'的替代品。它在确定节点的最终输出中起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- use_text_c_for_both
    - 参数'use_text_c_for_both'是一个布尔标志，它决定是否应该使用'text_c'作为'text_a'和'text_b'的输出。它对于控制节点的输出行为至关重要。
    - Comfy dtype: COMBO['true', 'false']
    - Python dtype: str
## Optional
- extra_pnginfo
    - 参数'extra_pnginfo'是一个可选输入，当提供时，包含用于在文本输入中搜索和替换占位符的额外信息。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Union[Dict, str]
- prompt
    - 参数'prompt'是一个可选输入，它提供了一组结构化的值，用于替换文本输入中的占位符。它对文本替换过程至关重要。
    - Comfy dtype: PROMPT
    - Python dtype: Union[Dict, str]

# Output types
- text_a
    - 输出'text_a'是初始'text_a'输入的加工版本，其中的占位符已被提示中的相应值替换。
    - Comfy dtype: STRING
    - Python dtype: str
- text_b
    - 输出'text_b'在结构上与'text_a'输出相对应，但源自'text_b'输入。它是经过处理并替换了占位符的文本。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class Text2InputOr3rdOption:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text_a': ('STRING', {'multiline': True, 'default': 'Text A'}), 'text_b': ('STRING', {'multiline': True, 'default': 'Text B'}), 'text_c': ('STRING', {'multiline': True, 'default': 'Text C'}), 'use_text_c_for_both': (['true', 'false'], {'default': 'false'})}, 'hidden': {'extra_pnginfo': 'EXTRA_PNGINFO', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('text_a', 'text_b')
    FUNCTION = 'output'
    CATEGORY = 'Mikey/Text'

    def output(self, text_a, text_b, text_c, use_text_c_for_both, extra_pnginfo, prompt):
        text_a = search_and_replace(text_a, extra_pnginfo, prompt)
        text_b = search_and_replace(text_b, extra_pnginfo, prompt)
        text_c = search_and_replace(text_c, extra_pnginfo, prompt)
        if use_text_c_for_both == 'true':
            return (text_c, text_c)
        else:
            return (text_a, text_b)
```