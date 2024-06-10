# Documentation
- Class name: CR_ImagePipeIn
- Category: Comfyroll/Pipe/Image
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ImagePipeIn 节点旨在促进图像输入到数据管道的过程。它在准备图像数据以供后续处理阶段使用方面扮演着关键角色，确保图像根据指定的参数正确格式化和缩放。

# Input types
## Optional
- image
    - 图像参数对于节点至关重要，因为它定义了将被处理的输入图像。这是节点操作的主要数据源，影响后续步骤的执行方式。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, bytes, Image.Image]
- width
    - 宽度参数指定了处理后图像的期望宽度。它对于控制输出图像的尺寸并在也指定高度时保持纵横比很重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置处理后图像的期望高度。它与宽度参数一起工作，以确定图像的最终大小。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_factor
    - upscale_factor 参数用于提高图像的分辨率。在放大过程中，它对于提高图像质量而不丢失重要细节具有重要意义。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- pipe
    - pipe 输出是一个结构化数据类型，它封装了处理后的图像及其相关参数。它作为图像数据传递到管道下一阶段的通道。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Tuple[Any, int, int, float]
- show_help
    - show_help 输出提供了一个文档的URL链接，以供进一步帮助。对于寻求有关节点功能和用法的更多信息的用户来说，它特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ImagePipeIn:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}, 'optional': {'image': ('IMAGE',), 'width': ('INT', {'default': 512, 'min': 64, 'max': 2048}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 2048}), 'upscale_factor': ('FLOAT', {'default': 1, 'min': 1, 'max': 2000})}}
    RETURN_TYPES = ('PIPE_LINE', 'STRING')
    RETURN_NAMES = ('pipe', 'show_help')
    FUNCTION = 'pipe_in'
    CATEGORY = icons.get('Comfyroll/Pipe/Image')

    def pipe_in(self, image=0, width=0, height=0, upscale_factor=0):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-image-pipe-in'
        pipe_line = (image, width, height, upscale_factor)
        return (pipe_line, show_help)
```