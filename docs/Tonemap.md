
# Documentation
- Class name: Tonemap
- Category: image/filters
- Output node: False

Tonemap节点旨在调整图像的色调范围，使其适合在不同设备上显示或实现特定的视觉效果。它支持线性和sRGB色彩空间之间的转换，并允许调整色调映射效果的强度。

# Input types
## Required
- images
    - 需要进行色调映射的输入图像。这是节点操作的主要数据，基于色调映射过程影响最终的视觉效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- input_mode
    - 指定输入图像的色彩空间，可以是线性或sRGB，决定了在色调映射之前的初始转换步骤。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- output_mode
    - 定义输出图像的色彩空间，可以选择线性或sRGB，以确保图像在色调映射后处于所需的格式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- tonemap_scale
    - 调整色调映射效果强度的比例因子，允许对输出图像的视觉外观进行更精细的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 经过色调映射处理后的输出图像，根据输入参数的指定调整了色调范围和色彩空间。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Tonemap:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "input_mode": (["linear", "sRGB"],),
                "output_mode": (["sRGB", "linear"],),
                "tonemap_scale": ("FLOAT", {"default": 1, "min": 0.1, "max": 10, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply"

    CATEGORY = "image/filters"

    def apply(self, images, input_mode, output_mode, tonemap_scale):
        t = images.detach().clone().cpu().numpy().astype(np.float32)
        
        if input_mode == "sRGB":
            sRGBtoLinear(t[:,:,:,:3])
        
        linearToTonemap(t[:,:,:,:3], tonemap_scale)
        
        if output_mode == "sRGB":
            linearToSRGB(t[:,:,:,:3])
            t = np.clip(t, 0, 1)
        
        t = torch.from_numpy(t)
        return (t,)

```
