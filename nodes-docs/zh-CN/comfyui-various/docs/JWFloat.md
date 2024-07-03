
# Documentation
- Class name: JWFloat
- Category: jamesWalker55
- Output node: False

该节点专门用于处理浮点运算，为涉及浮点值的计算或操作提供平台。它专注于在给定工作流程中实现精确的数值计算和转换。

# Input types
## Required
- value
    - 表示要由节点处理或操作的浮点值。它对于执行特定于浮点数的操作至关重要，直接影响节点功能的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - Comfy dtype: FLOAT
    - 输出是一个浮点值，是节点对输入浮点数进行操作的结果。这个输出对于工作流程中进一步的数值计算或分析至关重要。
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)
    - ezMath
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)
    - Reroute
    - workflow/IP Adapter full bundle



## Source code
```python
        @register_node(identifier, display_name)
        class _:
            CATEGORY = category
            INPUT_TYPES = lambda: {"required": required_inputs}
            RETURN_TYPES = tuple(return_types)
            OUTPUT_NODE = output_node
            FUNCTION = "execute"

            def execute(self, *args, **kwargs):
                return func(*args, **kwargs)

```
