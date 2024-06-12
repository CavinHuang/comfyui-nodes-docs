# Documentation
- Class name: ColorCorrectBrightnessAndContrast
- Category: 😺dzNodes/LayerColor
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

改变图像的亮度、对比度和饱和度。

# Input types
## Required

- image
    - 输入的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- brightness
    - 亮度。
    - Comfy dtype: FLOAT
    - Python dtype: float

- contrast
    - 对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float

- saturation
    - 饱和度。
    - Comfy dtype: FLOAT
    - Python dtype: float


# Output types

- image
    - 输出的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ColorCorrectBrightnessAndContrast:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "image": ("IMAGE", ),  #
                "brightness": ("FLOAT", {"default": 1, "min": 0.0, "max": 3, "step": 0.01}),
                "contrast": ("FLOAT", {"default": 1, "min": 0.0, "max": 3, "step": 0.01}),
                "saturation": ("FLOAT", {"default": 1, "min": 0.0, "max": 3, "step": 0.01}),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = 'color_correct_brightness_and_contrast'
    CATEGORY = '😺dzNodes/LayerColor'

    def color_correct_brightness_and_contrast(self, image, brightness, contrast, saturation):

        ret_images = []

        for i in image:
            i = torch.unsqueeze(i,0)
            __image = tensor2pil(i)
            ret_image = __image.convert('RGB')
            if brightness != 1:
                brightness_image = ImageEnhance.Brightness(ret_image)
                ret_image = brightness_image.enhance(factor=brightness)
            if contrast != 1:
                contrast_image = ImageEnhance.Contrast(ret_image)
                ret_image = contrast_image.enhance(factor=contrast)
            if saturation != 1:
                color_image = ImageEnhance.Color(ret_image)
                ret_image = color_image.enhance(factor=saturation)

            if __image.mode == 'RGBA':
                ret_image = RGB2RGBA(ret_image, __image.split()[-1])
            ret_images.append(pil2tensor(ret_image))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),)
```