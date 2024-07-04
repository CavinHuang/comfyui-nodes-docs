
# Documentation
- Class name: PrintFloats
- Category: Utils
- Output node: False

PrintFloats节点旨在将单个浮点数或浮点数数组转换为字符串表示，确保格式正确且不含多余的换行符。它专注于格式化数值以便显示或记录，既可处理单个浮点数，也可处理浮点数集合。

# Input types
## Required
- audio_float
    - 表示需要转换为字符串格式的浮点数或浮点数数组。这个输入对于确定将被格式化并作为字符串返回的具体数值至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: Union[float, np.ndarray]

# Output types
- formatted_float
    - 输入浮点数的字符串表示，格式化为两位小数。这个输出对于以一致且易读的格式显示或记录数值至关重要。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PrintFloats:
    """Class to convert a float or an array of floats to a string representation, ensuring proper format without extra line breaks."""

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"audio_float": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1000000.0, "forceInput": True})}}

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("formatted_float",)
    FUNCTION = "convert"
    CATEGORY = "Utils"  # Simplified category for demonstration

    def convert(self, audio_float):
        # Ensure the correct handling of both single float and arrays of floats
        if isinstance(audio_float, np.ndarray):
            # Process each float in the array and join with a newline
            formatted_float = '\n'.join(f"{x:.2f}" for x in audio_float)
        else:
            # Process a single float
            formatted_float = f"{audio_float:.2f}"

        return (formatted_float,)

```
