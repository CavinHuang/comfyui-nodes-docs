
# Documentation
- Class name: ColorCorrect
- Category: Art Venture/Post Processing
- Output node: False

ColorCorrect节点旨在调整和增强图像的色彩属性,包括色温、色相、亮度、对比度、饱和度和伽马值。它采用先进的图像处理技术来微调这些属性,从而提高图像的整体视觉质量。

# Input types
## Required
- image
    - 需要进行色彩校正的输入图像张量。它作为应用各种色彩调整的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- temperature
    - 调整图像的色温,使其变得更暖或更冷。
    - Comfy dtype: FLOAT
    - Python dtype: float
- hue
    - 修改图像的色相,沿着色谱移动颜色。
    - Comfy dtype: FLOAT
    - Python dtype: float
- brightness
    - 控制图像的亮度水平,使其变亮或变暗。
    - Comfy dtype: FLOAT
    - Python dtype: float
- contrast
    - 改变图像的对比度,增强明暗区域之间的差异。
    - Comfy dtype: FLOAT
    - Python dtype: float
- saturation
    - 调整饱和度水平,影响图像中颜色的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- gamma
    - 对图像应用伽马校正,调整亮度或明度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 经过色彩校正的图像张量,反映了所应用的调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - YDetailer
    - [Image Levels Adjustment](../../was-node-suite-comfyui/Nodes/Image Levels Adjustment.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [CR Image Output](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Image Output.md)
    - [ImageUpscaleWithModel](../../Comfy/Nodes/ImageUpscaleWithModel.md)
    - [SaveImage](../../Comfy/Nodes/SaveImage.md)
    - [ColorCorrect](../../comfyui-art-venture/Nodes/ColorCorrect.md)



## Source code
```python
class ColorCorrect:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "temperature": (
                    "FLOAT",
                    {"default": 0, "min": -100, "max": 100, "step": 5},
                ),
                "hue": ("FLOAT", {"default": 0, "min": -90, "max": 90, "step": 5}),
                "brightness": (
                    "FLOAT",
                    {"default": 0, "min": -100, "max": 100, "step": 5},
                ),
                "contrast": (
                    "FLOAT",
                    {"default": 0, "min": -100, "max": 100, "step": 5},
                ),
                "saturation": (
                    "FLOAT",
                    {"default": 0, "min": -100, "max": 100, "step": 5},
                ),
                "gamma": ("FLOAT", {"default": 1, "min": 0.2, "max": 2.2, "step": 0.1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "color_correct"

    CATEGORY = "Art Venture/Post Processing"

    def color_correct(
        self,
        image: torch.Tensor,
        temperature: float,
        hue: float,
        brightness: float,
        contrast: float,
        saturation: float,
        gamma: float,
    ):
        batch_size, height, width, _ = image.shape
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

            # brightness
            modified_image = ImageEnhance.Brightness(modified_image).enhance(brightness)

            # contrast
            modified_image = ImageEnhance.Contrast(modified_image).enhance(contrast)
            modified_image = np.array(modified_image).astype(np.float32)

            # temperature
            if temperature > 0:
                modified_image[:, :, 0] *= 1 + temperature
                modified_image[:, :, 1] *= 1 + temperature * 0.4
            elif temperature < 0:
                modified_image[:, :, 2] *= 1 - temperature
            modified_image = np.clip(modified_image, 0, 255) / 255

            # gamma
            modified_image = np.clip(np.power(modified_image, gamma), 0, 1)

            # saturation
            hls_img = cv2.cvtColor(modified_image, cv2.COLOR_RGB2HLS)
            hls_img[:, :, 2] = np.clip(saturation * hls_img[:, :, 2], 0, 1)
            modified_image = cv2.cvtColor(hls_img, cv2.COLOR_HLS2RGB) * 255

            # hue
            hsv_img = cv2.cvtColor(modified_image, cv2.COLOR_RGB2HSV)
            hsv_img[:, :, 0] = (hsv_img[:, :, 0] + hue) % 360
            modified_image = cv2.cvtColor(hsv_img, cv2.COLOR_HSV2RGB)

            modified_image = modified_image.astype(np.uint8)
            modified_image = modified_image / 255
            modified_image = torch.from_numpy(modified_image).unsqueeze(0)
            result[b] = modified_image

        return (result,)

```
