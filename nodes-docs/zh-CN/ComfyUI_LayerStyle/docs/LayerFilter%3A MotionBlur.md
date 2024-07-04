# Documentation
- Class name: MotionBlur
- Category: 😺dzNodes/LayerFilter
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

用于在图像上应用运动模糊效果的节点。

# Input types

## Required

- image
    - 输入的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- angle
    - 模糊的角度。
    - Comfy dtype: INT
    - Python dtype: int

- blur
    - 模糊量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types

- image
    - 输出的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class MotionBlur:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "image": ("IMAGE", ),  #
                "angle": ("INT", {"default": 0, "min": -90, "max": 90, "step": 1}),  # 角度
                "blur": ("INT", {"default": 20, "min": 1, "max": 999, "step": 1}),  # 模糊
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = 'motion_blur'
    CATEGORY = '😺dzNodes/LayerFilter'

    def motion_blur(self, image, angle, blur):

        ret_images = []

        for i in image:

            _canvas = tensor2pil(torch.unsqueeze(i, 0)).convert('RGB')

            ret_images.append(pil2tensor(motion_blur(_canvas, angle, blur)))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),)
```