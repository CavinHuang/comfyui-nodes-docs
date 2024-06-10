# Documentation
- Class name: WAS_Image_Levels
- Category: WAS Suite/Image/Adjustment
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

该节点旨在通过调整图像的黑、中、白水平来调整图像的色调范围，从而增强图像的整体对比度和视觉吸引力。

# Input types
## Required
- image
    - 图像参数对于节点处理和调整视觉内容至关重要。它作为输入，其色调水平将根据指定的黑、中、白水平进行修改。
    - Comfy dtype: COMBO[Image]
    - Python dtype: PIL.Image
- black_level
    - 黑水平参数对于设定图像中最暗的点至关重要，它影响整体对比度和色调范围。它有助于定义图像中的阴影和最深的黑色。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mid_level
    - 中水平参数在确定色调范围的中点方面起着关键作用，影响图像中色调的整体平衡和分布。
    - Comfy dtype: FLOAT
    - Python dtype: float
- white_level
    - 白水平参数对于定义图像中最亮的点很重要，它有助于高光和最亮的白色。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 输出图像是色调调整的结果，展示了通过操纵黑、中、白水平而出现的增强对比度和精细视觉细节。
    - Comfy dtype: COMBO[Image]
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Levels:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'black_level': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 255.0, 'step': 0.1}), 'mid_level': ('FLOAT', {'default': 127.5, 'min': 0.0, 'max': 255.0, 'step': 0.1}), 'white_level': ('FLOAT', {'default': 255, 'min': 0.0, 'max': 255.0, 'step': 0.1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'apply_image_levels'
    CATEGORY = 'WAS Suite/Image/Adjustment'

    def apply_image_levels(self, image, black_level, mid_level, white_level):
        tensor_images = []
        for img in image:
            img = tensor2pil(img)
            levels = self.AdjustLevels(black_level, mid_level, white_level)
            tensor_images.append(pil2tensor(levels.adjust(img)))
        tensor_images = torch.cat(tensor_images, dim=0)
        return (tensor_images,)

    class AdjustLevels:

        def __init__(self, min_level, mid_level, max_level):
            self.min_level = min_level
            self.mid_level = mid_level
            self.max_level = max_level

        def adjust(self, im):
            im_arr = np.array(im)
            im_arr[im_arr < self.min_level] = self.min_level
            im_arr = (im_arr - self.min_level) * (255 / (self.max_level - self.min_level))
            im_arr[im_arr < 0] = 0
            im_arr[im_arr > 255] = 255
            im_arr = im_arr.astype(np.uint8)
            im = Image.fromarray(im_arr)
            im = ImageOps.autocontrast(im, cutoff=self.max_level)
            return im
```