
# Documentation
- Class name: Apply ControlNet Stack
- Category: Efficiency Nodes/Stackers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Apply ControlNet Stack节点旨在通过应用一系列控制网络来增强正面和负面提示的条件。这个过程允许根据指定的控制网络、图像和强度参数动态调整提示，从而优化条件以实现更有针对性和更有效的生成结果。

# Input types
## Required
- positive
    - 需要调节的正面提示。它作为控制网络堆栈应用的初始输入，影响生成过程朝向期望的属性或主题。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict]]
- negative
    - 需要调节的负面提示。它作为正面提示的对应项，引导生成过程远离不期望的属性或主题。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict]]
## Optional
- cnet_stack
    - 一个可选的控制网络堆栈及相关参数，按顺序应用于正面和负面提示。这个堆栈能够实现复杂的、多层次的条件调整。
    - Comfy dtype: CONTROL_NET_STACK
    - Python dtype: Optional[List[Tuple[ControlNet, torch.Tensor, float, float, float]]]

# Output types
- CONDITIONING+
    - 经过控制网络堆栈应用后的条件化正面提示。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict]]
- CONDITIONING-
    - 经过控制网络堆栈应用后的条件化负面提示。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_Apply_ControlNet_Stack:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"positive": ("CONDITIONING",),
                             "negative": ("CONDITIONING",)},
                "optional": {"cnet_stack": ("CONTROL_NET_STACK",)}
                }

    RETURN_TYPES = ("CONDITIONING","CONDITIONING",)
    RETURN_NAMES = ("CONDITIONING+","CONDITIONING-",)
    FUNCTION = "apply_cnet_stack"
    CATEGORY = "Efficiency Nodes/Stackers"

    def apply_cnet_stack(self, positive, negative, cnet_stack=None):
        if cnet_stack is None:
            return (positive, negative)

        for control_net_tuple in cnet_stack:
            control_net, image, strength, start_percent, end_percent = control_net_tuple
            controlnet_conditioning = ControlNetApplyAdvanced().apply_controlnet(positive, negative, control_net, image,
                                                                                 strength, start_percent, end_percent)
            positive, negative = controlnet_conditioning[0], controlnet_conditioning[1]

        return (positive, negative, )

```
