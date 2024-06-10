---
tags:
- List
---

# FromListGetImages
## Documentation
- Class name: `FromListGetImages`
- Category: `Bmad/Lists/GetAll`
- Output node: `False`

The node 'FromListGetImages' is designed to retrieve a specific image from a list of images based on a given index. It enables random access to the images in the list, including the ability to access images in reverse order by using negative indexes.
## Input types
### Required
- **`list`**
    - The 'list' parameter represents the list of images from which a specific image is to be retrieved. It is essential for specifying the source of the images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - This output is the image retrieved from the specified position in the list.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetImages(metaclass=UnMakeListMeta):  TYPE = "IMAGE"

```
