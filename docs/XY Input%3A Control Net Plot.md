
# Documentation
- Class name: XY Input: Control Net Plot
- Category: Efficiency Nodes/XY Inputs
- Output node: False

这个节点旨在基于控制网络参数在指定范围内生成一系列用于绘图的值。它动态调整输入参数，如强度、起始百分比和结束百分比，以创建适合XY绘图的数据集，便于可视化这些参数变化如何影响控制网络的输出。

# Input types
## Required
- control_net
    - 表示正在调整其参数用于绘图的控制网络。它是确定XY图输出值的核心。
    - Comfy dtype: CONTROL_NET
    - Python dtype: object
- image
    - 与控制网络一起影响XY图生成值的图像输入。
    - Comfy dtype: IMAGE
    - Python dtype: object
- plot_type
    - 指定要生成的图表类型，表明X和Y值如何派生并相互关联。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength
    - 应用于控制网络的强度参数，影响图表的输出值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_percent
    - 起始百分比值，表示图表X轴或Y轴范围的起始点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - 结束百分比值，表示图表X轴或Y轴范围的终点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- X_batch_count
    - 指定为图表X轴生成的数据点数量，影响其精细度。
    - Comfy dtype: INT
    - Python dtype: int
- X_first_value
    - 图表X轴的起始值，标记要可视化范围的开始。
    - Comfy dtype: FLOAT
    - Python dtype: float
- X_last_value
    - 图表X轴的结束值，标记要可视化范围的结束。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Y_batch_count
    - 指定为图表Y轴生成的数据点数量，影响其精细度。
    - Comfy dtype: INT
    - Python dtype: int
- Y_first_value
    - 图表Y轴的起始值，标记要可视化范围的开始。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Y_last_value
    - 图表Y轴的结束值，标记要可视化范围的结束。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- cnet_stack
    - 一个可选的附加参数堆栈，可以附加到每个数据点，允许创建更复杂或详细的图表。
    - Comfy dtype: CONTROL_NET_STACK
    - Python dtype: list

# Output types
- X
    - Comfy dtype: XY
    - 表示基于指定输入参数和调整为图表生成的X值。
    - Python dtype: tuple
- Y
    - Comfy dtype: XY
    - 表示基于指定输入参数和调整为图表生成的Y值。
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_Control_Net_Plot:

    plot_types = ["X: Strength, Y: Start%",
             "X: Strength, Y: End%",
             "X: Start%, Y: Strength",
             "X: Start%, Y: End%",
             "X: End%, Y: Strength",
             "X: End%, Y: Start%"]

    @classmethod
    def INPUT_TYPES(cls):

        return {
            "required": {
                "control_net": ("CONTROL_NET",),
                "image": ("IMAGE",),
                "plot_type": (cls.plot_types,),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.00, "max": 1.0, "step": 0.01}),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.00, "max": 1.0, "step": 0.01}),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.00, "max": 1.0, "step": 0.01}),
                "X_batch_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM}),
                "X_first_value": ("FLOAT", {"default": 0.0, "min": 0.00, "max": 10.0, "step": 0.01}),
                "X_last_value": ("FLOAT", {"default": 1.0, "min": 0.00, "max": 10.0, "step": 0.01}),
                "Y_batch_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM}),
                "Y_first_value": ("FLOAT", {"default": 0.0, "min": 0.00, "max": 10.0, "step": 0.01}),
                "Y_last_value": ("FLOAT", {"default": 1.0, "min": 0.00, "max": 10.0, "step": 0.01}),},
            "optional": {"cnet_stack": ("CONTROL_NET_STACK",)},
        }

    RETURN_TYPES = ("XY","XY",)
    RETURN_NAMES = ("X","Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def get_value(self, axis, control_net, image, strength, start_percent, end_percent,
                  batch_count, first_value, last_value):

        # Adjust upper bound for Start% and End% type
        if axis in ["Start%", "End%"]:
            first_value = min(1, first_value)
            last_value = min(1, last_value)

        increment = (last_value - first_value) / (batch_count - 1) if batch_count > 1 else 0

        values = []

        # Always add the first value.
        if axis == "Strength":
            values.append([(control_net, image, first_value, start_percent, end_percent)])
        elif axis == "Start%":
            values.append([(control_net, image, strength, first_value, end_percent)])
        elif axis == "End%":
            values.append([(control_net, image, strength, start_percent, first_value)])

        # Add intermediate values only if batch_count is more than 2.
        for i in range(1, batch_count - 1):
            if axis == "Strength":
                values.append(
                    [(control_net, image, first_value + i * increment, start_percent, end_percent)])
            elif axis == "Start%":
                values.append(
                    [(control_net, image, strength, first_value + i * increment, end_percent)])
            elif axis == "End%":
                values.append(
                    [(control_net, image, strength, start_percent, first_value + i * increment)])

        # Always add the last value if batch_count is more than 1.
        if batch_count > 1:
            if axis == "Strength":
                values.append([(control_net, image, last_value, start_percent, end_percent)])
            elif axis == "Start%":
                values.append([(control_net, image, strength, last_value, end_percent)])
            elif axis == "End%":
                values.append([(control_net, image, strength, start_percent, last_value)])

        return values

    def xy_value(self, control_net, image, strength, start_percent, end_percent, plot_type,
                 X_batch_count, X_first_value, X_last_value, Y_batch_count, Y_first_value, Y_last_value,
                 cnet_stack=None):

        x_type, y_type = plot_type.split(", ")

        # Now split each type by ": "
        x_type = x_type.split(": ")[1].strip()
        y_type = y_type.split(": ")[1].strip()

        x_entry = None
        y_entry = None

        if X_batch_count > 0:
            x_value = self.get_value(x_type, control_net, image, strength, start_percent,
                                     end_percent, X_batch_count, X_first_value, X_last_value)
            # If cnet_stack is provided, extend each inner array with its content
            if cnet_stack:
                for inner_list in x_value:
                    inner_list.extend(cnet_stack)

            x_entry = ("ControlNet" + x_type, x_value)

        if Y_batch_count > 0:
            y_value = self.get_value(y_type, control_net, image, strength, start_percent,
                                     end_percent, Y_batch_count, Y_first_value, Y_last_value)
            # If cnet_stack is provided, extend each inner array with its content
            if cnet_stack:
                for inner_list in y_value:
                    inner_list.extend(cnet_stack)

            y_entry = ("ControlNet" + y_type, y_value)

        return (x_entry, y_entry,)

```
