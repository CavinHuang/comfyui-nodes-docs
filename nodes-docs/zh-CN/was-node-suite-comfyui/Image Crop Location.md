# Documentation
- Class name: WAS_Image_Crop_Location
- Category: WAS Suite/Image/Process
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法 `image_crop_location` 旨在根据指定的坐标对图像进行精确裁剪。它允许通过定义顶部、左侧、右侧和底部边界来选择图像中的矩形区域。此方法对于聚焦图像内的兴趣区域至关重要，可能通过集中于相关视觉内容，增强后续图像处理任务。

# Input types
## Required
- image
    - 输入图像是节点操作的主要数据对象。它对节点的功能至关重要，因为整个操作都围绕着对这张图像进行操作。图像参数直接影响节点的执行和最终产生的裁剪图像。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
## Optional
- top
    - 参数 'top' 指定裁剪操作的垂直起始点。它很重要，因为它决定了裁剪区域的上边界。此参数与 'bottom' 配合使用，定义了裁剪的高度。
    - Comfy dtype: INT
    - Python dtype: int
- left
    - 参数 'left' 设置裁剪的横向起始点。它很重要，因为它建立了要裁剪区域的左边界。与 'right' 一起，它有助于确定最终裁剪部分的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- right
    - 参数 'right' 定义裁剪的横向结束点。它对于通过计算 'right' 和 'left' 之间的差异来确定裁剪的宽度至关重要。它确保在裁剪后的图像中保持正确的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- bottom
    - 参数 'bottom' 指示裁剪的垂直结束点。它至关重要，因为它设置了裁剪的下边界。与 'top' 一起，它决定了裁剪区域的垂直范围。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- cropped_image
    - 输出 'cropped_image' 是裁剪操作的结果。它代表了输入图像中位于指定边界内的区域。这个输出很重要，因为它是节点功能的主要产出，提供了图像内容的聚焦视图。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- crop_data
    - 输出 'crop_data' 提供了有关裁剪操作的元数据，包括裁剪图像的大小和裁剪区域的坐标。这些信息对于理解裁剪的具体细节很有价值，并且可以用于进一步的处理或分析。
    - Comfy dtype: CROP_DATA
    - Python dtype: Tuple[int, Tuple[int, int, int, int]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Crop_Location:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'top': ('INT', {'default': 0, 'max': 10000000, 'min': 0, 'step': 1}), 'left': ('INT', {'default': 0, 'max': 10000000, 'min': 0, 'step': 1}), 'right': ('INT', {'default': 256, 'max': 10000000, 'min': 0, 'step': 1}), 'bottom': ('INT', {'default': 256, 'max': 10000000, 'min': 0, 'step': 1})}}
    RETURN_TYPES = ('IMAGE', 'CROP_DATA')
    FUNCTION = 'image_crop_location'
    CATEGORY = 'WAS Suite/Image/Process'

    def image_crop_location(self, image, top=0, left=0, right=256, bottom=256):
        image = tensor2pil(image)
        (img_width, img_height) = image.size
        crop_top = max(top, 0)
        crop_left = max(left, 0)
        crop_bottom = min(bottom, img_height)
        crop_right = min(right, img_width)
        crop_width = crop_right - crop_left
        crop_height = crop_bottom - crop_top
        if crop_width <= 0 or crop_height <= 0:
            raise ValueError('Invalid crop dimensions. Please check the values for top, left, right, and bottom.')
        crop = image.crop((crop_left, crop_top, crop_right, crop_bottom))
        crop_data = (crop.size, (crop_left, crop_top, crop_right, crop_bottom))
        crop = crop.resize((crop.size[0] // 8 * 8, crop.size[1] // 8 * 8))
        return (pil2tensor(crop), crop_data)
```