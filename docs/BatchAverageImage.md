
# Documentation
- Class name: BatchAverageImage
- Category: image/filters
- Output node: False

BatchAverageImage节点用于对一批图像执行统计平均操作，如计算均值或中位数。该过程旨在从一组图像中创建单一的代表性图像，具体是通过计算批次中所有图像的像素均值或中位数来实现的。

# Input types
## Required
- images
    - 需要处理的图像集合。这个参数对于确定将要执行平均操作的输入数据至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- operation
    - 指定要应用于图像批次的平均操作类型，如"均值"或"中位数"。这个选择直接影响最终输出图像的结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 在输入的图像批次上应用指定平均操作后得到的输出图像。它代表了输入批次的统计摘要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BatchAverageImage:
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

    CATEGORY = "image/filters"

    def apply(self, images, operation):
        t = images.detach().clone()
        if operation == "mean":
            return (torch.mean(t, dim=0, keepdim=True),)
        elif operation == "median":
            return (torch.median(t, dim=0, keepdim=True)[0],)
        return(t,)

```
