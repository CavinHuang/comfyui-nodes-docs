---
tags:
- Animation
- PoseEstimation
---

# Pose Node
## Documentation
- Class name: `PoseNode`
- Category: `AlekPet Nodes/image`
- Output node: `False`

The PoseNode is designed to process images to generate their pose representations. It leverages image processing techniques to convert images into a format suitable for pose analysis, abstracting the complexity of image manipulation and conversion for pose detection tasks.
## Input types
### Required
- **`image`**
    - The 'image' parameter specifies the image file to be processed for pose detection. It plays a crucial role in the node's operation by serving as the primary input from which pose information is derived.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a tensor representation of the processed image, suitable for further analysis or visualization in pose detection tasks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
