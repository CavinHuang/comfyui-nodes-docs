
# Documentation
- Class name: easy XYInputs: ControlNet
- Category: EasyUse/XY Inputs
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

此节点旨在简化控制网络参数的应用过程,使用户能够在一系列值上动态调整图像处理,基于控制网络的强度和位置。它为实验不同的控制网络配置提供了一个多功能工具,增强了微调图像生成或修改任务的能力。

# Input types
## Required
- control_net_name
    - 指定要应用的控制网络的名称。这个参数对于识别操作过程中要使用哪种控制网络配置至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- image
    - 将要应用控制网络调整的图像。这个参数是节点功能的核心,作为后续控制网络操作的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- target_parameter
    - 确定要变化的特定控制网络参数,如强度或位置,指导节点的处理和输出生成。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- batch_count
    - 定义要生成的变体数量,允许在单次操作中探索一系列控制网络调整。
    - Comfy dtype: INT
    - Python dtype: int
- first_strength
    - 设置控制网络的起始强度值,标记强度调整范围的开始。
    - Comfy dtype: FLOAT
    - Python dtype: float
- last_strength
    - 设置控制网络的结束强度值,标记强度调整范围的结束。
    - Comfy dtype: FLOAT
    - Python dtype: float
- first_start_percent
    - 指定控制网络应用的起始百分比,定义沿图像轴的初始效果点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- last_start_percent
    - 指定控制网络应用的结束百分比,定义沿图像轴的最终效果点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- first_end_percent
    - 确定控制网络效果的起始结束百分比,建立控制网络影响的初始边界。
    - Comfy dtype: FLOAT
    - Python dtype: float
- last_end_percent
    - 确定控制网络效果的结束结束百分比,建立控制网络影响的最终边界。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength
    - 要应用的控制网络效果的强度,影响控制网络对图像的影响强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_percent
    - 控制网络应用的起始百分比,指示控制网络对图像效果的初始点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - 控制网络应用的结束百分比,指示控制网络对图像效果的最终点。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- X or Y
    - 基于指定的控制网络参数输出一系列值或配置,便于探索和微调图像处理任务。
    - Comfy dtype: X_Y
    - Python dtype: List[Tuple[str, torch.Tensor, float, float, float]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_Control_Net:
    parameters = ["strength", "start_percent", "end_percent"]
    @classmethod
    def INPUT_TYPES(cls):
        def get_file_list(filenames):
            return [file for file in filenames if file != "put_models_here.txt" and "lllite" not in file]

        return {
            "required": {
                "control_net_name": (get_file_list(folder_paths.get_filename_list("controlnet")),),
                "image": ("IMAGE",),
                "target_parameter": (cls.parameters,),
                "batch_count": ("INT", {"default": 3, "min": 1, "max": 30}),
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
        }

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, control_net_name, image, target_parameter, batch_count, first_strength, last_strength, first_start_percent,
                 last_start_percent, first_end_percent, last_end_percent, strength, start_percent, end_percent):

        axis, = None,

        values = []

        if target_parameter == "strength":
            axis = "advanced: ControlNetStrength"

            values.append([(control_net_name, image, first_strength, start_percent, end_percent)])
            strength_increment = (last_strength - first_strength) / (batch_count - 1) if batch_count > 1 else 0
            for i in range(1, batch_count - 1):
                values.append([(control_net_name, image, first_strength + i * strength_increment, start_percent,
                                end_percent)])
            if batch_count > 1:
                values.append([(control_net_name, image, last_strength, start_percent, end_percent)])

        elif target_parameter == "start_percent":
            axis = "advanced: ControlNetStart%"

            percent_increment = (last_start_percent - first_start_percent) / (batch_count - 1) if batch_count > 1 else 0
            values.append([(control_net_name, image, strength, first_start_percent, end_percent)])
            for i in range(1, batch_count - 1):
                values.append([(control_net_name, image, strength, first_start_percent + i * percent_increment,
                                  end_percent)])

            # Always add the last start_percent if batch_count is more than 1.
            if batch_count > 1:
                values.append((control_net_name, image, strength, last_start_percent, end_percent))

        elif target_parameter == "end_percent":
            axis = "advanced: ControlNetEnd%"

            percent_increment = (last_end_percent - first_end_percent) / (batch_count - 1) if batch_count > 1 else 0
            values.append([(control_net_name, image, image, strength, start_percent, first_end_percent)])
            for i in range(1, batch_count - 1):
                values.append([(control_net_name, image, strength, start_percent,
                                  first_end_percent + i * percent_increment)])

            if batch_count > 1:
                values.append([(control_net_name, image, strength, start_percent, last_end_percent)])


        return ({"axis": axis, "values": values},)

```
