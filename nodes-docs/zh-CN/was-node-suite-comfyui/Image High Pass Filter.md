# Documentation
- Class name: WAS_Image_High_Pass_Filter
- Category: WAS Suite/Image/Filter
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_High_Pass_Filter 节点旨在增强图像的高频细节，有效去除低频噪声或模糊。它对输入图像应用高通滤波器，使细节更加突出。节点可以调整强度和半径，以控制过滤效果的强度和尺度。

# Input types
## Required
- images
    - 要由高通滤波器处理的输入图像。此参数至关重要，因为它定义了节点操作以增强高频分量的数据。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image.Image]
## Optional
- radius
    - 半径参数决定了高通滤波器要移除的模糊程度。它影响输出图像中保留的细节的尺度。
    - Comfy dtype: INT
    - Python dtype: int
- strength
    - 强度参数控制高通滤波器效果的强度。更高的值将导致高频细节的增强更加明显。
    - Comfy dtype: FLOAT
    - Python dtype: float
- color_output
    - color_output 参数指定输出应为彩色（RGB）还是灰度（L）。这影响过滤图像的视觉外观。
    - Comfy dtype: COMBO['true', 'false']
    - Python dtype: Union[str, Literal['true', 'false']]
- neutral_background
    - neutral_background 参数确定是否应向图像添加中性颜色背景。在需要中性背景板以获得更好视觉对比度的情况下，这可能会有所帮助。
    - Comfy dtype: COMBO['true', 'false']
    - Python dtype: Union[str, Literal['true', 'false']]

# Output types
- images
    - 包含增强了高频细节的处理图像的输出参数。这些图像已经滤除了低频分量，强调了细节。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_High_Pass_Filter:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'radius': ('INT', {'default': 10, 'min': 1, 'max': 500, 'step': 1}), 'strength': ('FLOAT', {'default': 1.5, 'min': 0.0, 'max': 255.0, 'step': 0.1}), 'color_output': (['true', 'false'],), 'neutral_background': (['true', 'false'],)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('images',)
    FUNCTION = 'high_pass'
    CATEGORY = 'WAS Suite/Image/Filter'

    def high_pass(self, images, radius=10, strength=1.5, color_output='true', neutral_background='true'):
        batch_tensor = []
        for image in images:
            transformed_image = self.apply_hpf(tensor2pil(image), radius, strength, color_output, neutral_background)
            batch_tensor.append(pil2tensor(transformed_image))
        batch_tensor = torch.cat(batch_tensor, dim=0)
        return (batch_tensor,)

    def apply_hpf(self, img, radius=10, strength=1.5, color_output='true', neutral_background='true'):
        img_arr = np.array(img).astype('float')
        blurred_arr = np.array(img.filter(ImageFilter.GaussianBlur(radius=radius))).astype('float')
        hpf_arr = img_arr - blurred_arr
        hpf_arr = np.clip(hpf_arr * strength, 0, 255).astype('uint8')
        if color_output == 'true':
            high_pass = Image.fromarray(hpf_arr, mode='RGB')
        else:
            grayscale_arr = np.mean(hpf_arr, axis=2).astype('uint8')
            high_pass = Image.fromarray(grayscale_arr, mode='L')
        if neutral_background == 'true':
            neutral_color = (128, 128, 128) if high_pass.mode == 'RGB' else 128
            neutral_bg = Image.new(high_pass.mode, high_pass.size, neutral_color)
            high_pass = ImageChops.screen(neutral_bg, high_pass)
        return high_pass.convert('RGB')
```