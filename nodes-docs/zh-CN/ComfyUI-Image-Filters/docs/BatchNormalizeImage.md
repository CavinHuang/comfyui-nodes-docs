
# Documentation
- Class name: BatchNormalizeImage
- Category: image/filters
- Output node: False

BatchNormalizeImage节点用于根据给定的因子对一批图像进行归一化处理。它调整每张图像的像素值，使其标准差和均值更接近整个批次的总体特征。这一过程增强了图像数据的一致性，使其更适合进一步的处理或分析。

# Input types
## Required
- images
    - images参数代表需要进行归一化处理的图像批次。它对归一化过程至关重要，因为它直接影响用于归一化的均值和标准差的计算。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- factor
    - factor参数控制原始图像与其归一化版本的混合程度。它在决定归一化图像的最终外观方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 输出是一批根据指定因子进行归一化处理的图像，这可能会增强它们在后续图像处理任务中的适用性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BatchNormalizeImage:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE", ),
                "factor": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01,  "round": 0.01}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "batch_normalize"

    CATEGORY = "image/filters"

    def batch_normalize(self, images, factor):
        t = copy.deepcopy(images) # [B x H x W x C]
        
        t = t.movedim(-1,0) # [C x B x H x W]
        for c in range(t.size(0)):
            c_sd, c_mean = torch.std_mean(t[c], dim=None)
            
            for i in range(t.size(1)):
                i_sd, i_mean = torch.std_mean(t[c, i], dim=None)
                
                t[c, i] = (t[c, i] - i_mean) / i_sd
            
            t[c] = t[c] * c_sd + c_mean
        
        t = torch.lerp(images, t.movedim(0,-1), factor) # [B x H x W x C]
        return (t,)

```
