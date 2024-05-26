# Documentation
- Class name: Loop
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

Loop节点类封装了迭代处理过程，能够执行一系列操作或算法的循环。它旨在方便重复任务的控制流，允许动态调整并结合用户定义的逻辑在循环结构中。

# Input types
## Required
- required
    - 该参数对于定义循环执行的条件至关重要。它作为一个守门人，确保只有满足指定要求时循环才会运行，从而影响整体的执行流程和操作结果。
    - Comfy dtype: COMBO[None]
    - Python dtype: Dict[str, Any]

# Output types
- LOOP
    - Loop节点的输出是节点本身，封装了迭代过程的结果。它代表了循环操作序列的高潮，提供了一种结构化和受控的方式来输出循环执行的最终状态。
    - Comfy dtype: NODE[Loop]
    - Python dtype: Loop

# Usage tips
- Infra type: CPU

# Source code
```
class Loop:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}}
    RETURN_TYPES = ('LOOP',)
    FUNCTION = 'run'
    CATEGORY = 'DragNUWA'

    def run(self):
        return (self,)
```