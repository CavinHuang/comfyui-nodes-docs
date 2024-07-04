
# Documentation
- Class name: PainterNode
- Category: AlekPet Nodes/image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

PainterNode 被设计用于处理图像,主要通过应用变换并生成相应的蒙版(如适用)。它专注于为进一步处理或可视化准备图像,包括调整图像格式、方向和比例。

# Input types
## Required
- image
    - image 参数指定要处理的图像文件。它对确定将要进行变换和潜在蒙版生成的输入图像至关重要,直接影响节点的输出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输出的 image 代表经过变换和适当格式化的输入图像版本,为进一步处理或可视化做好了准备。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 输出的 mask 提供与输入图像相关的蒙版,对于需要区分图像前景和背景的各种图像处理任务非常有用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [Image Batch](../../was-node-suite-comfyui/Nodes/Image Batch.md)
    - [ImageScale](../../Comfy/Nodes/ImageScale.md)



## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
