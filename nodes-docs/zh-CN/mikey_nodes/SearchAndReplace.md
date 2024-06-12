# Documentation
- Class name: SearchAndReplace
- Category: Mikey/Utils
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

SearchAndReplace节点旨在通过在给定文本中搜索特定模式并将其替换为相应的值来执行文本操作任务。它可以处理诸如日期和来自提示或额外信息的值等动态替换，使其适用于各种用例。

# Input types
## Required
- text
    - 'text'参数是节点的主要输入，包含将要执行搜索和替换操作的文本。它可以包含动态内容的占位符，节点将用实际值替换这些占位符。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - 'seed'参数用于初始化或影响节点内某些操作的随机性。当节点执行需要随机或伪随机元素的操作时，它尤其重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- prompt
    - 'prompt'参数是可选输入，提供节点可以用来在文本中执行更复杂替换的额外上下文或数据。它通常用于从外部源注入值。
    - Comfy dtype: STRING
    - Python dtype: Union[str, Dict[str, Any]]
- extra_pnginfo
    - 'extra_pnginfo'参数是另一个可选输入，可以包含节点执行其操作所需的额外信息。当需要超出'prompt'提供的信息的额外数据时，它特别有用。
    - Comfy dtype: STRING
    - Python dtype: Union[str, Dict[str, Any]]

# Output types
- result
    - 'result'输出包含所有搜索和替换操作执行后的文本。它反映了文本的最终状态，所有指定的模式都已被其相应的值替换。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SearchAndReplace:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': False, 'placeholder': 'Text to search and replace'}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'search_and_replace'
    CATEGORY = 'Mikey/Utils'

    def search_and_replace(self, text, seed, prompt=None, extra_pnginfo=None):
        result = search_and_replace(text, extra_pnginfo, prompt)
        s = seed + 1
        return (result,)
```