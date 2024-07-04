
# Documentation
- Class name: AV_ControlNetEfficientStacker
- Category: Art Venture/Loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AV_ControlNetEfficientStacker节点旨在简化图像处理流程中控制网络的整合和管理。它通过允许基于预定义标准进行动态选择、应用预处理步骤以及调整控制网络强度和分辨率，实现了控制网络的高效堆叠，从而增强了图像处理任务的灵活性和有效性。

# Input types
## Required
- control_net_name
    - 指定要使用的控制网络名称，包括基于模型版本自动选择的选项。该参数对于确定适当的控制网络和图像预处理要求至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- image
    - 待处理的输入图像。此参数至关重要，因为它作为应用控制网络转换的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- strength
    - 定义控制网络对图像影响的强度，允许对图像属性进行精细调整。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_percent
    - 指定控制网络效果的起始百分比，允许逐步应用于图像。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - 指定控制网络效果的结束百分比，实现对网络影响衰减的精确控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- preprocessor
    - 指定在应用控制网络之前对图像进行预处理的方法，确保图像处于最佳格式以便进行操作。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- cnet_stack
    - 可选的控制网络堆栈。这允许叠加多个控制网络以实现复杂的图像转换。
    - Comfy dtype: CONTROL_NET_STACK
    - Python dtype: Optional[List[Tuple[Any]]]
- control_net_override
    - 允许手动覆盖选定的控制网络，提供控制网络选择的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- timestep_keyframe
    - 可选地指定控制网络的关键帧，实现对图像处理过程的时间控制。
    - Comfy dtype: TIMESTEP_KEYFRAME
    - Python dtype: Optional[str]
- resolution
    - 设置图像处理的分辨率，允许控制输出图像的细节级别。
    - Comfy dtype: INT
    - Python dtype: int
- enabled
    - 用于启用或禁用控制网络处理的标志，提供了一种简单的方法来绕过控制网络应用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- CNET_STACK
    - Comfy dtype: CONTROL_NET_STACK
    - 该输出代表处理后的控制网络堆栈，可用于后续的图像处理步骤。
    - Python dtype: unknown


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVControlNetEfficientStacker:
    controlnets = folder_paths.get_filename_list("controlnet")
    preprocessors = list(control_net_preprocessors.keys())

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
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
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

    RETURN_TYPES = ("CONTROL_NET_STACK",)
    RETURN_NAMES = ("CNET_STACK",)
    FUNCTION = "control_net_stacker"
    CATEGORY = "Art Venture/Loaders"

    def control_net_stacker(
        self,
        control_net_name: str,
        image,
        strength,
        start_percent,
        end_percent,
        preprocessor,
        cnet_stack=None,
        control_net_override="None",
        timestep_keyframe=None,
        resolution=512,
        enabled=True,
    ):
        if not enabled:
            return (cnet_stack,)

        # If control_net_stack is None, initialize as an empty list
        if cnet_stack is None:
            cnet_stack = []

        if control_net_name.startswith("Auto: "):
            assert preprocessor != "None", "preprocessor must be set when using Auto mode"

            sd_version = control_net_name[len("Auto: ") :]
            control_net_name = detect_controlnet(preprocessor, sd_version)

        control_net = load_controlnet(control_net_name, control_net_override, timestep_keyframe=timestep_keyframe)

        # Extend the control_net_stack with the new tuple
        if control_net is not None:
            image = apply_preprocessor(image, preprocessor, resolution=resolution)
            cnet_stack.extend([(control_net, image, strength, start_percent, end_percent)])

        return (cnet_stack,)

```
