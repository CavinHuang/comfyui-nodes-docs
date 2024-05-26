# Documentation
- Class name: TranslateNode
- Category: translate
- Output node: True
- Repo Ref: https://github.com/esheep/esheep_custom_nodes.git

该节点能够将文本从一种语言翻译成另一种语言，利用外部翻译服务。它旨在处理文本数据并将其转换为所需语言，实现多语言交流和内容理解。节点的主要功能是架设语言沟通的桥梁，增强信息的可访问性和覆盖范围。

# Input types
## Required
- text
    - 文本参数是必需的，因为它是需要翻译的源内容。它是翻译过程的输入，直接影响输出的相关性和准确性。没有这个参数，节点无法执行其预期功能。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- app_id
    - app_id参数虽然不是必需的，但对于向翻译服务验证请求至关重要。它确保节点能够访问必要的资源并在允许的限制内执行翻译。
    - Comfy dtype: STRING
    - Python dtype: str
- app_key
    - 与app_id类似，app_key是另一个必要的认证凭据，对节点的正确功能至关重要。它在确保连接安全和翻译请求被授权方面发挥作用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- result
    - 结果参数代表翻译后的文本，是节点的主要输出。它直接反映了翻译过程的有效性，对于实现节点的目的至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class TranslateNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True})}, 'hidden': {'app_id': ('STRING', {}), 'app_key': ('STRING', {})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'main'
    CATEGORY = 'translate'
    OUTPUT_IS_LIST = (True,)
    OUTPUT_NODE = True

    def main(self, text, app_id='', app_key=''):
        result = translate(text, Credentials(app_id=app_id, app_key=app_key))
        return {'ui': {'result': [result]}, 'result': ([result],)}
```