# Documentation
- Class name: NodeFrame
- Category: FizzNodes 📅🅕🅝/FrameNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

NodeFrame 类旨在管理和创建结构化数据流中的框架。它便于将文本输入与现有框架集成，生成包含正面和负面文本情感的新框架。该节点在通过系统塑造数据的叙述流程中发挥关键作用，通过结合和对比不同的文本视角。

# Input types
## Required
- frame
    - ‘frame’参数至关重要，因为它标识了节点将操作的数据结构中的具体框架。它确保了正确框架被定位以进行操作或数据检索，从而维护了数据流的完整性和顺序。
    - Comfy dtype: INT
    - Python dtype: int
- previous_frame
    - ‘previous_frame’参数是必需的，因为它提供了前一个框架的上下文，节点用它来构建。这是一个强制性输入，确保了框架创建过程中的连续性和一致性。
    - Comfy dtype: FIZZFRAME
    - Python dtype: NodeFrame
- positive_text
    - ‘positive_text’参数是引入正面情感至框架创建过程中的关键元素。它允许表达乐观或肯定的观点，以建设性的角度丰富叙述。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- negative_text
    - ‘negative_text’参数虽然是可选的，但它用于引入对比观点到框架中，通过在正面情感旁边包含潜在的批评或缺点，提供一种平衡的视角。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- FIZZFRAME
    - 输出 'FIZZFRAME' 表示新创建的框架，它包含了集成的正面和负面文本情感。这是一个重要的输出，因为它为后续的数据处理和分析奠定了基础。
    - Comfy dtype: FIZZFRAME
    - Python dtype: NodeFrame
- CONDITIONING
    - ‘CONDITIONING’输出提供了正面和负面文本的编码表示，这对于系统内进一步处理至关重要。这些调节输出允许根据文本输入对数据进行操作和细化。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Union[torch.Tensor, Dict[str, torch.Tensor]]]

# Usage tips
- Infra type: CPU

# Source code
```
class NodeFrame:

    def __init__(self):
        self.frames = {}
        self.thisFrame = {}

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'frame': ('INT', {'default': 0, 'min': 0}), 'previous_frame': ('FIZZFRAME', {'forceInput': True}), 'positive_text': ('STRING', {'multiline': True})}, 'optional': {'negative_text': ('STRING', {'multiline': True})}}
    RETURN_TYPES = ('FIZZFRAME', 'CONDITIONING', 'CONDITIONING')
    FUNCTION = 'create_frame'
    CATEGORY = 'FizzNodes 📅🅕🅝/FrameNodes'

    def create_frame(self, frame, previous_frame, positive_text, negative_text=None):
        self.frames = previous_frame.frames
        prev_frame = previous_frame.thisFrame
        new_positive_text = f"{positive_text}, {prev_frame['general_positive']}"
        new_negative_text = f"{negative_text}, {prev_frame['general_negative']}"
        pos_tokens = prev_frame['clip'].tokenize(new_positive_text)
        (pos_cond, pos_pooled) = prev_frame['clip'].encode_from_tokens(pos_tokens, return_pooled=True)
        neg_tokens = prev_frame['clip'].tokenize(new_negative_text)
        (neg_cond, neg_pooled) = prev_frame['clip'].encode_from_tokens(neg_tokens, return_pooled=True)
        new_frame = {'positive_text': positive_text, 'negative_text': negative_text, 'general_positive': prev_frame['general_positive'], 'general_negative': prev_frame['general_negative'], 'clip': prev_frame['clip'], 'pos_conditioning': {'cond': pos_cond, 'pooled': pos_pooled}, 'neg_conditioning': {'cond': neg_cond, 'pooled': neg_pooled}}
        self.thisFrame = new_frame
        self.frames[frame] = new_frame
        return (self, [[pos_cond, {'pooled_output': pos_pooled}]], [[neg_cond, {'pooled_output': neg_pooled}]])
```