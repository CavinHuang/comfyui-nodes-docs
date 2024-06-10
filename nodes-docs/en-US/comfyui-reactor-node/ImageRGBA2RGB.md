---
tags:
- Image
---

# Convert RGBA to RGB 🌌 ReActor
## Documentation
- Class name: `ImageRGBA2RGB`
- Category: `🌌 ReActor`
- Output node: `False`

The ImageRGBA2RGB node is designed to convert images from RGBA (Red, Green, Blue, Alpha) format to RGB format. This conversion process involves removing the alpha channel from the image, effectively transforming images with transparency information into standard RGB images without transparency.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image in RGBA format that needs to be converted to RGB. This parameter is crucial for the node's operation as it directly influences the conversion process and the resulting RGB image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The 'image' output parameter represents the converted image in RGB format, after the alpha channel from the original RGBA image has been removed.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
