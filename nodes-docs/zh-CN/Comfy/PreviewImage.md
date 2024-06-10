# Documentation
- Class name: PreviewImage
- Category: Image Processing
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

PreviewImage节点旨在促进图像数据的预览和处理。它生成用于显示或进一步处理的临时图像，确保图像被有效管理和存储。该节点的主要目标是通过提供无缝的图像预览接口，来简化图像处理任务的工作流程。

# Input types
## Required
- images
    - ‘images’参数对于PreviewImage节点至关重要，因为它作为需要预览的图像数据的输入。它直接影响节点的操作，通过决定将被处理和显示的内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- prompt
    - ‘prompt’参数虽然是可选的，但可以用来提供额外的上下文或指令，指导PreviewImage节点内图像数据的处理。它可以通过允许对图像预览过程进行更精细的控制来增强功能。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - ‘extra_pnginfo’参数是一个可选输入，可以包含与PNG图像格式相关的额外信息。这可以包括元数据或其他对正确解释和显示图像很重要的细节。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, Any]

# Output types
- preview_image
    - ‘preview_image’输出提供了处理后的预览图像数据。它是PreviewImage节点功能的关键要素，代表了图像预览过程的最终结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class PreviewImage(SaveImage):

    def __init__(self):
        self.output_dir = folder_paths.get_temp_directory()
        self.type = 'temp'
        self.prefix_append = '_temp_' + ''.join((random.choice('abcdefghijklmnopqrstupvxyz') for x in range(5)))
        self.compress_level = 1

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
```