
# Documentation
- Class name: WeightScheduleExtend
- Category: KJNodes
- Output node: False

WeightScheduleExtend节点旨在扩展和转换不同类型的数值列表或序列。它支持多种输入类型，并能够以指定格式输出扩展或转换后的值，从而在计算工作流中便于数据的操作和分析。

# Input types
## Required
- input_values_i
    - 这是节点的主要输入，但其具体格式和内容未知。它可能是一个需要被扩展或转换的数值列表或序列。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- output_type
    - 指定扩展或转换后的数据的期望输出格式。这为结果的使用或进一步处理提供了灵活性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- float
    - 输出可以是单个浮点值或浮点值集合，具体取决于所执行的操作和指定的输出类型。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WeightScheduleExtend:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "input_values_1": ("FLOAT", {"default": 0.0, "forceInput": True}),
                "input_values_2": ("FLOAT", {"default": 0.0, "forceInput": True}),
                "output_type": (
                [   
                    'match_input',
                    'list',
                    'pandas series',
                    'tensor',
                ],
                {
                "default": 'match_input'
                    }),
             },
             
        }
    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "execute"
    CATEGORY = "KJNodes"
    DESCRIPTION = """
Extends, and converts if needed, different value lists/series  
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

    def execute(self, input_values_1, input_values_2, output_type):
        import pandas as pd
        input_type_1 = self.detect_input_type(input_values_1)
        input_type_2 = self.detect_input_type(input_values_2)
        # Convert input_values_2 to the same format as input_values_1 if they do not match
        if not input_type_1 == input_type_2:
            print("Converting input_values_2 to the same format as input_values_1")
            if input_type_1 == 'pandas series':
                # Convert input_values_2 to a pandas Series
                float_values_2 = pd.Series(input_values_2)
            elif input_type_1 == 'tensor':
                # Convert input_values_2 to a tensor
                float_values_2 = torch.tensor(input_values_2, dtype=torch.float32)
        else:
            print("Input types match, no conversion needed")
            # If the types match, no conversion is needed
            float_values_2 = input_values_2
     
        float_values = input_values_1 + float_values_2
 
        if output_type == 'list':
            return float_values,
        elif output_type == 'pandas series':
            return pd.Series(float_values),
        elif output_type == 'tensor':
            if input_type_1 == 'pandas series':
                return torch.tensor(float_values.values, dtype=torch.float32),
            else:
                return torch.tensor(float_values, dtype=torch.float32),
        elif output_type == 'match_input':
            return float_values,
        else:
            raise ValueError(f"Unsupported output_type: {output_type}")

```
