---
tags:
- DataTypeConversion
- NumericConversion
---

# Weight Schedule Convert
## Documentation
- Class name: `WeightScheduleConvert`
- Category: `KJNodes`
- Output node: `False`

The `WeightScheduleConvert` node is designed to transform weight schedules, adapting them to different contexts or requirements. This node abstracts the process of converting weight schedules, focusing on the flexibility and adaptability of weight schedules across various applications.
## Input types
### Required
- **`input_values`**
    - Represents the initial values for conversion, serving as the primary input. Its role is pivotal in defining the conversion process's starting point.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`output_type`**
    - Specifies the desired output format of the conversion, influencing the structure and format of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`invert`**
    - A boolean flag that determines whether the input values should be inverted during the conversion process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`repeat`**
    - Defines how many times the input values should be repeated in the output, affecting the length and composition of the result.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`remap_to_frames`**
    - Optional parameter that allows remapping the output to a specific number of frames, adjusting the conversion to fit a predetermined frame count.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation_curve`**
    - Optional parameter that specifies the curve used for interpolation during conversion, affecting the smoothness and distribution of the output values.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - Outputs the converted values in the specified format, reflecting the adaptations made during the conversion process.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WeightScheduleConvert:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "input_values": ("FLOAT", {"default": 0.0, "forceInput": True}),
                "output_type": (
                [   
                    'match_input',
                    'list',
                    'pandas series',
                    'tensor',
                ],
                {
                "default": 'list'
                    }),
                "invert": ("BOOLEAN", {"default": False}),
                "repeat": ("INT", {"default": 1,"min": 1, "max": 255, "step": 1}),
             },
             "optional": {
                "remap_to_frames": ("INT", {"default": 0}),
                "interpolation_curve": ("FLOAT", {"forceInput": True}),
             },
             
        }
    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "execute"
    CATEGORY = "KJNodes"
    DESCRIPTION = """
Converts different value lists/series to another type.  
"""

    def detect_input_type(self, input_values):
        import pandas as pd
        if isinstance(input_values, list):
            return 'list'
        elif isinstance(input_values, pd.Series):
            return 'pandas series'
        elif isinstance(input_values, torch.Tensor):
            return 'tensor'
        else:
            raise ValueError("Unsupported input type")

    def execute(self, input_values, output_type, invert, repeat, remap_to_frames=0, interpolation_curve=None):
        import pandas as pd
        input_type = self.detect_input_type(input_values)

        if input_type == 'pandas series':
            float_values = input_values.tolist()
        elif input_type == 'tensor':
            float_values = input_values
        else:
            float_values = input_values

        if invert:
            float_values = [1 - value for value in float_values]

        if interpolation_curve is not None:
            interpolated_pattern = []
            orig_float_values = float_values
            for value in interpolation_curve:
                min_val = min(orig_float_values)
                max_val = max(orig_float_values)
                # Normalize the values to [0, 1]
                normalized_values = [(value - min_val) / (max_val - min_val) for value in orig_float_values]
                # Interpolate the normalized values to the new frame count
                remapped_float_values = np.interp(np.linspace(0, 1, int(remap_to_frames * value)), np.linspace(0, 1, len(normalized_values)), normalized_values).tolist()
                interpolated_pattern.extend(remapped_float_values)
            float_values = interpolated_pattern
        else:
            # Remap float_values to match target_frame_amount
            if remap_to_frames > 0 and remap_to_frames != len(float_values):
                min_val = min(float_values)
                max_val = max(float_values)
                # Normalize the values to [0, 1]
                normalized_values = [(value - min_val) / (max_val - min_val) for value in float_values]
                # Interpolate the normalized values to the new frame count
                float_values = np.interp(np.linspace(0, 1, remap_to_frames), np.linspace(0, 1, len(normalized_values)), normalized_values).tolist()
       
            float_values = float_values * repeat

        if output_type == 'list':
            return float_values,
        elif output_type == 'pandas series':
            return pd.Series(float_values),
        elif output_type == 'tensor':
            if input_type == 'pandas series':
                return torch.tensor(float_values.values, dtype=torch.float32),
            else:   
                return torch.tensor(float_values, dtype=torch.float32),
        elif output_type == 'match_input':
            return float_values,
        else:
            raise ValueError(f"Unsupported output_type: {output_type}")

```
