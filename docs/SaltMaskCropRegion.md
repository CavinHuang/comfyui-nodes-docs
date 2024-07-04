
# Documentation
- Class name: SaltMaskCropRegion
- Category: SALT/Masking/Process
- Output node: False

SaltMaskCropRegion节点专注于根据指定标准（如主导或少数区域）裁剪掩码内的区域，并在这些区域周围应用填充。它旨在通过隔离和调整特定区域的大小来优化掩码数据，从而便于对基于掩码的数据进行有针对性的分析或操作。

# Input types
## Required
- masks
    - 'masks'参数表示要裁剪的输入掩码。它对于确定每个掩码中符合指定裁剪标准的区域至关重要，直接影响输出的裁剪掩码。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- padding
    - 'padding'参数指定在裁剪区域周围添加的填充量。它通过扩展裁剪区域来影响输出裁剪掩码的大小，从而使掩码的使用更加灵活。
    - Comfy dtype: INT
    - Python dtype: int
- region_type
    - 'region_type'参数决定裁剪标准，在掩码中选择"主导"或"少数"区域。这个选择引导裁剪过程，使输出针对特定的感兴趣区域。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- cropped_masks
    - 应用指定裁剪和填充后的裁剪掩码，可用于进一步处理或分析。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- crop_data_batch
    - 详细说明所执行裁剪操作的数据批次，包括裁剪区域的尺寸和位置。
    - Comfy dtype: CROP_DATA_BATCH
    - Python dtype: List[Dict]
- top_int
    - 裁剪区域的顶部边界整数值。
    - Comfy dtype: INT
    - Python dtype: int
- left_int
    - 裁剪区域的左侧边界整数值。
    - Comfy dtype: INT
    - Python dtype: int
- right_int
    - 裁剪区域的右侧边界整数值。
    - Comfy dtype: INT
    - Python dtype: int
- bottom_int
    - 裁剪区域的底部边界整数值。
    - Comfy dtype: INT
    - Python dtype: int
- width_int
    - 根据裁剪数据计算得出的裁剪区域宽度整数值。
    - Comfy dtype: INT
    - Python dtype: int
- height_int
    - 根据裁剪数据计算得出的裁剪区域高度整数值。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskCropRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
                "padding": ("INT",{"default": 24, "min": 0, "max": 4096, "step": 1}),
                "region_type": (["dominant", "minority"],),
            }
        }
    
    RETURN_TYPES = ("MASK", "CROP_DATA_BATCH", "INT", "INT", "INT", "INT", "INT", "INT")
    RETURN_NAMES = ("cropped_masks", "crop_data_batch", "top_int", "left_int", "right_int", "bottom_int", "width_int", "height_int")
    
    FUNCTION = "mask_crop_region"
    CATEGORY = f"{NAME}/Masking/Process"
    
    def mask_crop_region(self, masks, padding=24, region_type="dominant"):
        N = len(masks)
        cropped_masks = []
        crop_data_list = []
        master_size = None
        
        for n in range(N):
            mask = masks[n]
            mask_pil = mask2pil(mask.unsqueeze(0))
            if not master_size:
                master_size = mask_pil.size
            region_mask, crop_data = MaskFilters.crop_region(mask_pil, region_type, padding)
            region_mask = region_mask.resize(master_size)
            region_tensor = pil2mask(region_mask)
            cropped_masks.append(region_tensor)
            crop_data_list.append(crop_data)

        cropped_masks_batch = torch.cat(cropped_masks, dim=0)

        return (cropped_masks_batch, crop_data_list)

```
