# Documentation
- Class name: Canvas_Tab
- Category: image
- Output node: False
- Repo Ref: https://github.com/Lerc/canvas_tab.git

Canvas_Tab 作为一个中介，处理和加工在一个单独标签页环境中的视觉内容数据。

# Input types
## Required
- unique_id
    - 图像缓冲区实例的唯一标识符，对于在不同标签页或会话中管理和关联图像数据至关重要。
    - Comfy dtype: str
    - Python dtype: str
- mask
    - 掩码参数对于定义图像中的兴趣区域至关重要，使得能够进行选择性处理和分析。
    - Comfy dtype: str
    - Python dtype: str
- canvas
    - 画布参数代表源图像，它是所有图像操作和编辑操作的基础。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- images
    - 可选的图像集合，可用于比较或额外处理，增强图像缓冲区的多功能性。
    - Comfy dtype: list
    - Python dtype: list

# Output types
- rgb_image
    - 处理后的RGB格式图像数据，准备进行进一步的分析或操作。
    - Comfy dtype: tensor
    - Python dtype: torch.Tensor
- mask_data
    - 提取的掩码数据代表兴趣区域，对于目标图像分析和编辑至关重要。
    - Comfy dtype: tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class Canvas_Tab:
    """
    A Image Buffer for handling an editor in another tab.
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('CANVAS',), 'canvas': ('CANVAS',)}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'image_buffer'
    CATEGORY = 'image'

    def image_buffer(self, unique_id, mask, canvas, images=None):
        print(f'-----hyn debug image_buffer : unique_id = {unique_id} canvas = {canvas} images = {images} masks = {mask}')
        if canvas.startswith('http'):
            from worker.components.utils import util
            i = util.get_image_from_uri(canvas)
        else:
            image_path = folder_paths.get_annotated_filepath(canvas)
            i = Image.open(image_path)
        i = ImageOps.exif_transpose(i)
        rgb_image = i.convert('RGB')
        rgb_image = np.array(rgb_image).astype(np.float32) / 255.0
        rgb_image = torch.from_numpy(rgb_image)[None,]
        if mask.startswith('http'):
            from worker.components.utils import util
            i = util.get_image_from_uri(mask)
        else:
            mask_path = folder_paths.get_annotated_filepath(mask)
            i = Image.open(mask_path)
        i = ImageOps.exif_transpose(i)
        if 'A' in i.getbands():
            mask_data = np.array(i.getchannel('A')).astype(np.float32) / 255.0
            mask_data = torch.from_numpy(mask_data)
        else:
            mask_data = torch.zeros((64, 64), dtype=torch.float32, device='cpu')
        return (rgb_image, mask_data)
```