
# Documentation
- Class name: RoundMask
- Category: KJNodes/masking
- Output node: False

RoundMask节点旨在将输入的掩码或一批掩码转换为二值掩码，有效地将值四舍五入为最接近的二进制值（0或1）。这一操作对于需要清晰、明确的掩码边界而不需要渐变的任务至关重要。

# Input types
## Required
- mask
    - 需要被四舍五入为二值的输入掩码或一批掩码。这对于在各种图像处理任务中实现清晰和明确的掩码边界至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- mask
    - 输出是二值掩码或一批二值掩码，其中每个像素值都被四舍五入到最接近的二进制值（0或1），确保了清晰和明确的边界。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RoundMask:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "mask": ("MASK",),  
        }}

    RETURN_TYPES = ("MASK",)
    FUNCTION = "round"
    CATEGORY = "KJNodes/masking"
    DESCRIPTION = """
Rounds the mask or batch of masks to a binary mask.  
<img src="https://github.com/kijai/ComfyUI-KJNodes/assets/40791699/52c85202-f74e-4b96-9dac-c8bda5ddcc40" width="300" height="250" alt="RoundMask example">

"""

    def round(self, mask):
        mask = mask.round()
        return (mask,)

```
