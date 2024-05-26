# Documentation
- Class name: TextInput
- Category: ♾️Mixlab/Utils
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

TextInput节点旨在处理文本输入，为处理字符串数据提供了一个简单的接口。它能够接受多行文本，为各种文本处理任务提供了灵活性。在需要文本分析或操作的流程中，这个节点扮演着关键角色，确保文本被正确格式化并准备好进行后续操作。

# Input types
## Required
- text
    - ‘text’参数是TextInput节点的主要输入。这是提供要处理的实际文本的地方。这个输入至关重要，因为它直接影响节点的操作和随后的输出。文本可以跨越多行，适应广泛的文本输入。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- output_text
    - ‘output_text’是由TextInput节点处理输入文本后产生的结果。它代表了输入的转换或分析版本，具体取决于节点执行的操作。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class TextInput:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True, 'default': ''})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Utils'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False,)

    def run(self, text):
        return (text,)
```