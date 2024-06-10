# Documentation
- Class name: CLIPTextEncodeSDXLRefiner
- Category: advanced/conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CLIPTextEncodeSDXLRefiner节点旨在使用CLIP模型对文本输入进行细化和编码，该模型擅长从文本描述中理解和生成视觉表示。它在调节过程中发挥关键作用，通过整合审美分数、尺寸和文本信息来产生一个全面的调节信号，可以指导后续的图像合成或处理阶段。

# Input types
## Required
- ascore
    - 审美分数参数对于量化生成内容的视觉吸引力至关重要。它通过在最终调节信号中加权审美的重要性，影响编码过程，从而影响输出的审美质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- width
    - 宽度参数指定了输出图像的期望宽度。它是确定分辨率的关键因素，在编码文本在合成图像中的视觉表现方式中起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置输出图像的垂直尺寸。与宽度一起，它定义了整体分辨率，这对于正确缩放和展示编码内容至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- text
    - 文本参数是节点的主要输入，包含将被编码成视觉表示的文本描述。它是节点功能的核心，因为文本的质量和细节直接影响生成的编码信号。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - CLIP参数代表用于文本编码的模型。它至关重要，因为它提供了将文本转换为可用于图像合成中调节的格式的基本机制。
    - Comfy dtype: CLIP
    - Python dtype: CLIP model instance

# Output types
- CONDITIONING
    - 调节输出是一个多方面的信号，它包含了编码文本、审美分数和尺寸。它作为后续图像处理任务的指导，确保生成的内容与初始文本输入一致。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[torch.Tensor, Dict[str, Union[torch.Tensor, float, int]]]

# Usage tips
- Infra type: GPU

# Source code
```
class CLIPTextEncodeSDXLRefiner:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ascore': ('FLOAT', {'default': 6.0, 'min': 0.0, 'max': 1000.0, 'step': 0.01}), 'width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'text': ('STRING', {'multiline': True, 'dynamicPrompts': True}), 'clip': ('CLIP',)}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'encode'
    CATEGORY = 'advanced/conditioning'

    def encode(self, clip, ascore, width, height, text):
        tokens = clip.tokenize(text)
        (cond, pooled) = clip.encode_from_tokens(tokens, return_pooled=True)
        return ([[cond, {'pooled_output': pooled, 'aesthetic_score': ascore, 'width': width, 'height': height}]],)
```