
# Documentation
- Class name: UnTonemap
- Category: image/filters
- Output node: False

UnTonemap节点旨在逆转图像上的色调映射效果，将已经进行过色调映射的图像转换回原始的线性或sRGB色彩空间。这一过程对于恢复经过色调映射处理的图像的原始动态范围和色彩保真度至关重要。

# Input types
## Required
- images
    - 需要进行逆色调映射的图像。这个输入对于定义将要进行逆色调映射处理的图像集合至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- input_mode
    - 指定输入图像的色彩空间，可以是'sRGB'或'linear'。这决定了在进行逆色调映射之前的初始转换步骤。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- output_mode
    - 定义输出图像所需的色彩空间，可以是'linear'或'sRGB'。这影响了逆色调映射后的最终转换步骤。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- tonemap_scale
    - 在逆色调映射过程中应用的缩放因子，用于调整效果的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 经过逆色调映射处理的图像，返回时处于指定的输出色彩空间，可以是'linear'或'sRGB'。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UnTonemap:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "input_mode": (["sRGB", "linear"],),
                "output_mode": (["linear", "sRGB"],),
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
        
        tonemapToLinear(t[:,:,:,:3], tonemap_scale)
        
        if output_mode == "sRGB":
            linearToSRGB(t[:,:,:,:3])
            t = np.clip(t, 0, 1)
        
        t = torch.from_numpy(t)
        return (t,)

```
