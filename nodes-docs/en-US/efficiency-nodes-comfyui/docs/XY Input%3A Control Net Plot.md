---
tags:
- ControlNet
---

# XY Input: Control Net Plot
## Documentation
- Class name: `XY Input: Control Net Plot`
- Category: `Efficiency Nodes/XY Inputs`
- Output node: `False`

This node is designed to generate a series of values for plotting based on the control network's parameters over a specified range. It dynamically adjusts the input parameters such as strength, start percent, and end percent to create a dataset suitable for XY plotting, facilitating the visualization of how changes in these parameters affect the control network's output.
## Input types
### Required
- **`control_net`**
    - Represents the control network whose parameters are being adjusted for plotting. It is central to determining the output values for the XY plot.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `object`
- **`image`**
    - The image input that, along with the control net, influences the generated values for the XY plot.
    - Comfy dtype: `IMAGE`
    - Python dtype: `object`
- **`plot_type`**
    - Specifies the type of plot to generate, indicating how X and Y values are derived and related to each other.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength`**
    - The strength parameter applied to the control net, affecting the output values for the plot.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_percent`**
    - The starting percentage value, indicating the initial point of the range for the plot's X or Y axis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent`**
    - The ending percentage value, indicating the final point of the range for the plot's X or Y axis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`X_batch_count`**
    - Specifies the number of data points to generate for the X axis of the plot, affecting its granularity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`X_first_value`**
    - The starting value for the X axis of the plot, marking the beginning of the range to be visualized.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`X_last_value`**
    - The ending value for the X axis of the plot, marking the end of the range to be visualized.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`Y_batch_count`**
    - Specifies the number of data points to generate for the Y axis of the plot, affecting its granularity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`Y_first_value`**
    - The starting value for the Y axis of the plot, marking the beginning of the range to be visualized.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`Y_last_value`**
    - The ending value for the Y axis of the plot, marking the end of the range to be visualized.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`cnet_stack`**
    - An optional stack of additional parameters that can be appended to each data point, allowing for more complex or detailed plots.
    - Comfy dtype: `CONTROL_NET_STACK`
    - Python dtype: `list`
## Output types
- **`X`**
    - Comfy dtype: `XY`
    - Represents the X values generated for the plot, based on the specified input parameters and adjustments.
    - Python dtype: `tuple`
- **`Y`**
    - Comfy dtype: `XY`
    - Represents the Y values generated for the plot, based on the specified input parameters and adjustments.
    - Python dtype: `tuple`
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
