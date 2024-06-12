---
tags:
- Contour
- Image
---

# Get Contour from list
## Documentation
- Class name: `Get Contour from list`
- Category: `Bmad/CV/Contour`
- Output node: `False`

This node is designed to retrieve a specific contour from a list of contours based on a given index. It abstracts the process of accessing contours within a collection, facilitating the extraction of individual contour data for further processing or analysis.
## Input types
### Required
- **`contours`**
    - Represents the list of contours from which a specific contour is to be retrieved. It is crucial for selecting the desired contour for further operations.
    - Comfy dtype: `CV_CONTOURS`
    - Python dtype: `List[Tuple[int, int]]`
- **`index`**
    - Specifies the position of the contour to be retrieved from the list. It determines which contour is selected for output, allowing for targeted extraction based on order.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`cv_contour`**
    - Comfy dtype: `CV_CONTOUR`
    - The output is a single contour selected from the input list based on the specified index. It enables focused analysis or manipulation of a specific contour.
    - Python dtype: `Tuple[int, int]`
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
