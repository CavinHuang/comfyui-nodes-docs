# Documentation
- Class name: CLIPTextEncodeSequence
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/WASasquatch/WAS_Extras

CLIPTextEncodeSequence节点旨在将一系列文本行编码成一组条件序列，这些序列可以用于神经网络中的进一步处理。它考虑了标记归一化和权重解释方法，以产生文本的有意义的表示。

# Input types
## Required
- clip
    - 'clip'参数对于编码过程至关重要，因为它提供了用于文本编码的上下文或模型。它直接影响文本如何被转换为数值表示。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- token_normalization
    - 'token_normalization'参数决定了文本中的标记在编码前如何被归一化。它在确保编码后的文本保持一致的规模方面起着关键作用，这对于后续的神经网络操作非常重要。
    - Comfy dtype: COMBO[none, mean, length, length+mean]
    - Python dtype: str
- weight_interpretation
    - 'weight_interpretation'参数定义了在编码过程中与文本标记相关联的权重的解释方法。它影响着生成的编码序列的质量和特征。
    - Comfy dtype: COMBO[comfy, A1111, compel, comfy++]
    - Python dtype: str
- text
    - 'text'参数是节点处理的原始文本输入。它是多行的，可以包一系列文本行，每行都将被编码成条件序列。文本的内容和结构显著影响节点的输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- conditioning_sequence
    - 'conditioning_sequence'输出是一系列编码后的文本行，每行都表示为索引和编码向量的一对。这个输出很重要，因为它为需要基于文本的条件的下游神经网络模型提供了必要的输入。
    - Comfy dtype: CONDITIONING_SEQ
    - Python dtype: List[Tuple[int, List[float]]]

# Usage tips
- Infra type: GPU

# Source code
```
class CLIPTextEncodeSequence:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip': ('CLIP',), 'token_normalization': (['none', 'mean', 'length', 'length+mean'],), 'weight_interpretation': (['comfy', 'A1111', 'compel', 'comfy++'],), 'text': ('STRING', {'multiline': True, 'default': '0:A portrait of a rosebud\n5:A portrait of a blooming rosebud\n10:A portrait of a blooming rose\n15:A portrait of a rose'})}}
    RETURN_TYPES = ('CONDITIONING_SEQ',)
    RETURN_NAMES = ('conditioning_sequence',)
    IS_LIST_OUTPUT = (True,)
    FUNCTION = 'encode'
    CATEGORY = 'conditioning'

    def encode(self, clip, text, token_normalization, weight_interpretation):
        text = text.strip()
        conditionings = []
        for l in text.splitlines():
            match = re.match('(\\d+):', l)
            if match:
                idx = int(match.group(1))
                (_, line) = l.split(':', 1)
                line = line.strip()
                if USE_BLK:
                    encoded = blk_adv.encode(clip=clip, text=line, token_normalization=token_normalization, weight_interpretation=weight_interpretation)
                else:
                    encoded = CLIPTextEncode.encode(clip=clip, text=line)
                conditioning = (idx, [encoded[0][0][0], encoded[0][0][1]])
                conditionings.append(conditioning)
        return (conditionings,)
```