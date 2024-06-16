# Documentation
- Class name: ColorCorrectExposure
- Category: 😺dzNodes/LayerColor
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

改变图像的曝光。

# Input types
## Required

- image
    - 输入的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- exposure
    - 曝光值。更高的数值表示更亮的曝光。
    - Comfy dtype: INT
    - Python dtype: int


# Output types

- image
    - 输出的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ColorCorrectExposure:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "image": ("IMAGE", ),  #
                "exposure": ("INT", {"default": 20, "min": -100, "max": 100, "step": 1}),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = 'color_correct_exposure'
    CATEGORY = '😺dzNodes/LayerColor'

    def color_correct_exposure(self, image, exposure):

        ret_images = []

        for i in image:
            i = torch.unsqueeze(i, 0)
            __image = tensor2pil(i)
            t = i.detach().clone().cpu().numpy().astype(np.float32)
            more = t[:, :, :, :3] > 0
            t[:, :, :, :3][more] *= pow(2, exposure / 32)
            if exposure < 0:
                bp = -exposure / 250
                scale = 1 / (1 - bp)
                t = np.clip((t - bp) * scale, 0.0, 1.0)
            ret_image = tensor2pil(torch.from_numpy(t))

            if __image.mode == 'RGBA':
                ret_image = RGB2RGBA(ret_image, __image.split()[-1])

            ret_images.append(pil2tensor(ret_image))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),)

```