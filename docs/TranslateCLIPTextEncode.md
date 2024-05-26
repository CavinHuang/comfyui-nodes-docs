# Documentation
- Class name: TranslateCLIPTextEncode
- Category: translate
- Output node: False
- Repo Ref: https://github.com/esheep/esheep_custom_nodes.git

TranslateCLIPTextEncode节点充当将文本数据编码为机器学习模型（特别是使用CLIP框架的模型）可以理解的格式的中介。它通过将输入文本翻译成适合模型的语言，然后对翻译后的文本进行标记化来实现这一点。该节点的主要功能是为AI模型的后续处理准备数据，强调了语言翻译和模型编码的无缝集成。

# Input types
## Required
- text
    - ‘text’参数是节点将处理的原始文本输入。它至关重要，因为它是将被编码供模型使用的源信息。节点依赖此输入执行其翻译和编码任务，使其成为节点操作中的基本组成部分。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - ‘clip’参数代表节点将用于标记化和编码的CLIP模型或其接口。它是一个重要组件，因为它直接影响节点将文本转换为适合机器学习应用格式的能力。
    - Comfy dtype: CLIP
    - Python dtype: Any
- app_id
    - ‘app_id’参数是在使用外部翻译服务时用于认证的标识符。虽然不是必需的，但它对于访问某些服务和确保翻译过程的完整性和安全性很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- app_key
    - ‘app_key’参数作为与‘app_id’一起用于认证的秘密密钥。它不是强制性的，但在确保安全访问翻译服务方面扮演着重要角色。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- CONDITIONING
    - ‘CONDITIONING’输出是编码文本数据的结构化表示，包括CLIP模型的条件向量和池化输出。这个输出很重要，因为它提供了准备好用于下游机器学习任务的加工信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]}}

# Usage tips
- Infra type: CPU

# Source code
```
class TranslateCLIPTextEncode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True}), 'clip': ('CLIP',)}, 'hidden': {'app_id': ('STRING', {}), 'app_key': ('STRING', {})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'encode'
    CATEGORY = 'translate'

    def encode(self, clip, text, app_id='', app_key=''):
        tokens = clip.tokenize(translate(text, Credentials(app_id=app_id, app_key=app_key)))
        (cond, pooled) = clip.encode_from_tokens(tokens, return_pooled=True)
        return ([[cond, {'pooled_output': pooled}]],)
```