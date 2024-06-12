# Documentation
- Class name: TextPreserve
- Category: Mikey/Text
- Output node: True
- Repo Ref: https://github.com/bash-j/mikey_nodes

TextPreserve节点旨在处理和保留原始文本，同时允许动态内容替换。它通过识别输入文本中的占位符并将它们替换为随机或指定的值来实现这一点，确保在整个转换过程中保持原始消息的完整性。

# Input types
## Required
- text
    - ‘text’参数是节点的主要输入，包含将被处理的文本。它至关重要，因为它定义了将经历保留和替换过程的内容。此参数支持多行，允许复杂和扩展的文本输入。
    - Comfy dtype: STRING
    - Python dtype: str
- result_text
    - ‘result_text’参数是节点执行后存储处理文本的地方。它至关重要，因为它包含了所有替换和保留操作完成后文本的最终输出。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- unique_id
    - ‘unique_id’参数用于在工作流中唯一标识节点。它是可选的，但对于跟踪和管理节点在更大系统中的状态和输出可能很重要。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: Union[str, None]
- extra_pnginfo
    - ‘extra_pnginfo’参数提供了可以用来增强文本处理的额外信息。它是可选的，并且可能包含影响节点操作方式的元数据或其他相关细节。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Union[str, None]
- prompt
    - ‘prompt’参数用于提供指导文本替换过程的动态提示。它是可选的，但可以通过引入特定于上下文的替换来显著影响节点的行为。
    - Comfy dtype: PROMPT
    - Python dtype: Union[str, None]

# Output types
- text
    - ‘text’输出参数代表了所有操作完成后的最终处理文本。它是节点功能的最高体现，包含了保留和替换过程的结果。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class TextPreserve:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True, 'default': 'Input Text Here', 'dynamicPrompts': False}), 'result_text': ('STRING', {'multiline': True, 'default': 'Result Text Here (will be replaced)'})}, 'hidden': {'unique_id': 'UNIQUE_ID', 'extra_pnginfo': 'EXTRA_PNGINFO', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('text',)
    FUNCTION = 'process'
    OUTPUT_NODE = True
    CATEGORY = 'Mikey/Text'

    def process(self, text, result_text, unique_id=None, extra_pnginfo=None, prompt=None):
        random.seed()
        preserve_text = text
        text = search_and_replace(text, extra_pnginfo, prompt)
        wc_re = re.compile('{([^}]+)}')

        def repl(m):
            return random.choice(m.group(1).split('|'))
        for m in wc_re.finditer(text):
            text = text.replace(m.group(0), repl(m))
        prompt.get(str(unique_id))['inputs']['text'] = preserve_text
        for (i, node_dict) in enumerate(extra_pnginfo['workflow']['nodes']):
            if node_dict['id'] == int(unique_id):
                node_dict['widgets_values'] = [preserve_text, text]
                extra_pnginfo['workflow']['nodes'][i] = node_dict
        prompt.get(str(unique_id))['inputs']['result_text'] = text
        return (text,)
```