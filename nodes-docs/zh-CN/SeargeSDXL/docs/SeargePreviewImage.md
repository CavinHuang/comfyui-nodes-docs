# Documentation
- Class name: SeargePreviewImage
- Category: UI
- Output node: True
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点通过将图像保存在临时目录中来便利图像预览，允许用户可视化图像处理任务的输出，而不影响主要工作流程。

# Input types
## Required
- enabled
    - 该参数控制是否激活图像预览功能，决定节点是否继续进行图像保存过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- images
    - 要预览和保存的输入图像；它们是节点操作的主要对象。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- prompt
    - 与图像相关联的可选文本描述，可用于为图像预览提供上下文或其他信息。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - 可以嵌入到保存的图像中的附加元数据，增强每个图像文件可用的信息。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, str]

# Output types
- images
    - 作为输入提供的原始图像，现在伴随着预览功能，允许在UI中进行可视化。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class SeargePreviewImage(nodes.SaveImage):

    def __init__(self):
        super().__init__()
        self.output_dir = folder_paths.get_temp_directory()
        self.type = 'temp'
        self.prefix_append = '_temp_' + ''.join((random.choice('abcdefghijklmnopqrstupvxyz') for _ in range(5)))

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'enabled': ('BOOLEAN', {'default': True})}, 'optional': {'images': ('IMAGE',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('images',)
    FUNCTION = 'preview_images'
    CATEGORY = UI.CATEGORY_UI

    def preview_images(self, enabled, images=None, prompt=None, extra_pnginfo=None):
        if images is None or not enabled:
            return {'result': (images,), 'ui': {'images': list()}}
        saved_images = nodes.SaveImage.save_images(self, images, 'srg_sdxl_preview', prompt, extra_pnginfo)
        saved_images['result'] = (images,)
        return saved_images
```