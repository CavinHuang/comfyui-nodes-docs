# Documentation
- Class name: CLIPVisionEncode
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

将图像的视觉信息编码成适合于文本-图像匹配或图像分类等下游任务的格式。该节点抽象了底层模型架构的复杂性，专注于将原始图像数据转换为语义丰富的表示。

# Input types
## Required
- clip_vision
    - 用于编码图像的CLIP视觉模型。它在节点的操作中起着关键作用，提供图像编码所需的模型架构和参数。
    - Comfy dtype: CLIP_VISION
    - Python dtype: torch.nn.Module
- image
    - 要编码的输入图像。它是节点执行的关键，因为它是将被转换成语义表示的原始数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- CLIP_VISION_OUTPUT
    - CLIP视觉模型的编码输出，包括最后隐藏状态、图像嵌入和倒数第二个隐藏状态。这个输出很重要，因为它为各种应用中的进一步分析或处理提供了基础。
    - Comfy dtype: CLIP_VISION_OUTPUT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class CLIPVisionEncode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip_vision': ('CLIP_VISION',), 'image': ('IMAGE',)}}
    RETURN_TYPES = ('CLIP_VISION_OUTPUT',)
    FUNCTION = 'encode'
    CATEGORY = 'conditioning'

    def encode(self, clip_vision, image):
        output = clip_vision.encode_image(image)
        return (output,)
```