
# Documentation
- Class name: RemapMaskRange
- Category: KJNodes/masking
- Output node: False

RemapMaskRange 节点的设计目的是调整掩码中的值范围至新指定的最小值和最大值，确保掩码的值适当地缩放到这个新范围内。

# Input types
## Required
- mask
    - 需要重新映射值的掩码。这个输入对于定义将要进行范围调整的源数据至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- min
    - 指定重新映射范围中的新最小值。这个参数设置掩码值的目标范围的下限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max
    - 定义重新映射范围中的新最大值。这个参数确立掩码值的目标范围的上限。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- mask
    - 输出是值已重新映射到新指定范围的掩码，确保所有值都落在这个定义的区间内。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RemapMaskRange:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),
                "min": ("FLOAT", {"default": 0.0,"min": -10.0, "max": 1.0, "step": 0.01}),
                "max": ("FLOAT", {"default": 1.0,"min": 0.0, "max": 10.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("mask",)
    FUNCTION = "remap"
    CATEGORY = "KJNodes/masking"
    DESCRIPTION = """
Sets new min and max values for the mask.
"""

    def remap(self, mask, min, max):

         # Find the maximum value in the mask
        mask_max = torch.max(mask)
        
        # If the maximum mask value is zero, avoid division by zero by setting it to 1
        mask_max = mask_max if mask_max > 0 else 1
        
        # Scale the mask values to the new range defined by min and max
        # The highest pixel value in the mask will be scaled to max
        scaled_mask = (mask / mask_max) * (max - min) + min
        
        # Clamp the values to ensure they are within [0.0, 1.0]
        scaled_mask = torch.clamp(scaled_mask, min=0.0, max=1.0)
        
        return (scaled_mask, )

```
