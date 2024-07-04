# Documentation
- Class name: ColorBalance
- Category: 😺dzNodes/LayerColor
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

改变图像的色温。

# Input types
## Required

- image
    - 输入的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- temperature
    - 色温。范围在-100到100之间。值越高，色温越高(偏蓝)；越低，色温越低(偏黄)。
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
class ColorTemperature:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "temperature": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 1},),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "color_temperature"
    CATEGORY = '😺dzNodes/LayerColor'

    def color_temperature(self, image, temperature,
                            ):

        batch_size, height, width, _ = image.shape
        result = torch.zeros_like(image)

        temperature /= -100

        for b in range(batch_size):
            tensor_image = image[b].numpy()
            modified_image = Image.fromarray((tensor_image * 255).astype(np.uint8))
            modified_image = np.array(modified_image).astype(np.float32)

            if temperature > 0:
                modified_image[:, :, 0] *= 1 + temperature
                modified_image[:, :, 1] *= 1 + temperature * 0.4
            elif temperature < 0:
                modified_image[:, :, 0] *= 1 + temperature * 0.2
                modified_image[:, :, 2] *= 1 - temperature

            modified_image = np.clip(modified_image, 0, 255)
            modified_image = modified_image.astype(np.uint8)
            modified_image = modified_image / 255
            modified_image = torch.from_numpy(modified_image).unsqueeze(0)
            result[b] = modified_image

        log(f"{NODE_NAME} Processed {len(result)} image(s).", message_type='finish')
        return (result,)
```