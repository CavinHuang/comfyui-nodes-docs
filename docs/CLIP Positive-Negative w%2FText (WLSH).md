# Documentation
- Class name: WLSH_CLIP_Text_Positive_Negative
- Category: WLSH Nodes/conditioning
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_CLIP_Text_Positive_Negative节点的`encode`方法旨在通过CLIP模型处理文本输入，将其编码为嵌入向量。该节点将文本数据转换为可用于进一步分析或作为机器学习模型输入的形式，扮演着关键角色。它强调节点能够处理正面和负面文本样本的能力，这对于需要进行情感分析或对比学习的任务至关重要。

# Input types
## Required
- positive
    - 参数'positive'是一个文本输入，代表正面情感或上下文。它是节点操作的基础，因为它构成了情感分析和对比学习的基础，在这些学习中，节点区分正面和负面的文本样本。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 参数'negative'是一个文本输入，代表负面情感或上下文。它与'positive'参数结合使用，为节点内的编码和分析提供比较基础。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - 参数'clip'是CLIP模型的一个实例，用于将文本输入编码为嵌入向量。它是节点的关键组件，因为它直接影响编码过程的质量和准确性。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module

# Output types
- positive
    - 输出'positive'是正面文本输入的编码表示。它是后续需要情感分析或理解正面上下文的机器学习任务的关键元素。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative
    - 输出'negative'是负面文本输入的编码表示。它对于涉及情感分析或模型范围内负面上下文理解的应用具有重要意义。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- positive_text
    - 输出'positive_text'是提供给节点的原始正面文本输入。它有助于在进一步处理或分析时，将原始文本数据与编码的嵌入向量一起保留参考。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_text
    - 输出'negative_text'是提供给节点的原始负面文本输入。它保留了原始文本数据，可能与编码的嵌入向量结合用于后续任务。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class WLSH_CLIP_Text_Positive_Negative:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'positive': ('STRING', {'multiline': True}), 'negative': ('STRING', {'multiline': True}), 'clip': ('CLIP',)}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'STRING', 'STRING')
    RETURN_NAMES = ('positive', 'negative', 'positive_text', 'negative_text')
    FUNCTION = 'encode'
    CATEGORY = 'WLSH Nodes/conditioning'

    def encode(self, clip, positive, negative):
        return ([[clip.encode(positive), {}]], [[clip.encode(negative), {}]], positive, negative)
```