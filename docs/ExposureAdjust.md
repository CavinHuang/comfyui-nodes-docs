
# Documentation
- Class name: ExposureAdjust
- Category: image/filters
- Output node: False

ExposureAdjust节点旨在通过调整图像的亮度水平来修改图像的曝光度。它支持不同的输入和输出颜色模式，并可选择性地应用色调映射来调整图像的动态范围。

# Input types
## Required
- images
    - 需要进行曝光调整的输入图像。这个参数对于定义将要进行曝光校正的视觉内容至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- stops
    - 决定曝光调整的程度。正值会增加曝光（使图像变亮），而负值则会降低曝光（使图像变暗）。
    - Comfy dtype: FLOAT
    - Python dtype: float
- input_mode
    - 指定输入图像的色彩空间，可以是'sRGB'或'linear'，影响曝光调整的应用方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- output_mode
    - 定义输出图像的色彩空间，允许调整后的图像灵活地集成到各种工作流程中。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- use_tonemap
    - 一个布尔标志，表示是否应该对图像应用色调映射，对于处理高动态范围内容很有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- tonemap_scale
    - 调整色调映射效果的比例，提供对图像动态范围压缩的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 具有调整后曝光度的输出图像，可能处于不同的色彩空间，并可选择性地应用了色调映射。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ExposureAdjust:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "stops": ("FLOAT", {"default": 0.0, "min": -100, "max": 100, "step": 0.01}),
                "input_mode": (["sRGB", "linear"],),
                "output_mode": (["sRGB", "linear"],),
                "use_tonemap": ("BOOLEAN", {"default": False}),
                "tonemap_scale": ("FLOAT", {"default": 1, "min": 0.1, "max": 10, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply"

    CATEGORY = "image/filters"

    def apply(self, images, stops, input_mode, output_mode, use_tonemap, tonemap_scale):
        t = images.detach().clone().cpu().numpy().astype(np.float32)
        
        if input_mode == "sRGB":
            sRGBtoLinear(t[:,:,:,:3])
        
        if use_tonemap:
            tonemapToLinear(t[:,:,:,:3], tonemap_scale)
        
        exposure(t[:,:,:,:3], stops)
        
        if use_tonemap:
            linearToTonemap(t[:,:,:,:3], tonemap_scale)
        
        if output_mode == "sRGB":
            linearToSRGB(t[:,:,:,:3])
            t = np.clip(t, 0, 1)
        
        t = torch.from_numpy(t)
        return (t,)

```
