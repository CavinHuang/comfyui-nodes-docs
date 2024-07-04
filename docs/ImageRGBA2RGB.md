
# Documentation
- Class name: ImageRGBA2RGB
- Category: 🌌 ReActor
- Output node: False

ImageRGBA2RGB节点旨在将RGBA（红、绿、蓝、透明度）格式的图像转换为RGB格式。此转换过程涉及移除图像的alpha通道，实际上将具有透明度信息的图像转换为不含透明度的标准RGB图像。

# Input types
## Required
- image
    - 'image'参数表示需要转换为RGB的RGBA格式输入图像。此参数对节点的操作至关重要，因为它直接影响转换过程和最终的RGB图像结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 'image'输出参数表示转换后的RGB格式图像，即原始RGBA图像的alpha通道被移除后的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
