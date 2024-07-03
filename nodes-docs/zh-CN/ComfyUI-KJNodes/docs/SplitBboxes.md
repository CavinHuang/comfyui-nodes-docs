
# Documentation
- Class name: SplitBboxes
- Category: KJNodes/masking
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SplitBboxes节点用于将一组边界框(bboxes)列表在指定索引处分割成两个独立的列表。这一功能在各种计算机视觉任务中对边界框数据进行处理和操作时至关重要，能够对数据的特定部分进行针对性操作。

# Input types
## Required
- bboxes
    - bboxes参数代表需要被分割的边界框列表。它对于确定要在指定索引处处理和划分的数据段至关重要。
    - Comfy dtype: BBOX
    - Python dtype: List[Tuple[int, int, int, int]]
- index
    - index参数指定了边界框列表应该被分割的位置。它在将边界框列表划分为两个不同部分的过程中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- bboxes_a
    - 第一个输出的边界框列表，包含原始列表从开始到指定索引（不包括该索引）的元素。
    - Comfy dtype: BBOX
    - Python dtype: List[Tuple[int, int, int, int]]
- bboxes_b
    - 第二个输出的边界框列表，包含从指定索引到原始列表末尾的元素。
    - Comfy dtype: BBOX
    - Python dtype: List[Tuple[int, int, int, int]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SplitBboxes:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "bboxes": ("BBOX",),
                "index": ("INT", {"default": 0,"min": 0, "max": 99999999, "step": 1}),
            },
        }

    RETURN_TYPES = ("BBOX","BBOX",)
    RETURN_NAMES = ("bboxes_a","bboxes_b",)
    FUNCTION = "splitbbox"
    CATEGORY = "KJNodes/masking"
    DESCRIPTION = """
Splits the specified bbox list at the given index into two lists.
"""

    def splitbbox(self, bboxes, index):
        bboxes_a = bboxes[:index]  # Sub-list from the start of bboxes up to (but not including) the index
        bboxes_b = bboxes[index:]  # Sub-list from the index to the end of bboxes

        return (bboxes_a, bboxes_b,)

```
