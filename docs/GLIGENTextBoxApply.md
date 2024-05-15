# Documentation
- Class name: GLIGENTextBoxApply
- Category: conditioning/gligen
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

GLIGENTextBoxApply节点旨在将基于文本的条件添加到现有的条件集中。它处理输入文本，将其与给定模型集成，允许在图形或数据驱动的上下文中操作基于文本的元素。

# Input types
## Required
- conditioning_to
    - conditioning_to参数至关重要，因为它定义了将附加基于文本条件的目标。它在确定文本应用的上下文方面起着关键作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Any]
- clip
    - clip参数是必需的，用于将文本编码为模型可以处理的格式。它对于将文本信息转换为进一步分析的合适表示至关重要。
    - Comfy dtype: CLIP
    - Python dtype: Dict[str, Any]
- gligen_textbox_model
    - gligen_textbox_model参数对于应用文本条件是必要的。它负责处理特定于模型的逻辑，该逻辑管理文本如何集成到条件集中。
    - Comfy dtype: GLIGEN
    - Python dtype: torch.nn.Module
- text
    - text参数是节点的核心输入，包含将被处理并作为条件附加的文本信息。它是节点操作的主要数据源。
    - Comfy dtype: STRING
    - Python dtype: str
- width
    - width参数指定文本应用的宽度尺寸，这对于定义文本在条件集中的空间上下文很重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - height参数定义了文本应用的高度尺寸，在建立文本在条件框架中的垂直上下文方面起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- x
    - x参数决定了文本在条件集中应用的水平位置，影响基于文本的条件的总体布局。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - y参数设置了文本应用的垂直位置，这对于文本在条件框架内的精确放置至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- conditioning
    - 输出的conditioning参数代表了现在包含基于文本元素的更新条件集。它很重要，因为它反映了节点操作所做的更改。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Any]

# Usage tips
- Infra type: CPU

# Source code
```
class GLIGENTextBoxApply:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning_to': ('CONDITIONING',), 'clip': ('CLIP',), 'gligen_textbox_model': ('GLIGEN',), 'text': ('STRING', {'multiline': True, 'dynamicPrompts': True}), 'width': ('INT', {'default': 64, 'min': 8, 'max': MAX_RESOLUTION, 'step': 8}), 'height': ('INT', {'default': 64, 'min': 8, 'max': MAX_RESOLUTION, 'step': 8}), 'x': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'y': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'append'
    CATEGORY = 'conditioning/gligen'

    def append(self, conditioning_to, clip, gligen_textbox_model, text, width, height, x, y):
        c = []
        (cond, cond_pooled) = clip.encode_from_tokens(clip.tokenize(text), return_pooled='unprojected')
        for t in conditioning_to:
            n = [t[0], t[1].copy()]
            position_params = [(cond_pooled, height // 8, width // 8, y // 8, x // 8)]
            prev = []
            if 'gligen' in n[1]:
                prev = n[1]['gligen'][2]
            n[1]['gligen'] = ('position', gligen_textbox_model, prev + position_params)
            c.append(n)
        return (c,)
```