
# Documentation
- Class name: GuidedFilterAlpha
- Category: image/filters
- Output node: False

GuidedFilterAlpha节点使用指定的alpha通道和滤波参数对图像应用引导滤波。这个过程通过平滑增强图像，同时保留边缘，利用alpha通道来控制混合和细节水平。

# Input types
## Required
- images
    - 要进行滤波的输入图像，其中alpha通道用于引导滤波过程。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- alpha
    - 用于引导滤波过程的alpha通道，影响图像细节的混合和保留方式。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- filter_radius
    - 指定滤波器的半径，影响平滑和边缘保留的程度。
    - Comfy dtype: INT
    - Python dtype: int
- sigma
    - 控制平滑的程度，数值越高会产生更多的模糊效果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 经过滤波处理的图像，其中引导滤波已根据alpha通道和滤波参数应用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class GuidedFilterAlpha:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "alpha": ("IMAGE",),
                "filter_radius": ("INT", {
                    "default": 8,
                    "min": 1,
                    "max": 64,
                    "step": 1
                }),
                "sigma": ("FLOAT", {
                    "default": 0.1,
                    "min": 0.01,
                    "max": 1.0,
                    "step": 0.01
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "guided_filter_alpha"

    CATEGORY = "image/filters"

    def guided_filter_alpha(self, images: torch.Tensor, alpha: torch.Tensor, filter_radius: int, sigma: float):
        
        d = filter_radius * 2 + 1
        s = sigma / 10
        
        i_dup = copy.deepcopy(images.cpu().numpy())
        a_dup = copy.deepcopy(alpha.cpu().numpy())
        
        for index, image in enumerate(i_dup):
            alpha_work = a_dup[index]
            i_dup[index] = guidedFilter(image, alpha_work, d, s)
        
        return (torch.from_numpy(i_dup),)

```
