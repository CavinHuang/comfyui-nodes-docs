# Documentation
- Class name: CR_ImagePipeEdit
- Category: Comfyroll/Pipe/Image
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ImagePipeEdit 节点旨在管道结构内便于编辑和增强图像数据。它允许用户修改图像的属性，如宽度、高度和放大因子，确保输出图像满足所需的规格。该节点在图像处理工作流中扮演关键角色，允许微调视觉内容，而不会破坏整体管道的完整性。

# Input types
## Required
- pipe
    - ‘pipe’参数是必需的，因为它代表了将由节点编辑的图像管道。这是一个关键输入，它决定了所有后续图像修改和处理的起点。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Tuple[str, int, int, float]
## Optional
- image
    - 可选的‘image’参数允许用户替换管道中的当前图像。当需要特定图像内容进行进一步处理或分析时，它特别有用。
    - Comfy dtype: IMAGE
    - Python dtype: str
- width
    - ‘width’参数用于指定图像的新宽度。它是一个可选输入，可以根据不同显示或输出介质的要求进行调整。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’参数决定了图像的新高度。与宽度类似，它是可选的，并且可以设置以实现所需的纵横比或适应特定的展示需求。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_factor
    - ‘upscale_factor’参数是可选的，定义了图像放大的缩放因子。对于在不损害原始分辨率的情况下增强图像质量，它尤其重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- pipe
    - ‘pipe’输出代表了修改后的图像管道，包括更新后的图像及其属性，如宽度、高度和放大因子。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Tuple[str, int, int, float]
- show_help
    - ‘show_help’输出提供了一个链接到文档页面的URL，以获取有关节点使用的进一步帮助或信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ImagePipeEdit:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pipe': ('PIPE_LINE',)}, 'optional': {'image': ('IMAGE',), 'width': ('INT', {'default': 512, 'min': 64, 'max': 2048, 'forceInput': True}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 2048, 'forceInput': True}), 'upscale_factor': ('FLOAT', {'default': 1, 'min': 1, 'max': 2000, 'forceInput': True})}}
    RETURN_TYPES = ('PIPE_LINE', 'STRING')
    RETURN_NAMES = ('pipe', 'show_help')
    FUNCTION = 'pipe_edit'
    CATEGORY = icons.get('Comfyroll/Pipe/Image')

    def pipe_edit(self, pipe, image=None, width=None, height=None, upscale_factor=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-image-pipe-edit'
        (new_image, new_width, new_height, new_upscale_factor) = pipe
        if image is not None:
            new_image = image
        if width is not None:
            new_width = width
        if height is not None:
            new_height = height
        if upscale_factor is not None:
            new_upscale_factor = upscale_factor
        pipe = (new_image, new_width, new_height, new_upscale_factor)
        return (pipe, show_help)
```