
# Documentation
- Class name: AddAlpha
- Category: Bmad/image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AddAlpha节点旨在为RGB图像添加alpha通道，从而实现图像透明度的操作。它支持多种alpha通道创建方法，包括直接指定或反转，为处理图像透明度提供了灵活性。

# Input types
## Required
- rgb_image
    - 需要添加alpha通道的RGB图像。这是将被修改以包含透明度信息的基础图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- alpha
    - 可选的alpha通道，用于添加到RGB图像中。如果提供，它指定了图像的透明度级别。method参数决定了如何应用这个alpha通道。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- method
    - 决定如何将alpha通道应用到RGB图像。可以选择直接使用提供的alpha通道（'default'）或对其进行反转，为透明度操作提供了灵活性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 添加了alpha通道的结果图像，使得透明度操作成为可能。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AddAlpha:
    method = ["default", "invert"]

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "rgb_image": ("IMAGE",),
            },
            "optional": {
                "alpha": ("IMAGE",),
                "method": (s.method, {"default": s.method[0]}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "add_alpha"
    CATEGORY = "Bmad/image"

    def add_alpha(self, rgb_image, alpha=None, method=None):
        rgb_image = tensor2opencv(rgb_image, 3)
        rgba = cv.cvtColor(rgb_image, cv.COLOR_RGB2RGBA)
        if alpha is not None:
            alpha = tensor2opencv(alpha, 1)
            rgba[:, :, 3] = alpha if method == self.method[0] else 255 - alpha
        rgba = opencv2tensor(rgba)
        return (rgba,)

```
