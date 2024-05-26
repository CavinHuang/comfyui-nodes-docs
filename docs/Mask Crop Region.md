# Documentation
- Class name: WAS_Mask_Crop_Region
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Mask_Crop_Region 节点旨在通过识别和裁剪掩码内的区域来处理图像。它使用填充和区域类型参数来控制裁剪行为，确保结果图像段可以无缝集成，以用于游戏开发或3D建模等应用。该节点在图像预处理中发挥着至关重要的作用，以便获得更加量身定制和视觉上连贯的结果。

# Input types
## Required
- mask
    - 掩码参数是一个二进制图像数组，它定义了要从原始图像中裁剪的区域。它对节点的操作至关重要，因为它直接影响选择哪些图像部分进行裁剪。
    - Comfy dtype: np.ndarray
    - Python dtype: numpy.ndarray
## Optional
- padding
    - 填充参数在裁剪区域周围添加边框，这有助于平滑边缘或保留对图像上下文重要的内容。
    - Comfy dtype: int
    - Python dtype: int
- region_type
    - region_type 参数确定裁剪策略：是关注掩码内的主要区域还是次要区域。这影响裁剪图像的最终构图。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- cropped_mask
    - cropped_mask 输出是掩码中结果裁剪区域的张量表示。它标志着图像内所需区域的成功隔离。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- crop_data
    - crop_data 输出提供了有关裁剪区域的尺寸和位置的详细信息，这对于进一步的图像处理或分析至关重要。
    - Comfy dtype: Tuple[int, Tuple[int, int, int, int]]
    - Python dtype: Tuple[int, Tuple[int, int, int, int]]
- top_int
    - top_int 输出表示裁剪区域从图像顶部的垂直位置。
    - Comfy dtype: int
    - Python dtype: int
- left_int
    - left_int 输出表示裁剪区域从图像左侧的水平位置。
    - Comfy dtype: int
    - Python dtype: int
- right_int
    - right_int 输出指定裁剪区域右侧边缘在图像内的水平位置。
    - Comfy dtype: int
    - Python dtype: int
- bottom_int
    - bottom_int 输出表示裁剪区域底部边缘在图像内的垂直位置。
    - Comfy dtype: int
    - Python dtype: int
- width_int
    - width_int 输出提供裁剪区域的宽度，这对于调整图像段的大小或定位很重要。
    - Comfy dtype: int
    - Python dtype: int
- height_int
    - height_int 输出提供裁剪区域的高度，这是保持纵横比或缩放图像段的关键测量值。
    - Comfy dtype: int
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Crop_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mask': ('MASK',), 'padding': ('INT', {'default': 24, 'min': 0, 'max': 4096, 'step': 1}), 'region_type': (['dominant', 'minority'],)}}
    RETURN_TYPES = ('MASK', 'CROP_DATA', 'INT', 'INT', 'INT', 'INT', 'INT', 'INT')
    RETURN_NAMES = ('cropped_mask', 'crop_data', 'top_int', 'left_int', 'right_int', 'bottom_int', 'width_int', 'height_int')
    FUNCTION = 'mask_crop_region'
    CATEGORY = 'WAS Suite/Image/Masking'

    def mask_crop_region(self, mask, padding=24, region_type='dominant'):
        mask_pil = Image.fromarray(np.clip(255.0 * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
        (region_mask, crop_data) = self.WT.Masking.crop_region(mask_pil, region_type, padding)
        region_tensor = pil2mask(ImageOps.invert(region_mask)).unsqueeze(0).unsqueeze(1)
        ((width, height), (left, top, right, bottom)) = crop_data
        return (region_tensor, crop_data, top, left, right, bottom, width, height)
```