
# Documentation
- Class name: `BatchAverageUnJittered`
- Category: `image/filters/jitter`
- Output node: `False`

BatchAverageUnJittered节点旨在通过应用平均或中值操作来处理一批图像，以减少抖动效应。它对图像的子批次进行操作，应用指定的操作来创建更平滑、更稳定的输出图像。

# Input types
## Required
- images
    - 需要处理的图像批次。这个输入对于确定将应用平均或中值操作的图像集至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- operation
    - 指定要应用于图像的操作（'mean'或'median'）。这个选择影响抖动减少的方法和输出图像的最终外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 经过指定的平均或中值操作处理以减少抖动效应后的图像批次。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BatchAverageUnJittered:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "operation": (["mean", "median"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply"

    CATEGORY = "image/filters/jitter"

    def apply(self, images, operation):
        t = images.detach().clone()
        
        batch = []
        for i in range(t.shape[0] // 9):
            if operation == "mean":
                batch.append(torch.mean(t[i*9:i*9+9], dim=0, keepdim=True))
            elif operation == "median":
                batch.append(torch.median(t[i*9:i*9+9], dim=0, keepdim=True)[0])
        
        return (torch.cat(batch, dim=0),)

```
