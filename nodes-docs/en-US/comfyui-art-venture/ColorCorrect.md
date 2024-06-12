---
tags:
- Color
---

# Color Correct
## Documentation
- Class name: `ColorCorrect`
- Category: `Art Venture/Post Processing`
- Output node: `False`

The ColorCorrect node is designed to adjust and enhance the color properties of an image, including temperature, hue, brightness, contrast, saturation, and gamma. It utilizes advanced image processing techniques to fine-tune these attributes, improving the overall visual quality of the image.
## Input types
### Required
- **`image`**
    - The input image tensor to be color corrected. It serves as the base for applying various color adjustments.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`temperature`**
    - Adjusts the color temperature of the image, making it warmer or cooler.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`hue`**
    - Modifies the hue of the image, shifting the colors along the color spectrum.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`brightness`**
    - Controls the brightness level of the image, making it lighter or darker.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`contrast`**
    - Alters the contrast of the image, enhancing the difference between light and dark areas.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`saturation`**
    - Adjusts the saturation level, affecting the intensity of the colors in the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`gamma`**
    - Applies gamma correction to the image, adjusting the luminance or brightness.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The color-corrected image tensor, reflecting the applied adjustments.
    - Python dtype: `torch.Tensor`
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
