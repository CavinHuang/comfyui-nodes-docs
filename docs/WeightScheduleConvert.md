
# Documentation
- Class name: WeightScheduleConvert
- Category: KJNodes
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

WeightScheduleConvert节点旨在转换权重调度,使其适应不同的场景或需求。该节点抽象了权重调度的转换过程,聚焦于权重调度在各种应用中的灵活性和适应性。

# Input types
## Required
- input_values
    - 表示用于转换的初始值,作为主要输入。它在定义转换过程的起点方面起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- output_type
    - 指定转换所需的输出格式,影响输出的结构和格式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- invert
    - 一个布尔标志,用于确定在转换过程中是否应该反转输入值。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- repeat
    - 定义输入值在输出中应重复的次数,影响结果的长度和组成。
    - Comfy dtype: INT
    - Python dtype: int

## Optional
- remap_to_frames
    - 可选参数,允许将输出重新映射到特定数量的帧,调整转换以适应预定的帧数。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation_curve
    - 可选参数,指定转换过程中用于插值的曲线,影响输出值的平滑度和分布。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 输出按指定格式转换后的值,反映了转换过程中所做的调整。
    - Comfy dtype: FLOAT
    - Python dtype: float


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
