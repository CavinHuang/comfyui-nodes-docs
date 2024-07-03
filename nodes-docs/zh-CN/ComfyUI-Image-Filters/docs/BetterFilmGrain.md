
# Documentation
- Class name: BetterFilmGrain
- Category: image/filters
- Output node: False

BetterFilmGrain节点通过应用可定制的胶片颗粒效果来增强图像，模拟传统胶片摄影的质感和外观。它允许对颗粒的比例、强度、饱和度和整体色调进行微调，以达到理想的美学效果。

# Input types
## Required
- image
    - 将要应用胶片颗粒效果的输入图像。它作为颗粒纹理叠加的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- scale
    - 决定颗粒粒子的比例，影响它们相对于图像的大小。较小的比例会产生更细腻的颗粒。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength
    - 控制颗粒效果的强度，较高的值会使颗粒更加明显。
    - Comfy dtype: FLOAT
    - Python dtype: float
- saturation
    - 调整颗粒效果的颜色饱和度，允许产生更多或更少的彩色颗粒纹理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- toe
    - 修改胶片响应曲线的暗部，影响阴影色调和颗粒效果的整体对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - 随机数生成的种子值，确保颗粒模式的可重复性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 应用了胶片颗粒效果的输出图像，展示增强的纹理和类似胶片的美感。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BetterFilmGrain:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "scale": ("FLOAT", {"default": 0.5, "min": 0.25, "max": 2.0, "step": 0.05}),
                "strength": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 10.0, "step": 0.01}),
                "saturation": ("FLOAT", {"default": 0.7, "min": 0.0, "max": 2.0, "step": 0.01}),
                "toe": ("FLOAT", {"default": 0.0, "min": -0.2, "max": 0.5, "step": 0.001}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "grain"

    CATEGORY = "image/filters"

    def grain(self, image, scale, strength, saturation, toe, seed):
        t = image.detach().clone()
        torch.manual_seed(seed)
        grain = torch.rand(t.shape[0], int(t.shape[1] // scale), int(t.shape[2] // scale), 3)
        
        YCbCr = RGB2YCbCr(grain)
        YCbCr[:,:,:,0] = cv_blur_tensor(YCbCr[:,:,:,0], 3, 3)
        YCbCr[:,:,:,1] = cv_blur_tensor(YCbCr[:,:,:,1], 15, 15)
        YCbCr[:,:,:,2] = cv_blur_tensor(YCbCr[:,:,:,2], 11, 11)
        
        grain = (YCbCr2RGB(YCbCr) - 0.5) * strength
        grain[:,:,:,0] *= 2
        grain[:,:,:,2] *= 3
        grain += 1
        grain = grain * saturation + grain[:,:,:,1].unsqueeze(3).repeat(1,1,1,3) * (1 - saturation)
        
        grain = torch.nn.functional.interpolate(grain.movedim(-1,1), size=(t.shape[1], t.shape[2]), mode='bilinear').movedim(1,-1)
        t[:,:,:,:3] = torch.clip((1 - (1 - t[:,:,:,:3]) * grain) * (1 - toe) + toe, 0, 1)
        return(t,)

```
