---
tags:
- Batch
- Image
- ImageDuplication
---

# Image Dublicator (List) 🌌 ReActor
## Documentation
- Class name: `ReActorImageDublicator`
- Category: `🌌 ReActor`
- Output node: `False`

The ReActorImageDublicator node is designed to create duplicates of images, potentially in a list format, as part of the ReActor suite. This functionality is essential for operations that require multiple instances of the same image for processing or analysis, enhancing the workflow within image manipulation and augmentation tasks.
## Input types
### Required
- **`image`**
    - Specifies the original image to be duplicated.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`count`**
    - Determines the number of duplicates to be created from the original image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`IMAGES`**
    - Comfy dtype: `IMAGE`
    - Returns a list of duplicated images based on the specified count.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
