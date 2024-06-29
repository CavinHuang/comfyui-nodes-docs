# Documentation
- Class name: CR_ImagePipeOut
- Category: Comfyroll/Pipe/Image
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ImagePipeOut节点旨在促进流水线架构中图像数据的输出过程。它在图像处理工作流的最后阶段扮演着关键角色，确保图像数据正确地从系统中流出。该节点擅长处理图像数据从处理流水线到输出接口的过渡，为图像数据传播提供了一个无缝集成点。

# Input types
## Required
- pipe
    - ‘pipe’参数对于CR_ImagePipeOut节点至关重要，因为它代表了携带要输出的图像数据的流水线。正是通过这个参数，节点接收图像信息，然后将其处理为输出。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Tuple[str, int, int, float]

# Output types
- pipe
    - ‘pipe’输出参数表示图像数据处理完毕并准备好输出后流水线的延续。它维护了数据流的完整性，并确保后续流程可以顺利进行。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Tuple[str, int, int, float]
- image
    - ‘image’输出参数是由CR_ImagePipeOut节点输出的处理后的图像。它代表了图像处理流水线的成果，并且是呈现给最终用户或后续系统最终产品。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- width
    - ‘width’输出参数提供了输出图像的宽度，以像素为单位。这个信息对于理解图像的尺寸以及任何进一步的图像操作或显示目的至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’输出参数指示输出图像的高度，以像素为单位。它与宽度一起定义了图像的整体大小，对于正确的图像展示至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_factor
    - ‘upscale_factor’输出参数代表了在处理过程中应用于图像的缩放因子。它是图像质量评估的重要指标，并且可以影响后续图像处理决策。
    - Comfy dtype: FLOAT
    - Python dtype: float
- show_help
    - ‘show_help’输出参数提供了与CR_ImagePipeOut节点相关联的文档或帮助页面的URL链接。它作为用户寻求有关使用该节点的更多信息或帮助的快速参考。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ImagePipeOut:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pipe': ('PIPE_LINE',)}}
    RETURN_TYPES = ('PIPE_LINE', 'IMAGE', 'INT', 'INT', 'FLOAT', 'STRING')
    RETURN_NAMES = ('pipe', 'image', 'width', 'height', 'upscale_factor', 'show_help')
    FUNCTION = 'pipe_out'
    CATEGORY = icons.get('Comfyroll/Pipe/Image')

    def pipe_out(self, pipe):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-image-pipe-out'
        (image, width, height, upscale_factor) = pipe
        return (pipe, image, width, height, upscale_factor, show_help)
```