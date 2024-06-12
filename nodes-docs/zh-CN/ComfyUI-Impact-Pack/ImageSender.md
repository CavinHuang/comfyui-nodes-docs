# Documentation
- Class name: ImageSender
- Category: ImpactPack/Util
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImageSender节点旨在方便图像数据的传输。它处理一系列图像，为它们的文件名分配前缀，并将它们发送到指定的服务器端点。此节点在工作流程中扮演着关键角色，通过实现系统间视觉内容的无缝交换。

# Input types
## Required
- images
    - 'image'参数对于ImageSender节点至关重要，因为它代表了要被处理和传输的视觉数据集合。其适当的选择和格式直接影响节点执行任务的能力。
    - Comfy dtype: IMAGE
    - Python dtype: List[bytes]
## Optional
- filename_prefix
    - 使用'filename_prefix'参数为正在处理的图像的文件名定义一个共同的前缀。这有助于在接收系统中以系统化的方式组织和识别图像。
    - Comfy dtype: STRING
    - Python dtype: str
- link_id
    - 'link_id'参数是一个标识符，用于将图像与接收系统中的特定链接或上下文关联起来。它有助于图像数据的目标化传递和引用。
    - Comfy dtype: INT
    - Python dtype: int
- prompt
    - 'prompt'参数虽然是可选的，但可以用来为图像处理提供额外的上下文或指令。它通过允许对图像处理进行更细微的控制，增强了节点的功能。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - 'extra_pnginfo'参数允许在PNG图像中包含额外的元数据或信息。这对于用接收系统可能需要的额外细节增强图像数据非常有用。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, Any]

# Output types
- result
    - ImageSender节点的'result'输出包含了图像传输过程的结果。它包括了已发送的图像和任何相关的元数据，提供了节点操作的全面概述。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class ImageSender(nodes.PreviewImage):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'filename_prefix': ('STRING', {'default': 'ImgSender'}), 'link_id': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    OUTPUT_NODE = True
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, images, filename_prefix='ImgSender', link_id=0, prompt=None, extra_pnginfo=None):
        result = nodes.PreviewImage().save_images(images, filename_prefix, prompt, extra_pnginfo)
        PromptServer.instance.send_sync('img-send', {'link_id': link_id, 'images': result['ui']['images']})
        return result
```