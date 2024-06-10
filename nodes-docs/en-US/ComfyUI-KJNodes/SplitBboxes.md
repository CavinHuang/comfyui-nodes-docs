---
tags:
- BoundingBox
- Image
- ImageTransformation
---

# SplitBboxes
## Documentation
- Class name: `SplitBboxes`
- Category: `KJNodes/masking`
- Output node: `False`

The SplitBboxes node is designed to divide a list of bounding boxes (bboxes) into two separate lists at a specified index. This functionality is essential for processing and manipulating bounding box data in various computer vision tasks, enabling targeted operations on segmented portions of the data.
## Input types
### Required
- **`bboxes`**
    - The 'bboxes' parameter represents the list of bounding boxes to be split. It is crucial for determining the segments of data to be processed and divided at the specified index.
    - Comfy dtype: `BBOX`
    - Python dtype: `List[Tuple[int, int, int, int]]`
- **`index`**
    - The 'index' parameter specifies the position at which the list of bounding boxes should be split. It plays a pivotal role in dividing the bounding box list into two distinct parts.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`bboxes_a`**
    - Comfy dtype: `BBOX`
    - The first output list of bounding boxes, containing elements from the start of the original list up to (but not including) the specified index.
    - Python dtype: `List[Tuple[int, int, int, int]]`
- **`bboxes_b`**
    - Comfy dtype: `BBOX`
    - The second output list of bounding boxes, starting from the specified index to the end of the original list.
    - Python dtype: `List[Tuple[int, int, int, int]]`
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
