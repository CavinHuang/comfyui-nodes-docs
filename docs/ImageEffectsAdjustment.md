
# Documentation
- Class name: ImageEffectsAdjustment
- Category: image/effects
- Output node: False

ImageEffectsAdjustment节点对一批图像应用一系列图像调整，包括亮度、对比度、饱和度、色相、伽马值和锐度，以及RGB颜色缩放。它允许对图像的视觉方面进行微调，以实现所需的效果或修正。

# Input types
## Required
- images
    - 需要调整的图像批次。每项调整都会应用于批次中的所有图像，从而实现对多个输入的一致图像处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- brightness
    - 调整图像的亮度水平。大于1.0的值会增加亮度，而小于1.0的值会降低亮度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- contrast
    - 修改图像的对比度。大于1.0的值会增强对比度，而小于1.0的值会降低对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- saturation
    - 改变图像的饱和度水平，增强或减弱颜色的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- hue
    - 改变图像的色相，允许在色谱上进行偏移。
    - Comfy dtype: FLOAT
    - Python dtype: float
- gamma
    - 对图像应用伽马校正，调整亮度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sharpness
    - 调整图像的锐度，使其看起来更清晰或更柔和。
    - Comfy dtype: FLOAT
    - Python dtype: float
- red
    - 缩放图像的红色通道，影响红色色调的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- green
    - 缩放图像的绿色通道，影响绿色色调的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blue
    - 缩放图像的蓝色通道，影响蓝色色调的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 应用指定调整后的图像批次，可能包括亮度、对比度、饱和度、色相、伽马值、锐度和RGB颜色缩放的变化。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEffectsAdjustment:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "brightness": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.01
                }),
                "contrast": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.01
                }),
                "saturation": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.01
                }),
                "hue": ("FLOAT", {
                    "default": 0.5,
                    "max": 1.0,
                    "step": 0.01
                }),
                "gamma": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.01
                }),
                "sharpness": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.01
                }),
                "red": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.01
                }),
                "green": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.01
                }),
                "blue": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.01
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/effects"

    def node(self, images, brightness, contrast, saturation, hue, gamma, sharpness, red, green, blue):
        # noinspection PyUnboundLocalVariable
        def apply(img):
            rgba = False

            if len(img[0, 0, :]) == 4:
                a = img[:, :, 3].unsqueeze(2)
                img = img[:, :, 0:3]
                rgba = True

            img = img.permute(2, 0, 1)

            if brightness != 1.0:
                img = F.adjust_brightness(img, brightness)

            if contrast != 1.0:
                img = F.adjust_contrast(img, contrast)

            if saturation != 1.0:
                img = F.adjust_saturation(img, saturation)

            if hue != 0.5:
                img = F.adjust_hue(img, hue - 0.5)

            if gamma != 1.0:
                img = F.adjust_gamma(img, gamma)

            if sharpness != 1.0:
                img = F.adjust_sharpness(img, sharpness)

            img = img.permute(1, 2, 0)

            r, g, b = torch.chunk(img, 3, dim=2)

            r = torch.clamp(r * red, 0, 1)
            g = torch.clamp(g * green, 0, 1)
            b = torch.clamp(b * blue, 0, 1)

            if rgba:
                return torch.cat([r, g, b, a], dim=2)
            else:
                return torch.cat([r, g, b], dim=2)

        return (torch.stack([
            apply(images[i]) for i in range(len(images))
        ]),)

```
