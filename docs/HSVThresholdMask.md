# Documentation
- Class name: HSVThresholdMask
- Category: postprocessing/Masks
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

该节点类封装了HSV颜色空间内的阈值操作功能，能够基于特定的色调、饱和度或亮度范围创建二值掩码。这对于图像中分割和隔离感兴趣区域至关重要，促进了对象识别和降噪等多种图像处理任务的进行。

# Input types
## Required
- image
    - 图像参数对于HSV阈值处理过程至关重要，因为它提供了进行阈值分割的源数据。它通过决定图像的哪些区域将受到掩码标准的处理，从而影响整个操作。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- low_threshold
    - 低阈值参数设置了HSV通道值的下限，对于定义将被考虑用于掩码的像素值范围起着至关重要的作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- high_threshold
    - 高阈值参数建立了HSV通道值的上限，与低阈值一起决定了最终的掩码。
    - Comfy dtype: FLOAT
    - Python dtype: float
- hsv_channel
    - hsv_channel参数指示在HSV颜色空间中将使用哪个通道进行阈值处理，这对生成的掩码及其在手头图像处理任务中的适用性有着重大影响。
    - Comfy dtype: COMBO['hue', 'saturation', 'value']
    - Python dtype: str

# Output types
- result
    - 结果参数代表通过应用HSV阈值标准生成的二值掩码，是进一步图像分析和操作的重要工具。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class HSVThresholdMask:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'low_threshold': ('FLOAT', {'default': 0.2, 'min': 0, 'max': 1, 'step': 0.1}), 'high_threshold': ('FLOAT', {'default': 0.7, 'min': 0, 'max': 1, 'step': 0.1}), 'hsv_channel': (['hue', 'saturation', 'value'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'hsv_threshold'
    CATEGORY = 'postprocessing/Masks'

    def hsv_threshold(self, image: torch.Tensor, low_threshold: float, high_threshold: float, hsv_channel: str):
        (batch_size, height, width, _) = image.shape
        result = torch.zeros(batch_size, height, width)
        if hsv_channel == 'hue':
            channel = 0
            (low_threshold, high_threshold) = (int(low_threshold * 180), int(high_threshold * 180))
        elif hsv_channel == 'saturation':
            channel = 1
            (low_threshold, high_threshold) = (int(low_threshold * 255), int(high_threshold * 255))
        elif hsv_channel == 'value':
            channel = 2
            (low_threshold, high_threshold) = (int(low_threshold * 255), int(high_threshold * 255))
        for b in range(batch_size):
            tensor_image = (image[b].numpy().copy() * 255).astype(np.uint8)
            hsv_image = cv2.cvtColor(tensor_image, cv2.COLOR_RGB2HSV)
            mask = cv2.inRange(hsv_image[:, :, channel], low_threshold, high_threshold)
            tensor = torch.from_numpy(mask).float() / 255.0
            result[b] = tensor
        return (result,)
```