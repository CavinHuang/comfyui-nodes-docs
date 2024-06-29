---
tags:
- List
---

# ToImageList
## Documentation
- Class name: `ToImageList`
- Category: `Bmad/Lists/Make or Intercalate`
- Output node: `False`

The ToImageList node is designed to convert a collection of images into a standardized list format. This functionality is essential for processing multiple images in a uniform manner, enabling easier manipulation, analysis, and application of image-based operations across the entire collection.
## Input types
### Required
- **`inputs_len`**
    - The 'inputs_len' parameter represents the collection of images to be converted into a list. This input is crucial for the node's operation as it determines the set of images that will undergo the conversion process.
    - Comfy dtype: `INT`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The 'image' output is a list of images that have been converted from the input collection. This standardized format facilitates further processing and manipulation of the images.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToImageList(metaclass=MakeListMeta): TYPE = "IMAGE"

```
