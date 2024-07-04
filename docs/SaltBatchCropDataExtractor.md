
# Documentation
- Class name: SaltBatchCropDataExtractor
- Category: SALT/Masking/Process
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltBatchCropDataExtractor节点用于处理一批裁剪数据，从批次中提取特定索引的裁剪信息和尺寸。它旨在通过提供详细的指标（如宽度、高度和边界坐标）来促进裁剪数据的操作和分析。

# Input types
## Required
- crop_data_batch
    - 待处理的裁剪数据批次。它对于确定要提取的特定裁剪信息和尺寸至关重要。
    - Comfy dtype: CROP_DATA_BATCH
    - Python dtype: List[Tuple[Tuple[int, int], Tuple[int, int, int, int]]]
- index
    - 裁剪数据批次中要提取裁剪信息的索引。它决定了要处理的具体裁剪数据。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- crop_data_batch
    - 指定索引的提取裁剪数据，包括尺寸和边界坐标。
    - Comfy dtype: CROP_DATA_BATCH
    - Python dtype: List[Tuple[Tuple[int, int], Tuple[int, int, int, int]]]
- width
    - 裁剪区域的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 裁剪区域的高度。
    - Comfy dtype: INT
    - Python dtype: int
- top
    - 裁剪区域的上边界坐标。
    - Comfy dtype: INT
    - Python dtype: int
- left
    - 裁剪区域的左边界坐标。
    - Comfy dtype: INT
    - Python dtype: int
- right
    - 裁剪区域的右边界坐标。
    - Comfy dtype: INT
    - Python dtype: int
- bottom
    - 裁剪区域的下边界坐标。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltBatchCropDataExtractor:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "crop_data_batch": ("CROP_DATA_BATCH",),
                "index": ("INT", {"min": 0}),
            }
        }

    RETURN_TYPES = ("CROP_DATA_BATCH", "INT", "INT", "INT", "INT", "INT", "INT")
    RETURN_NAMES = ("crop_data_batch", "width", "height", "top", "left", "right", "bottom")

    FUNCTION = "extract"
    CATEGORY = f"{NAME}/Masking/Process"

    def extract(self, crop_data_batch, index):
        if index < 0 or index >= len(crop_data_batch):
            raise ValueError("Index out of range")

        try:
            crop_size, (crop_left, crop_top, crop_right, crop_bottom) = crop_data_batch[index]
            width = crop_right - crop_left
            height = crop_bottom - crop_top
            single_crop_data = [(crop_size, (crop_left, crop_top, crop_right, crop_bottom))]
            return single_crop_data, width, height, crop_top, crop_left, crop_right, crop_bottom
        except Exception as e:
            print(e)
            return [((0, 0), (0, 0, 0, 0))], 0, 0, 0, 0, 0, 0

```
