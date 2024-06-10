---
tags:
- Mask
---

# Painter Node
## Documentation
- Class name: `PainterNode`
- Category: `AlekPet Nodes/image`
- Output node: `False`

The PainterNode is designed to process images by applying transformations and generating a corresponding mask if applicable. It focuses on preparing images for further processing or visualization by adjusting their format, orientation, and scale.
## Input types
### Required
- **`image`**
    - The 'image' parameter specifies the image file to be processed. It is crucial for determining the input image that will undergo transformations and potentially mask generation, directly influencing the node's output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The 'image' output represents the transformed and properly formatted version of the input image, ready for further processing or visualization.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The 'mask' output provides a mask associated with the input image, useful for various image processing tasks that require distinguishing the image's foreground from its background.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [Image Batch](../../was-node-suite-comfyui/Nodes/Image Batch.md)
    - [ImageScale](../../Comfy/Nodes/ImageScale.md)



## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
