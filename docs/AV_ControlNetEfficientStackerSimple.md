
# Documentation
- Class name: AV_ControlNetEfficientStackerSimple
- Category: Art Venture/Loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点旨在简化控制网络堆叠过程，用于图像操作。它能够基于指定参数将多个控制网络变换应用于图像，从而简化了控制网络在图像处理流程中的集成，注重效率和易用性。

# Input types
## Required
- control_net_name
    - 指定要应用的控制网络。包括基于模型版本自动选择或从可用控制网络中自定义选择的选项，影响控制网络的行为和输出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- image
    - 要由控制网络堆栈处理的输入图像。它作为后续控制网络应用的基础，决定了图像操作过程的初始状态。
    - Comfy dtype: IMAGE
    - Python dtype: IMAGE
- strength
    - 定义控制网络对图像的影响强度，允许对控制网络应用的影响进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- preprocessor
    - 选择在控制网络之前应用的预处理器，影响图像的准备过程，潜在地影响其与控制网络的兼容性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
## Optional
- cnet_stack
    - 可选的控制网络堆栈，用于顺序应用。这允许在图像上叠加多个控制网络效果。
    - Comfy dtype: CONTROL_NET_STACK
    - Python dtype: CONTROL_NET_STACK
- control_net_override
    - 用指定的控制网络覆盖所选控制网络，为尝试不同控制网络提供灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- timestep_keyframe
    - 指定控制网络应用的关键帧，实现对效果应用的动态控制。
    - Comfy dtype: TIMESTEP_KEYFRAME
    - Python dtype: TIMESTEP_KEYFRAME
- resolution
    - 设置图像处理的分辨率，影响控制网络应用的细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- enabled
    - 切换控制网络堆叠器的操作，允许根据需要启用或禁用它。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- CNET_STACK
    - 处理后的控制网络堆栈结果。这个输出封装了对图像执行的控制网络应用序列，反映了指定变换的累积效果。
    - Comfy dtype: CONTROL_NET_STACK
    - Python dtype: CONTROL_NET_STACK


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVControlNetEfficientStackerSimple(AVControlNetEfficientStacker):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "control_net_name": (["None", "Auto: sd15", "Auto: sdxl", "Auto: sdxl_t2i"] + s.controlnets,),
                "image": ("IMAGE",),
                "strength": (
                    "FLOAT",
                    {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01},
                ),
                "preprocessor": (["None"] + s.preprocessors,),
            },
            "optional": {
                "cnet_stack": ("CONTROL_NET_STACK",),
                "control_net_override": ("STRING", {"default": "None"}),
                "timestep_keyframe": ("TIMESTEP_KEYFRAME",),
                "resolution": ("INT", {"default": 512, "min": 64, "max": 2048, "step": 64}),
                "enabled": ("BOOLEAN", {"default": True}),
            },
        }

    FUNCTION = "control_net_stacker_simple"

    def control_net_stacker_simple(
        self,
        *args,
        **kwargs,
    ):
        return self.control_net_stacker(*args, start_percent=0.0, end_percent=1.0, **kwargs)

```
