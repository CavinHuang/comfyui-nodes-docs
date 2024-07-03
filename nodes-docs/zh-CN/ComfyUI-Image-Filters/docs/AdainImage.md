
# Documentation
- Class name: AdainImage
- Category: image/filters
- Output node: False

AdainImage节点应用自适应实例归一化（Adaptive Instance Normalization，AdaIN）技术对一批图像进行处理，利用参考图像来调整输入图像的风格。这个过程涉及基于参考图像的统计特性（均值和标准差）对输入图像进行归一化，从而在给定强度级别上实现风格迁移。

# Input types
## Required
- images
    - 需要进行风格化的输入图像。这些是风格迁移过程的主要对象。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- reference
    - 用于提取风格特征（均值和标准差）的参考图像，这些特征将用于风格迁移。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- factor
    - 控制风格迁移强度的因子，允许在原始图像和风格化图像之间进行混合。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 经过自适应实例归一化技术处理后的风格化图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AdainImage:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE", ),
                "reference": ("IMAGE", ),
                "factor": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01,  "round": 0.01}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "batch_normalize"

    CATEGORY = "image/filters"

    def batch_normalize(self, images, reference, factor):
        t = copy.deepcopy(images) # [B x H x W x C]
        
        t = t.movedim(-1,0) # [C x B x H x W]
        for c in range(t.size(0)):
            for i in range(t.size(1)):
                r_sd, r_mean = torch.std_mean(reference[i, :, :, c], dim=None) # index by original dim order
                i_sd, i_mean = torch.std_mean(t[c, i], dim=None)
                
                t[c, i] = ((t[c, i] - i_mean) / i_sd) * r_sd + r_mean
        
        t = torch.lerp(images, t.movedim(0,-1), factor) # [B x H x W x C]
        return (t,)

```
