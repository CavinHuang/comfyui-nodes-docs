
# Documentation
- Class name: Control Net Stacker
- Category: Efficiency Nodes/Stackers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Control Net Stacker 节点旨在将控制网络及其相关的图像、强度和百分比范围聚合成一个堆栈。这一功能对于以序列或分层方式管理和应用多个控制网络至关重要，从而提高图像处理过程的灵活性和效率。

# Input types
## Required
- control_net
    - 要添加到堆栈中的控制网络。它在定义要应用于图像的操作或调整方面起着核心作用。
    - Comfy dtype: CONTROL_NET
    - Python dtype: str
- image
    - 与控制网络相关联的图像。该图像作为控制网络应用的参考或目标。
    - Comfy dtype: IMAGE
    - Python dtype: str
- strength
    - 定义控制网络对图像影响的强度，允许进行精细调整。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_percent
    - 指定控制网络效果在图像生成过程中的起始点，实现对应用时机的精确控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - 确定控制网络效果的结束点，进一步细化应用的时间精度。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- cnet_stack
    - 现有的控制网络堆栈，新的控制网络将被添加到其中，便于累积多个网络。
    - Comfy dtype: CONTROL_NET_STACK
    - Python dtype: list

# Output types
- CNET_STACK
    - 更新后的控制网络堆栈，每个网络都与特定的图像、强度和百分比范围相关联，准备进行顺序或分层应用。
    - Comfy dtype: CONTROL_NET_STACK
    - Python dtype: list


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Efficient Loader](../../efficiency-nodes-comfyui/Nodes/Efficient Loader.md)



## Source code
```python
class TSC_Control_Net_Stacker:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"control_net": ("CONTROL_NET",),
                             "image": ("IMAGE",),
                             "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                             "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                             "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001})},
                "optional": {"cnet_stack": ("CONTROL_NET_STACK",)},
                }

    RETURN_TYPES = ("CONTROL_NET_STACK",)
    RETURN_NAMES = ("CNET_STACK",)
    FUNCTION = "control_net_stacker"
    CATEGORY = "Efficiency Nodes/Stackers"

    def control_net_stacker(self, control_net, image, strength, start_percent, end_percent, cnet_stack=None):
        # If control_net_stack is None, initialize as an empty list
        cnet_stack = [] if cnet_stack is None else cnet_stack

        # Extend the control_net_stack with the new tuple
        cnet_stack.extend([(control_net, image, strength, start_percent, end_percent)])

        return (cnet_stack,)

```
