# Documentation
- Class name: LoopStart_IMAGE
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

该节点促进了循环结构的启动，使得能够迭代处理图像数据。在需要重复应用操作进行图像操作或分析的场景中，它的作用至关重要。

# Input types
## Required
- first_loop
    - 循环中的第一个元素，为后续迭代设置了初始状态。它至关重要，因为它决定了循环操作的起点和性质。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
## Optional
- loop
    - 代表循环的延续，允许操作的链接。它重要因为它使得循环的进展和复杂图像处理任务的处理成为可能。
    - Comfy dtype: LOOP
    - Python dtype: None

# Output types
- IMAGE
    - 输出是循环对图像数据操作的结果，包含了迭代过程累积效应的封装。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class LoopStart_IMAGE:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'first_loop': ('IMAGE',), 'loop': ('LOOP',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'run'
    CATEGORY = 'DragNUWA'

    def run(self, first_loop, loop):
        if hasattr(loop, 'next'):
            return (loop.next,)
        return (first_loop,)

    @classmethod
    def IS_CHANGED(s, first_loop, loop):
        if hasattr(loop, 'next'):
            return id(loop.next)
        return float('NaN')
```