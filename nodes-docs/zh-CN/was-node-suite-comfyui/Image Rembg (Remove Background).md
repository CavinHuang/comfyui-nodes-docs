# Documentation
- Class name: WAS_Remove_Rembg
- Category: WAS Suite/Image/AI
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Remove_Rembg 节点旨在使用先进的 AI 算法无缝去除图像的背景。它专注于提供一种干净高效的方式来隔离主题和背景，增强图像在各种应用中的可用性，如平面设计、内容创作等。

# Input types
## Required
- images
    - ‘images’参数至关重要，因为它定义了将要移除背景的输入图像。这些图像的质量和分辨率直接影响节点的输出，决定了主题分离的清晰度和精确度。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image.Image]
## Optional
- transparency
    - ‘transparency’参数决定在移除背景后是否应该使背景变得透明。这对于将要叠加在其他图形或背景上的图像特别有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- model
    - ‘model’参数用于选择用于背景移除的 AI 模型。不同的模型可能提供不同程度的细节和准确性，因此这个选择对于实现期望的结果至关重要。
    - Comfy dtype: COMBO[u2net, u2netp, u2net_human_seg, silueta, isnet-general-use, isnet-anime]
    - Python dtype: str
- post_processing
    - 启用‘post_processing’时，对输出应用额外的图像增强，可能提高最终结果的视觉吸引力。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- only_mask
    - 当设置为 true 时，‘only_mask’参数只返回遮罩，而不将背景移除过程应用于原始图像。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- alpha_matting
    - ‘alpha_matting’参数激活 alpha matting 技术，以细化遮罩的边缘，使其看起来更自然。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- alpha_matting_foreground_threshold
    - 这个参数以及与 alpha matting 相关的其他参数，微调了遮罩的边缘检测。它决定了被认为是前景的阈值。
    - Comfy dtype: INT
    - Python dtype: int
- alpha_matting_background_threshold
    - 它与前景阈值一起工作，定义了 alpha matting 过程中什么构成了背景。
    - Comfy dtype: INT
    - Python dtype: int
- alpha_matting_erode_size
    - ‘alpha_matting_erode_size’参数控制应用于遮罩的腐蚀效果的大小，这有助于细化遮罩的边缘。
    - Comfy dtype: INT
    - Python dtype: int
- background_color
    - ‘background_color’参数允许用户指定一个纯色，用作移除原始背景后的新的背景。
    - Comfy dtype: COMBO[none, black, white, magenta, chroma green, chroma blue]
    - Python dtype: str

# Output types
- images
    - ‘images’输出参数代表处理过的图像，其中背景已被移除。它是节点操作的成果，对于使用这些图像的下游任务来说非常重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Remove_Rembg:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'transparency': ('BOOLEAN', {'default': True}), 'model': (['u2net', 'u2netp', 'u2net_human_seg', 'silueta', 'isnet-general-use', 'isnet-anime'],), 'post_processing': ('BOOLEAN', {'default': False}), 'only_mask': ('BOOLEAN', {'default': False}), 'alpha_matting': ('BOOLEAN', {'default': False}), 'alpha_matting_foreground_threshold': ('INT', {'default': 240, 'min': 0, 'max': 255}), 'alpha_matting_background_threshold': ('INT', {'default': 10, 'min': 0, 'max': 255}), 'alpha_matting_erode_size': ('INT', {'default': 10, 'min': 0, 'max': 255}), 'background_color': (['none', 'black', 'white', 'magenta', 'chroma green', 'chroma blue'],)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('images',)
    FUNCTION = 'image_rembg'
    CATEGORY = 'WAS Suite/Image/AI'

    def __convertToBool(self, x):
        if type(x) == str:
            x = x.strip()
            if x.lower() == 'false' or x.lower() == 'none' or x == '0' or (x == '0.0') or (x == '0j') or (x == "''") or (x == '""') or (x == '()') or (x == '[]') or (x == '{}') or (x.lower() == 'decimal(0)') or (x.lower() == 'fraction(0,1)') or (x.lower() == 'set()') or (x.lower() == 'range(0)'):
                return False
            else:
                return True
        return bool(x)

    def image_rembg(self, images, transparency=True, model='u2net', alpha_matting=False, alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=10, alpha_matting_erode_size=10, post_processing=False, only_mask=False, background_color='none'):
        transparency = transparency if type(transparency) is bool else self.__convertToBool(transparency)
        alpha_matting = alpha_matting if type(alpha_matting) is bool else self.__convertToBool(alpha_matting)
        post_processing = post_processing if type(post_processing) is bool else self.__convertToBool(post_processing)
        only_mask = only_mask if type(only_mask) is bool else self.__convertToBool(only_mask)
        if 'rembg' not in packages():
            install_package('rembg')
        from rembg import remove, new_session
        os.environ['U2NET_HOME'] = os.path.join(MODELS_DIR, 'rembg')
        os.makedirs(os.environ['U2NET_HOME'], exist_ok=True)
        bgrgba = None
        if background_color == 'black':
            bgrgba = [0, 0, 0, 255]
        elif background_color == 'white':
            bgrgba = [255, 255, 255, 255]
        elif background_color == 'magenta':
            bgrgba = [255, 0, 255, 255]
        elif background_color == 'chroma green':
            bgrgba = [0, 177, 64, 255]
        elif background_color == 'chroma blue':
            bgrgba = [0, 71, 187, 255]
        else:
            bgrgba = None
        if transparency and bgrgba is not None:
            bgrgba[3] = 0
        batch_tensor = []
        for image in images:
            image = tensor2pil(image)
            batch_tensor.append(pil2tensor(remove(image, session=new_session(model), post_process_mask=post_processing, alpha_matting=alpha_matting, alpha_matting_foreground_threshold=alpha_matting_foreground_threshold, alpha_matting_background_threshold=alpha_matting_background_threshold, alpha_matting_erode_size=alpha_matting_erode_size, only_mask=only_mask, bgcolor=bgrgba).convert('RGBA' if transparency else 'RGB')))
        batch_tensor = torch.cat(batch_tensor, dim=0)
        return (batch_tensor,)
```