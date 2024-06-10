---
tags:
- List
- ListExtension
---

# ExtendImageList
## Documentation
- Class name: `ExtendImageList`
- Category: `Bmad/Lists/Extend`
- Output node: `False`

The ExtendImageList node is designed to extend an existing list of images with additional images. It focuses on aggregating multiple image resources into a single, comprehensive collection, facilitating operations that require bulk image data management.
## Input types
### Required
- **`inputs_len`**
    - The 'inputs_len' parameter is crucial for defining the starting point of the collection before new images are added. It represents the initial count of images to be extended, setting the foundation for the extension process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The 'image' parameter represents the resultant collection of images after the extension process. It encompasses both the original and newly added images, providing a unified collection for further processing.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendImageList(metaclass=ExtendListMeta): TYPE = "IMAGE"

```
