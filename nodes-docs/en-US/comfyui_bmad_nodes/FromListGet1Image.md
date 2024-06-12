---
tags:
- List
---

# FromListGet1Image
## Documentation
- Class name: `FromListGet1Image`
- Category: `Bmad/Lists/Get1`
- Output node: `False`

This node is designed to retrieve a single image from a list of images based on a specified index. It supports random access, including the use of negative indices to access elements from the end of the list, making it versatile for various image processing tasks.
## Input types
### Required
- **`list`**
    - The list of images from which a single image will be retrieved. This parameter is crucial for specifying the source of the images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`index`**
    - The index at which the image will be retrieved from the list. Supports negative indexing for reverse access.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The single image retrieved from the specified index in the list.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1Image(metaclass=GetSingleFromListMeta):  TYPE = "IMAGE"

```
