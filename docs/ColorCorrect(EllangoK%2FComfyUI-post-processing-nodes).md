# Documentation
- Class name: ColorCorrect
- Category: postprocessing/Color Adjustments
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

ColorCorrect节点旨在调整图像的颜色属性，增强其视觉吸引力并纠正颜色不平衡。它通过调整温度、色调、亮度、对比度、饱和度和伽马等不同方面来实现期望的外观，提高图像质量并确保一组图像间的一致性。

# Input types
## Required
- image
    - 图像参数是必需的，因为它是节点颜色校正过程的主要输入。它是所有调整的基础，其特征直接影响最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- temperature
    - 温度参数用于调整图像的颜色调，模拟更暖或更冷的颜色效果。它在设定图像的情绪和整体外观方面起着重要作用，有助于图像的视觉叙事。
    - Comfy dtype: FLOAT
    - Python dtype: float
- hue
    - 色调参数改变图像的颜色谱，允许在不改变亮度或饱和度的情况下改变主导颜色。它影响图像的整体颜色平衡，并可用于匹配期望的审美。
    - Comfy dtype: FLOAT
    - Python dtype: float
- brightness
    - 亮度参数控制图像的整体亮度水平。通过调整这个参数，节点可以纠正曝光不足或过度曝光的问题，确保图像的细节清晰可见且平衡良好。
    - Comfy dtype: FLOAT
    - Python dtype: float
- contrast
    - 对比度参数调整图像最亮和最暗部分之间的差异，增强视觉冲击力和深度。它对于使图像更加突出和引人注目至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- saturation
    - 饱和度参数增强或减少图像中颜色的活力。它对于达到期望的颜色丰富度水平很重要，并且可以显著改变图像的情绪。
    - Comfy dtype: FLOAT
    - Python dtype: float
- gamma
    - 伽马参数调整图像的整体色调范围，影响中间调和阴影的渲染。它对于实现自然和视觉上令人愉悦的颜色校正至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 输出图像是颜色校正过程的结果，反映了对输入图像进行的所有调整。它代表了最终产品，展示了增强的视觉吸引力和纠正的颜色平衡。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ColorCorrect:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'temperature': ('FLOAT', {'default': 0, 'min': -100, 'max': 100, 'step': 5}), 'hue': ('FLOAT', {'default': 0, 'min': -90, 'max': 90, 'step': 5}), 'brightness': ('FLOAT', {'default': 0, 'min': -100, 'max': 100, 'step': 5}), 'contrast': ('FLOAT', {'default': 0, 'min': -100, 'max': 100, 'step': 5}), 'saturation': ('FLOAT', {'default': 0, 'min': -100, 'max': 100, 'step': 5}), 'gamma': ('FLOAT', {'default': 1, 'min': 0.2, 'max': 2.2, 'step': 0.1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'color_correct'
    CATEGORY = 'postprocessing/Color Adjustments'

    def color_correct(self, image: torch.Tensor, temperature: float, hue: float, brightness: float, contrast: float, saturation: float, gamma: float):
        (batch_size, height, width, _) = image.shape
        result = torch.zeros_like(image)
        brightness /= 100
        contrast /= 100
        saturation /= 100
        temperature /= 100
        brightness = 1 + brightness
        contrast = 1 + contrast
        saturation = 1 + saturation
        for b in range(batch_size):
            tensor_image = image[b].numpy()
            modified_image = Image.fromarray((tensor_image * 255).astype(np.uint8))
            modified_image = ImageEnhance.Brightness(modified_image).enhance(brightness)
            modified_image = ImageEnhance.Contrast(modified_image).enhance(contrast)
            modified_image = np.array(modified_image).astype(np.float32)
            if temperature > 0:
                modified_image[:, :, 0] *= 1 + temperature
                modified_image[:, :, 1] *= 1 + temperature * 0.4
            elif temperature < 0:
                modified_image[:, :, 2] *= 1 - temperature
            modified_image = np.clip(modified_image, 0, 255) / 255
            modified_image = np.clip(np.power(modified_image, gamma), 0, 1)
            hls_img = cv2.cvtColor(modified_image, cv2.COLOR_RGB2HLS)
            hls_img[:, :, 2] = np.clip(saturation * hls_img[:, :, 2], 0, 1)
            modified_image = cv2.cvtColor(hls_img, cv2.COLOR_HLS2RGB) * 255
            hsv_img = cv2.cvtColor(modified_image, cv2.COLOR_RGB2HSV)
            hsv_img[:, :, 0] = (hsv_img[:, :, 0] + hue) % 360
            modified_image = cv2.cvtColor(hsv_img, cv2.COLOR_HSV2RGB)
            modified_image = modified_image.astype(np.uint8)
            modified_image = modified_image / 255
            modified_image = torch.from_numpy(modified_image).unsqueeze(0)
            result[b] = modified_image
        return (result,)
```