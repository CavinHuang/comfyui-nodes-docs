
# Documentation
- Class name: FloatToMask
- Category: KJNodes
- Output node: False

FloatToMask节点专门用于基于输入的浮点值生成掩码。每个输入值决定了掩码的强度或透明度。该节点设计用于创建具有指定尺寸的掩码批次，非常适合需要基于不同强度级别动态生成掩码的应用场景。

# Input types
## Required
- input_values
    - 表示用于生成掩码的浮点值。列表中的每个值决定了批次中对应掩码的强度，影响其透明度或颜色深度。
    - Comfy dtype: FLOAT
    - Python dtype: List[float] or float
- width
    - 指定生成掩码的宽度。这个尺寸决定了批次中每个掩码的宽度，直接影响掩码的大小和形状。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定生成掩码的高度。这个尺寸决定了批次中每个掩码的高度，影响掩码的整体大小和形状。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- mask
    - 输出由基于输入浮点值生成的掩码批次组成，每个掩码具有指定的宽度和高度尺寸。这些掩码可用于各种需要自定义掩码生成的应用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FloatToMask:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "input_values": ("FLOAT", {"forceInput": True, "default": 0}),
                "width": ("INT", {"default": 100, "min": 1}),
                "height": ("INT", {"default": 100, "min": 1}),
            },
        }
    RETURN_TYPES = ("MASK",)
    FUNCTION = "execute"
    CATEGORY = "KJNodes"
    DESCRIPTION = """
Generates a batch of masks based on the input float values.
The batch size is determined by the length of the input float values.
Each mask is generated with the specified width and height.
"""

    def execute(self, input_values, width, height):
        import pandas as pd
        # Ensure input_values is a list
        if isinstance(input_values, (float, int)):
            input_values = [input_values]
        elif isinstance(input_values, pd.Series):
            input_values = input_values.tolist()
        elif isinstance(input_values, list) and all(isinstance(item, list) for item in input_values):
            input_values = [item for sublist in input_values for item in sublist]

        # Generate a batch of masks based on the input_values
        masks = []
        for value in input_values:
            # Assuming value is a float between 0 and 1 representing the mask's intensity
            mask = torch.ones((height, width), dtype=torch.float32) * value
            masks.append(mask)
        masks_out = torch.stack(masks, dim=0)
    
        return(masks_out,)

```
