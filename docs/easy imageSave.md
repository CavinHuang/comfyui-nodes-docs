# Documentation
- Class name: imageSaveSimple
- Category: EasyUse/Image
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点简化了图像数据的保存过程，提供了一种直接保存视觉输出的机制。它支持可选的图像压缩和预览生成，确保图像能够方便地用于后续使用或检查。

# Input types
## Required
- images
    - images参数是必需的，因为它携带了需要保存的视觉数据。它通过决定存储的内容和输出的外观来影响整个操作。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
## Optional
- filename_prefix
    - filename_prefix用于预定义保存图像的命名约定，这对于在输出目录中组织和识别文件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- only_preview
    - only_preview参数控制是否生成并保存图像的预览。它通过决定生成的输出类型来影响节点的操作。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- None
    - 这个节点的输出不是一个数据对象，而是保存图像的动作。没有返回值表示保存过程已经完成。
    - Comfy dtype: None
    - Python dtype: None

# Usage tips
- Infra type: CPU

# Source code
```
class imageSaveSimple:

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = 'output'
        self.prefix_append = ''
        self.compress_level = 4

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'filename_prefix': ('STRING', {'default': 'ComfyUI'}), 'only_preview': ('BOOLEAN', {'default': False})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'save'
    OUTPUT_NODE = True
    CATEGORY = 'EasyUse/Image'

    def save(self, images, filename_prefix='ComfyUI', only_preview=False, prompt=None, extra_pnginfo=None):
        if only_preview:
            PreviewImage().save_images(images, filename_prefix, prompt, extra_pnginfo)
            return ()
        else:
            return SaveImage().save_images(images, filename_prefix, prompt, extra_pnginfo)
```