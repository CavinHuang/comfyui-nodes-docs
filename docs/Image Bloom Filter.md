# Documentation
- Class name: WAS_Image_Bloom_Filter
- Category: WAS Suite/Image/Filter
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Bloom_Filter节点对图像应用了一种bloom效果，通过模拟光线的散射来增强其视觉吸引力。它调整图像的亮度以创建发光效果，这对于各种图像处理任务非常有用。

# Input types
## Required
- image
    - 将应用bloom滤镜的输入图像。它是节点处理的主要对象，直接影响最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- radius
    - 半径参数控制用于创建bloom效果的高斯模糊的范围。它是确定bloom柔和度的重要因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- intensity
    - 强度参数调整bloom效果的亮度。较高的值会导致更明显的bloom，而较低的值则产生更微妙的效果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output_image
    - output_image是应用了bloom滤镜的处理后的图像。它代表了节点操作的最终视觉结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Bloom_Filter:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'radius': ('FLOAT', {'default': 10, 'min': 0.0, 'max': 1024, 'step': 0.1}), 'intensity': ('FLOAT', {'default': 1, 'min': 0.0, 'max': 1.0, 'step': 0.1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_bloom'
    CATEGORY = 'WAS Suite/Image/Filter'

    def image_bloom(self, image, radius=0.5, intensity=1.0):
        return (pil2tensor(self.apply_bloom_filter(tensor2pil(image), radius, intensity)),)

    def apply_bloom_filter(self, input_image, radius, bloom_factor):
        blurred_image = input_image.filter(ImageFilter.GaussianBlur(radius=radius))
        high_pass_filter = ImageChops.subtract(input_image, blurred_image)
        bloom_filter = high_pass_filter.filter(ImageFilter.GaussianBlur(radius=radius * 2))
        bloom_filter = ImageEnhance.Brightness(bloom_filter).enhance(2.0)
        bloom_filter = ImageChops.multiply(bloom_filter, Image.new('RGB', input_image.size, (int(255 * bloom_factor), int(255 * bloom_factor), int(255 * bloom_factor))))
        blended_image = ImageChops.screen(input_image, bloom_filter)
        return blended_image
```