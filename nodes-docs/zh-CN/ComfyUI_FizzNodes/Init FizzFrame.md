# Documentation
- Class name: InitNodeFrame
- Category: FizzNodes 📅🅕🅝/FrameNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

方法 `create_frame` 负责初始化和管理节点中的框架。它通过结合正面和负面文本输入以及可选的一般情感和先前框架的上下文来构建一个新的框架。该节点的功能集中在创建一个结构化表示，封装文本数据，以便在框架内进行进一步的处理和分析。

# Input types
## Required
- frame
    - 参数 'frame' 对于标识节点操作中的具体框架至关重要。它在组织和区分不同框架中起着关键作用，因此影响节点的执行和它创建的结构化表示。
    - Comfy dtype: INT
    - Python dtype: int
- positive_text
    - 参数 'positive_text' 是定义框架积极情感的关键组成部分。它显著影响节点处理和表示文本数据中情感的能力，塑造了整体情感分析的结果。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- negative_text
    - 虽然 'negative_text' 参数是可选的，但它通过提供负面上下文，有助于全面的情感分析。它丰富了节点对情感谱系的理解，提高了情感表示的准确性。
    - Comfy dtype: STRING
    - Python dtype: str
- general_positive
    - 参数 'general_positive' 允许包含可以与框架关联的一般性正面陈述。它通过将更广泛的正面情感融入框架的上下文中，为情感分析增添了深度。
    - Comfy dtype: STRING
    - Python dtype: str
- general_negative
    - 参数 'general_negative' 用于包含可能影响框架的一般性负面情感。它对于提供情感的平衡视角很重要，确保节点能够捕捉到情感表达的全部范围。
    - Comfy dtype: STRING
    - Python dtype: str
- previous_frame
    - 参数 'previous_frame' 用于引用先前的框架，允许节点继承并建立在其上下文之上。它对于在节点操作中保持框架之间的连续性和一致性具有重要意义。
    - Comfy dtype: FIZZFRAME
    - Python dtype: FIZZFRAME
- clip
    - 参数 'clip' 对于将文本数据编码成节点可以处理的标记化格式至关重要。它在将原始文本转换为情感分析的结构化表示中起着工具性作用。
    - Comfy dtype: CLIP
    - Python dtype: CLIP

# Output types
- FIZZFRAME
    - 输出 'FIZZFRAME' 提供了新创建的框架及其相关的情感和上下文。它很重要，因为它代表了节点操作的成果，封装了结构化数据以供进一步使用。
    - Comfy dtype: FIZZFRAME
    - Python dtype: FIZZFRAME
- CONDITIONING
    - 输出 'CONDITIONING' 包括从文本输入派生的编码正面和负面调节数据。它对于情感分析至关重要，因为它提供了下游处理所需的结构化表示。
    - Comfy dtype: COMBO[torch.Tensor, Dict[str, torch.Tensor]]
    - Python dtype: Tuple[torch.Tensor, Dict[str, torch.Tensor]]

# Usage tips
- Infra type: CPU

# Source code
```
class InitNodeFrame:

    def __init__(self):
        self.frames = {}
        self.thisFrame = {}

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'frame': ('INT', {'default': 0, 'min': 0}), 'positive_text': ('STRING', {'multiline': True})}, 'optional': {'negative_text': ('STRING', {'multiline': True}), 'general_positive': ('STRING', {'multiline': True}), 'general_negative': ('STRING', {'multiline': True}), 'previous_frame': ('FIZZFRAME', {'forceInput': True}), 'clip': ('CLIP',)}}
    RETURN_TYPES = ('FIZZFRAME', 'CONDITIONING', 'CONDITIONING')
    FUNCTION = 'create_frame'
    CATEGORY = 'FizzNodes 📅🅕🅝/FrameNodes'

    def create_frame(self, frame, positive_text, negative_text=None, general_positive=None, general_negative=None, previous_frame=None, clip=None):
        new_frame = {'positive_text': positive_text, 'negative_text': negative_text}
        if previous_frame:
            prev_frame = previous_frame.thisFrame
            new_frame['general_positive'] = prev_frame['general_positive']
            new_frame['general_negative'] = prev_frame['general_negative']
            new_frame['clip'] = prev_frame['clip']
            self.frames = previous_frame.frames
        if general_positive:
            new_frame['general_positive'] = general_positive
        if general_negative:
            new_frame['general_negative'] = general_negative
        new_positive_text = f"{positive_text}, {new_frame['general_positive']}"
        new_negative_text = f"{negative_text}, {new_frame['general_negative']}"
        if clip:
            new_frame['clip'] = clip
        pos_tokens = new_frame['clip'].tokenize(new_positive_text)
        (pos_cond, pos_pooled) = new_frame['clip'].encode_from_tokens(pos_tokens, return_pooled=True)
        new_frame['pos_conditioning'] = {'cond': pos_cond, 'pooled': pos_pooled}
        neg_tokens = new_frame['clip'].tokenize(new_negative_text)
        (neg_cond, neg_pooled) = new_frame['clip'].encode_from_tokens(neg_tokens, return_pooled=True)
        new_frame['neg_conditioning'] = {'cond': neg_cond, 'pooled': neg_pooled}
        self.frames[frame] = new_frame
        self.thisFrame = new_frame
        return (self, [[pos_cond, {'pooled_output': pos_pooled}]], [[neg_cond, {'pooled_output': neg_pooled}]])
```