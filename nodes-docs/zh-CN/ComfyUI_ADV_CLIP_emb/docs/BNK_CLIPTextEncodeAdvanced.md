# Documentation
- Class name: AdvancedCLIPTextEncode
- Category: conditioning/advanced
- Output node: False
- Repo Ref: https://github.com/BlenderNeko/ComfyUI_ADV_CLIP_emb

AdvancedCLIPTextEncode节点旨在将文本输入处理和编码成可用于高级条件任务的形式。它利用CLIP模型的能力生成捕获文本语义属性的嵌入。该节点特别适用于需要对输入文本有更深入理解的应用，如生成模型或需要对输入文本有更深入理解的自然语言处理任务。

# Input types
## Required
- text
    - 'text'参数是节点的主要输入，代表需要编码的文本。它应该是一个字符串，并且可以包含多行文本，允许处理更复杂和更长的文本输入。此参数至关重要，因为编码的质量在很大程度上取决于所提供文本的准确性和丰富性。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - 'clip'参数指定用于文本编码的CLIP模型。它是一个必需的输入，因为节点依赖于CLIP模型的架构和能力，从文本输入生成有意义的嵌入。
    - Comfy dtype: CLIP
    - Python dtype: Any
- token_normalization
    - 'token_normalization'参数确定在编码之前文本中的标记是如何规范化的。它可以采用不同的策略，如'none'、'mean'、'length'或'length+mean'，这会影响标记嵌入的分布和尺度。这个参数对于控制嵌入中的方差很重要，并且可以影响条件性能。
    - Comfy dtype: COMBO[none, mean, length, length+mean]
    - Python dtype: str
- weight_interpretation
    - 'weight_interpretation'参数影响编码过程中标记权重的解释方式。它提供各种选项，如'comfy'、'A1111'、'compel'、'comfy++'或'down_weight'，每种选项都可能导致对文本某些方面的不同强调。此参数对于微调编码以符合下游任务的具体要求至关重要。
    - Comfy dtype: COMBO[comfy, A1111, compel, comfy++, down_weight]
    - Python dtype: str
## Optional
- affect_pooled
    - 'affect_pooled'参数是一个可选输入，用于控制是否应通过编码过程影响CLIP模型的池化输出。它接受'enable'或'disable'的值，这决定了池化输出是否包含在最终嵌入中。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- CONDITIONING
    - AdvancedCLIPTextEncode节点的输出是一个张量，代表编码后的文本。这个张量用作进一步处理或生成任务的条件输入。它包含了从文本中提取的语义信息，提供了丰富和细致的表示，可以指导工作流程中的后续步骤。
    - Comfy dtype: TENSOR
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class AdvancedCLIPTextEncode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True}), 'clip': ('CLIP',), 'token_normalization': (['none', 'mean', 'length', 'length+mean'],), 'weight_interpretation': (['comfy', 'A1111', 'compel', 'comfy++', 'down_weight'],)}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'encode'
    CATEGORY = 'conditioning/advanced'

    def encode(self, clip, text, token_normalization, weight_interpretation, affect_pooled='disable'):
        (embeddings_final, pooled) = advanced_encode(clip, text, token_normalization, weight_interpretation, w_max=1.0, apply_to_pooled=affect_pooled == 'enable')
        return ([[embeddings_final, {'pooled_output': pooled}]],)
```