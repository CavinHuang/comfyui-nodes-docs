# Documentation
- Class name: CLIPTextEncodeSequence2
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/WASasquatch/WAS_Extras

CLIPTextEncodeSequence2节点旨在将文本序列编码成可用于生成模型中进一步处理的条件序列。它处理每行文本以创建一组条件向量，然后根据指定的关键帧类型对这些向量进行转换，以与所需的帧数对齐。

# Input types
## Required
- clip
    - clip参数至关重要，因为它为文本编码过程提供了必要的上下文。它影响文本如何被转换成条件向量序列。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- frame_count
    - 帧数参数指定要生成的总帧数。它是一个基本参数，直接影响输出条件序列的规模。
    - Comfy dtype: INT
    - Python dtype: int
- text
    - 文本参数是编码过程的原始输入。它是将被转换成条件序列的信息来源。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- token_normalization
    - 令牌归一化是一种用于稳定编码过程的技术。它决定了文本编码中令牌的归一化方式，这可能会影响生成的条件序列的质量。
    - Comfy dtype: COMBO[none, mean, length, length+mean]
    - Python dtype: str
- weight_interpretation
    - 权重解释参数定义了解译编码文本权重的方法。它对编码过程的准确性和可靠性至关重要。
    - Comfy dtype: COMBO[comfy, A1111, compel, comfy++]
    - Python dtype: str
- cond_keyframes_type
    - cond_keyframes_type参数决定条件关键帧如何分布在帧数上。它对于将文本编码与所需的时间结构对齐非常重要。
    - Comfy dtype: COMBO[linear, sinus, sinus_inverted, half_sinus, half_sinus_inverted]
    - Python dtype: str

# Output types
- conditioning_sequence
    - 条件序列是编码文本表示的列表，用作生成模型的输入。它是指导生成过程的关键组成部分。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[int, torch.Tensor]]
- cond_keyframes
    - cond_keyframes代表生成序列中与编码文本对应的特定帧。它们对于同步文本编码和视觉输出非常重要。
    - Comfy dtype: INT
    - Python dtype: List[int]
- frame_count
    - 帧数表示生成的总帧数，提供了输出范围的度量。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class CLIPTextEncodeSequence2:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'clip': ('CLIP',), 'token_normalization': (['none', 'mean', 'length', 'length+mean'],), 'weight_interpretation': (['comfy', 'A1111', 'compel', 'comfy++'],), 'cond_keyframes_type': (['linear', 'sinus', 'sinus_inverted', 'half_sinus', 'half_sinus_inverted'],), 'frame_count': ('INT', {'default': 100, 'min': 1, 'max': 1024, 'step': 1}), 'text': ('STRING', {'multiline': True, 'default': 'A portrait of a rosebud\nA portrait of a blooming rosebud\nA portrait of a blooming rose\nA portrait of a rose'})}}
    RETURN_TYPES = ('CONDITIONING', 'INT', 'INT')
    RETURN_NAMES = ('conditioning_sequence', 'cond_keyframes', 'frame_count')
    IS_LIST_OUTPUT = (True, True, False)
    FUNCTION = 'encode'
    CATEGORY = 'conditioning'

    def encode(self, clip, text, cond_keyframes_type, frame_count, token_normalization, weight_interpretation):
        text = text.strip()
        conditionings = []
        for line in text.splitlines():
            if USE_BLK:
                encoded = blk_adv.encode(clip=clip, text=line, token_normalization=token_normalization, weight_interpretation=weight_interpretation)
            else:
                encoded = CLIPTextEncode.encode(clip=clip, text=line)
            conditionings.append([encoded[0][0][0], encoded[0][0][1]])
        conditioning_count = len(conditionings)
        cond_keyframes = self.calculate_cond_keyframes(cond_keyframes_type, frame_count, conditioning_count)
        return (conditionings, cond_keyframes, frame_count)

    def calculate_cond_keyframes(self, type, frame_count, conditioning_count):
        if type == 'linear':
            return np.linspace(frame_count // conditioning_count, frame_count, conditioning_count, dtype=int).tolist()
        elif type == 'sinus':
            t = np.linspace(0, np.pi, conditioning_count)
            sinus_values = np.sin(t)
            normalized_values = (sinus_values - sinus_values.min()) / (sinus_values.max() - sinus_values.min())
            scaled_values = normalized_values * (frame_count - 1) + 1
            unique_keyframes = np.round(scaled_values).astype(int)
            unique_keyframes = np.unique(unique_keyframes, return_index=True)[1]
            return sorted(unique_keyframes.tolist())
        elif type == 'sinus_inverted':
            return (np.cos(np.linspace(0, np.pi, conditioning_count)) * (frame_count - 1) + 1).astype(int).tolist()
        elif type == 'half_sinus':
            return (np.sin(np.linspace(0, np.pi / 2, conditioning_count)) * (frame_count - 1) + 1).astype(int).tolist()
        elif type == 'half_sinus_inverted':
            return (np.cos(np.linspace(0, np.pi / 2, conditioning_count)) * (frame_count - 1) + 1).astype(int).tolist()
        else:
            raise ValueError('Unsupported cond_keyframes_type: ' + type)
```