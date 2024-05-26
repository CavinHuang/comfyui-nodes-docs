# Documentation
- Class name: LoopEnd_IMAGE
- Category: DragNUWA
- Output node: True
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

该节点在处理循环中协调图像数据的流转，确保指定的图像被传递到后续环节进行进一步的分析或处理。

# Input types
## Required
- send_to_next_loop
    - 即将被路由到循环下一阶段的图像数据，在图像处理工作流的连续性和进展中起着关键作用。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- loop
    - 正在被操作以控制图像数据流的循环结构，对于在循环内部建立操作序列至关重要。
    - Comfy dtype: LOOP
    - Python dtype: Any

# Output types
- return
    - 此输出表示节点功能的完成，图像数据已成功导向到下一个循环片段。
    - Comfy dtype: VOID
    - Python dtype: None

# Usage tips
- Infra type: CPU

# Source code
```
class LoopEnd_IMAGE:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'send_to_next_loop': ('IMAGE',), 'loop': ('LOOP',)}}
    RETURN_TYPES = ()
    FUNCTION = 'run'
    CATEGORY = 'DragNUWA'
    OUTPUT_NODE = True

    def run(self, send_to_next_loop, loop):
        loop.next = send_to_next_loop
        return ()
```