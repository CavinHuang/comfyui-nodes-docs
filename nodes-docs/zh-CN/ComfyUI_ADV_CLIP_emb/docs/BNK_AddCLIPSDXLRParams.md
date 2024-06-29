# Documentation
- Class name: AddCLIPSDXLRParams
- Category: conditioning/advanced
- Output node: False
- Repo Ref: https://github.com/BlenderNeko/ComfyUI_ADV_CLIP_emb

AddCLIPSDXLRParams节点旨在为高级编码任务增强输入条件数据。它接收条件数据，并将指定的尺寸和审美分数应用于每个元素，为后续处理做准备。

# Input types
## Required
- conditioning
    - conditioning参数对于提供将由节点转换的初始数据至关重要。它是决定节点后续处理和输出的核心输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Any]
- width
    - width参数指定要应用于条件数据中每个元素的宽度尺寸。它在确定编码数据的分辨率中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: float
- height
    - height参数为条件数据中的元素设置高度尺寸。它对于控制编码输出的垂直分辨率很重要。
    - Comfy dtype: INT
    - Python dtype: float
- ascore
    - aesthetic_score参数为每个元素分配一个审美值，这可以根据所需的审美标准影响编码过程。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- conditioning
    - 输出的conditioning是输入的转换版本，现在配备了指定的尺寸和审美分数，准备进行高级编码。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Any]

# Usage tips
- Infra type: CPU

# Source code
```
class AddCLIPSDXLRParams:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning': ('CONDITIONING',), 'width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'ascore': ('FLOAT', {'default': 6.0, 'min': 0.0, 'max': 1000.0, 'step': 0.01})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'encode'
    CATEGORY = 'conditioning/advanced'

    def encode(self, conditioning, width, height, ascore):
        c = []
        for t in conditioning:
            n = [t[0], t[1].copy()]
            n[1]['width'] = width
            n[1]['height'] = height
            n[1]['aesthetic_score'] = ascore
            c.append(n)
        return (c,)
```