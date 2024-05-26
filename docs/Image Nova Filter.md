# Documentation
- Class name: WAS_Image_Nova_Filter
- Category: WAS Suite/Image/Filter
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Nova_Filter 类的 `nova_sine` 方法对图像应用正弦波失真，通过波浪状图案增强其视觉特征。这种方法旨在为图像处理工作流程引入一种创造性和艺术性效果，允许通过调整振幅和频率来控制失真的强度和尺度。

# Input types
## Required
- image
    - 'image' 参数对于节点的操作至关重要，因为它是将要处理的输入图像。它直接影响节点的执行和最终结果，决定了正弦波失真的对象。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- amplitude
    - 'amplitude' 参数控制应用于图像的正弦波失真的强度。它是决定视觉效果的关键因素，允许用户根据个人喜好微调效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frequency
    - 'frequency' 参数决定应用于图像的正弦波模式的尺度。它对于调整波的周期至关重要，进而影响失真的整体外观。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output_image
    - 'output_image' 是将正弦波失真应用于输入图像的结果。它代表了最终视觉上被改变的图像，带有节点功能所预期的创造性效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Nova_Filter:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'amplitude': ('FLOAT', {'default': 0.1, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'frequency': ('FLOAT', {'default': 3.14, 'min': 0.0, 'max': 100.0, 'step': 0.001})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'nova_sine'
    CATEGORY = 'WAS Suite/Image/Filter'

    def nova_sine(self, image, amplitude, frequency):
        img = tensor2pil(image)
        img_array = np.array(img)

        def sine(x, freq, amp):
            return amp * np.sin(2 * np.pi * freq * x)
        resolution = img.info.get('dpi')
        physical_size = img.size
        if resolution is not None:
            ppm = 25.4 / resolution
            physical_size = tuple((int(pix * ppm) for pix in physical_size))
        max_freq = img.width / 2
        if frequency > max_freq:
            frequency = max_freq
        for i in range(img_array.shape[0]):
            for j in range(img_array.shape[1]):
                for k in range(img_array.shape[2]):
                    img_array[i, j, k] = int(sine(img_array[i, j, k] / 255, frequency, amplitude) * 255)
        return (torch.from_numpy(img_array.astype(np.float32) / 255.0).unsqueeze(0),)
```