
# Documentation
- Class name: MaskOrImageToWeight
- Category: KJNodes
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

此节点用于计算输入的掩码或图像的平均值，但不能同时处理两者。它支持将计算得到的平均值转换为不同的输出类型，包括列表、pandas系列或张量，具体取决于指定的输出类型。

# Input types
## Required
- output_type
    - 指定输出格式，可以是列表、pandas系列或张量，决定了从输入掩码或图像计算得到的平均值的返回方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- images
    - 可选的图像列表，用于计算平均值。如果提供了图像，则不应使用掩码。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- masks
    - 可选的掩码列表，用于计算平均值。如果提供了掩码，则不应使用图像。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]

# Output types
- float
    - 输入掩码或图像的计算平均值，以output_type参数指定的格式返回。
    - Comfy dtype: FLOAT
    - Python dtype: Union[List[float], pandas.Series, torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskOrImageToWeight:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "output_type": (
                [   
                    'list',
                    'pandas series',
                    'tensor',
                ],
                {
                "default": 'list'
                    }),
             },
            "optional": {
                "images": ("IMAGE",),
                "masks": ("MASK",),                
            },

        }
    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "execute"
    CATEGORY = "KJNodes"
    DESCRIPTION = """
Gets the mean values from mask or image batch  
and returns that as the selected output type.   
"""

    def execute(self, output_type, images=None, masks=None):
        mean_values = []
        if masks is not None and images is None:
            for mask in masks:
                mean_values.append(mask.mean().item())
        elif masks is None and images is not None:
            for image in images:
                mean_values.append(image.mean().item())
        elif masks is not None and images is not None:
            raise Exception("MaskOrImageToWeight: Use either mask or image input only.")
                  
        # Convert mean_values to the specified output_type
        if output_type == 'list':
            return mean_values,
        elif output_type == 'pandas series':
            try:
                import pandas as pd
            except:
                raise Exception("MaskOrImageToWeight: pandas is not installed. Please install pandas to use this output_type")
            return pd.Series(mean_values),
        elif output_type == 'tensor':
            return torch.tensor(mean_values, dtype=torch.float32),
        else:
            raise ValueError(f"Unsupported output_type: {output_type}")

```
