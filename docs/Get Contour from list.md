
# Documentation
- Class name: Get Contour from list
- Category: Bmad/CV/Contour
- Output node: False

该节点旨在根据给定的索引从轮廓列表中检索特定轮廓。它抽象了访问集合中轮廓的过程，便于提取单个轮廓数据以进行进一步处理或分析。

# Input types
## Required
- contours
    - 表示要从中检索特定轮廓的轮廓列表。对于选择所需的轮廓以进行进一步操作至关重要。
    - Comfy dtype: CV_CONTOURS
    - Python dtype: List[Tuple[int, int]]
- index
    - 指定要从列表中检索的轮廓的位置。它决定了选择输出的轮廓，允许基于顺序进行有针对性的提取。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- cv_contour
    - 输出是根据指定索引从输入列表中选择的单个轮廓。它支持对特定轮廓进行聚焦分析或操作。
    - Comfy dtype: CV_CONTOUR
    - Python dtype: Tuple[int, int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GetContourFromList:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "contours": ("CV_CONTOURS",),
                "index": ("INT", {"default": 0, "min": 0, "step": 1})
            }
        }

    RETURN_TYPES = ("CV_CONTOUR",)
    FUNCTION = "get_contour"
    CATEGORY = "Bmad/CV/Contour"

    def get_contour(self, contours, index):
        if index >= len(contours):
            return (None,)
        return (contours[index],)

```
