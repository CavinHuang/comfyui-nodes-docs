
# Documentation
- Class name: XY Input: Control Net
- Category: Efficiency Nodes/XY Inputs
- Output node: False

该节点旨在生成和操作用于控制网络的XY输入数据，方便探索不同控制参数（如强度、起始百分比和结束百分比）在图像批次中的变化。它动态调整控制网络参数以优化图像生成，支持复杂的条件设置场景，并能够对控制网络效果进行详细分析和可视化。

# Input types
## Required
- control_net
    - 要应用或在图像批次中操作的控制网络配置，是决定对生成图像影响的核心。
    - Comfy dtype: CONTROL_NET
    - Python dtype: object
- image
    - 应用控制网络参数的图像或图像批次，作为控制网络效果分析的基础。
    - Comfy dtype: IMAGE
    - Python dtype: object
- target_parameter
    - 在批次中要变化的特定控制网络参数，如强度、起始百分比或结束百分比，用于指导生成过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- batch_count
    - 指定给定控制参数要生成的变化数量，用于详细探索其影响。
    - Comfy dtype: INT
    - Python dtype: int
- first_strength
    - 控制网络参数变化的初始强度值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- last_strength
    - 控制网络参数变化的最终强度值，允许进行一系列调整。
    - Comfy dtype: FLOAT
    - Python dtype: float
- first_start_percent
    - 控制网络参数变化的初始起始百分比值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- last_start_percent
    - 控制网络参数变化的最终起始百分比值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- first_end_percent
    - 控制网络参数变化的初始结束百分比值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- last_end_percent
    - 控制网络参数变化的最终结束百分比值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength
    - 应用于控制网络的强度级别，影响其作用的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_percent
    - 控制网络效果的起始百分比，决定其初始影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - 控制网络效果的结束百分比，决定其最终影响。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Optional
- cnet_stack
    - 可选的额外控制网络配置堆栈，允许多个控制网络的分层或顺序应用。
    - Comfy dtype: CONTROL_NET_STACK
    - Python dtype: object

# Output types
- X or Y
    - 基于控制网络参数生成的X轴或Y轴值，结构化以便集成到可视化或分析工具中。
    - Comfy dtype: XY
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_Control_Net(TSC_XYplot_Control_Net_Strength, TSC_XYplot_Control_Net_Start, TSC_XYplot_Control_Net_End):
    parameters = ["strength", "start_percent", "end_percent"]
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "control_net": ("CONTROL_NET",),
                "image": ("IMAGE",),
                "target_parameter": (cls.parameters,),
                "batch_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM}),
                "first_strength": ("FLOAT", {"default": 0.0, "min": 0.00, "max": 10.0, "step": 0.01}),
                "last_strength": ("FLOAT", {"default": 1.0, "min": 0.00, "max": 10.0, "step": 0.01}),
                "first_start_percent": ("FLOAT", {"default": 0.0, "min": 0.00, "max": 1.0, "step": 0.01}),
                "last_start_percent": ("FLOAT", {"default": 1.0, "min": 0.00, "max": 1.0, "step": 0.01}),
                "first_end_percent": ("FLOAT", {"default": 0.0, "min": 0.00, "max": 1.0, "step": 0.01}),
                "last_end_percent": ("FLOAT", {"default": 1.0, "min": 0.00, "max": 1.0, "step": 0.01}),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.00, "max": 10.0, "step": 0.01}),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.00, "max": 1.0, "step": 0.01}),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.00, "max": 1.0, "step": 0.01}),
            },
            "optional": {"cnet_stack": ("CONTROL_NET_STACK",)},
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, control_net, image, target_parameter, batch_count, first_strength, last_strength, first_start_percent,
                 last_start_percent, first_end_percent, last_end_percent, strength, start_percent, end_percent, cnet_stack=None):

        if target_parameter == "strength":
            return TSC_XYplot_Control_Net_Strength.xy_value(self, control_net, image, batch_count, first_strength,
                                                            last_strength, start_percent, end_percent, cnet_stack=cnet_stack)
        elif target_parameter == "start_percent":
            return TSC_XYplot_Control_Net_Start.xy_value(self, control_net, image, batch_count, first_start_percent,
                                                         last_start_percent, strength, end_percent, cnet_stack=cnet_stack)
        elif target_parameter == "end_percent":
            return TSC_XYplot_Control_Net_End.xy_value(self, control_net, image, batch_count, first_end_percent,
                                                       last_end_percent, strength, start_percent, cnet_stack=cnet_stack)

```
