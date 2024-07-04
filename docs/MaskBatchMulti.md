
# Documentation
- Class name: MaskBatchMulti
- Category: KJNodes/masking
- Output node: False

MaskBatchMulti节点旨在通过组合多个蒙版来创建一批图像。它允许动态调整输入数量，使得可以将可变数量的蒙版组合成单个批次。这一功能在需要聚合蒙版数据以进行进一步图像处理或分析的场景中特别有用。

# Input types
## Required
- inputcount
    - 指定要组合成单个批次的输入蒙版数量。该参数允许动态调整节点的输入容量，便于聚合不同数量的蒙版。
    - Comfy dtype: INT
    - Python dtype: int
- mask_i
    - 代表要包含在批次中的蒙版，其中'i'可以从1到'inputcount'指定的数字。每个蒙版都会对聚合批次做出贡献，从而实现复杂的蒙版组合，用于高级图像处理任务。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- masks
    - 由输入蒙版聚合而成的组合蒙版批次。这个输出对于需要批处理蒙版数据的下游图像处理任务非常有用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskBatchMulti:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "inputcount": ("INT", {"default": 2, "min": 2, "max": 1000, "step": 1}),
                "mask_1": ("MASK", ),
                "mask_2": ("MASK", ),
            },
    }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("masks",)
    FUNCTION = "combine"
    CATEGORY = "KJNodes/masking"
    DESCRIPTION = """
Creates an image batch from multiple masks.  
You can set how many inputs the node has,  
with the **inputcount** and clicking update.
"""

    def combine(self, inputcount, **kwargs):
        mask = kwargs["mask_1"]
        for c in range(1, inputcount):
            new_mask = kwargs[f"mask_{c + 1}"]
            if mask.shape[1:] != new_mask.shape[1:]:
                new_mask = F.interpolate(new_mask.unsqueeze(1), size=(mask.shape[1], mask.shape[2]), mode="bicubic").squeeze(1)
            mask = torch.cat((mask, new_mask), dim=0)
        return (mask,)

```
