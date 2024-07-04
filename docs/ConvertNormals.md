
# Documentation
- Class name: ConvertNormals
- Category: image/filters
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ConvertNormals节点专门用于转换法线贴图的格式，调整其比例，并可选择性地进行归一化或填充缺失区域。它支持多种输入和输出模式，能够灵活地调整法线贴图以适应不同的渲染或处理需求。这个节点在图形和图像处理流程中特别有用，尤其是在需要将法线贴图转换或调整以满足特定用途时。

# Input types
## Required
- normals
    - 需要转换的输入法线贴图张量。这是节点操作的核心参数，它会根据其他输入参数进行各种转换。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- input_mode
    - 指定输入法线贴图的格式，影响其初始处理方式。该参数决定了在进行进一步转换之前，对法线贴图进行的初始调整。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- output_mode
    - 定义输出法线贴图的期望格式，指导对张量进行最终调整。此参数确保转换后的法线贴图满足特定的格式要求。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scale_XY
    - 应用于法线贴图X和Y分量的缩放因子，影响其整体外观。此参数允许微调法线贴图在表面上的视觉效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- normalize
    - 一个布尔标志，指示是否在转换后对法线贴图进行归一化。归一化确保法线贴图的向量为单位长度，这通常是为了保证一致的光照效果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- fix_black
    - 一个布尔标志，当启用时，会对法线贴图中的黑色区域进行修正，可能会基于optional_fill参数填充这些区域。这对于修复或增强具有缺失数据的法线贴图很有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- optional_fill
    - 一个可选的张量，用于在启用fix_black时填充法线贴图中的黑色区域。此参数允许应用自定义填充模式或颜色，增强了节点的多功能性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 转换后的法线贴图张量，根据指定的输入和输出模式、缩放、归一化和可选填充进行调整。这个输出可以直接用于后续的处理或渲染步骤。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ConvertNormals:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "normals": ("IMAGE",),
                "input_mode": (["BAE", "MiDaS", "Standard"],),
                "output_mode": (["BAE", "MiDaS", "Standard"],),
                "scale_XY": ("FLOAT",{"default": 1, "min": 0, "max": 100, "step": 0.001}),
                "normalize": ("BOOLEAN", {"default": True}),
                "fix_black": ("BOOLEAN", {"default": True}),
            },
            "optional": {
                "optional_fill": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "convert_normals"

    CATEGORY = "image/filters"

    def convert_normals(self, normals, input_mode, output_mode, scale_XY, normalize, fix_black, optional_fill=None):
        t = normals.detach().clone()
        
        if input_mode == "BAE":
            t[:,:,:,0] = 1 - t[:,:,:,0] # invert R
        elif input_mode == "MiDaS":
            t[:,:,:,:3] = torch.stack([1 - t[:,:,:,2], t[:,:,:,1], t[:,:,:,0]], dim=3) # BGR -> RGB and invert R
        
        if fix_black:
            key = torch.clamp(1 - t[:,:,:,2] * 2, min=0, max=1)
            if optional_fill == None:
                t[:,:,:,0] += key * 0.5
                t[:,:,:,1] += key * 0.5
                t[:,:,:,2] += key
            else:
                fill = optional_fill.detach().clone()
                if fill.shape[1:3] != t.shape[1:3]:
                    fill = torch.nn.functional.interpolate(fill.movedim(-1,1), size=(t.shape[1], t.shape[2]), mode='bilinear').movedim(1,-1)
                if fill.shape[0] != t.shape[0]:
                    fill = fill[0].unsqueeze(0).expand(t.shape[0], -1, -1, -1)
                t[:,:,:,:3] += fill[:,:,:,:3] * key.unsqueeze(3).expand(-1, -1, -1, 3)
        
        t[:,:,:,:2] = (t[:,:,:,:2] - 0.5) * scale_XY + 0.5
        
        if normalize:
            t[:,:,:,:3] = torch.nn.functional.normalize(t[:,:,:,:3] * 2 - 1, dim=3) / 2 + 0.5
        
        if output_mode == "BAE":
            t[:,:,:,0] = 1 - t[:,:,:,0] # invert R
        elif output_mode == "MiDaS":
            t[:,:,:,:3] = torch.stack([t[:,:,:,2], t[:,:,:,1], 1 - t[:,:,:,0]], dim=3) # invert R and BGR -> RGB
        
        return (t,)

```
