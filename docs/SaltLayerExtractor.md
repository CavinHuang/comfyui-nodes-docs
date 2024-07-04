
# Documentation
- Class name: SaltLayerExtractor
- Category: SALT/Scheduling/Parallax Motion
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltLayerExtractor节点专门用于从一组动画层中提取特定层的数据，重点关注视差运动调度。它处理输入的动画层，生成缩放、x和y值的调度表，从而促进动态、多维动画的创建。

# Input types
## Required
- float_layers
    - 这是一个动画层列表，每层包含缩放、x和y值的帧数据。该输入对于确定要提取和调度的特定层数据至关重要。
    - Comfy dtype: LIST
    - Python dtype: List[List[float]]
- layer_index
    - 指定从提供的动画层列表中提取哪一层数据的索引。这允许有针对性地提取动画数据，从而精确控制视差运动的调度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- zoom_schedule_lsit
    - 从指定动画层提取的缩放值列表，用于调度视差运动中的缩放效果。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- x_schedule_list
    - 从指定动画层提取的x坐标值列表，用于调度视差运动中的水平移动。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- y_schedule_list
    - 从指定动画层提取的y坐标值列表，用于调度视差运动中的垂直移动。
    - Comfy dtype: LIST
    - Python dtype: List[float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltLayerExtractor:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "float_layers": ("LIST", ),
                "layer_index": ("INT", {"default": 0, "min": 0})
            }
        }

    RETURN_TYPES = ("LIST", "LIST", "LIST")
    RETURN_NAMES = ("zoom_schedule_lsit", "x_schedule_list", "y_schedule_list")
    FUNCTION = "extract"
    CATEGORY = "SALT/Scheduling/Parallax Motion"

    def extract(self, **kwargs):
        animation_data = kwargs.get("float_layers", [])
        layer_index = kwargs.get("layer_index", 0)

        if layer_index >= len(animation_data):
            raise ValueError("Layer index out of range.")

        selected_layer_data = animation_data[layer_index]
        zoom_values = [frame[0] for frame in selected_layer_data]
        x_values = [frame[1] for frame in selected_layer_data]
        y_values = [frame[2] for frame in selected_layer_data]

        print("\033[1m\033[94mOPAC Schedule Curves:\033[0m")
        log_curve("Zoom Values", zoom_values)
        log_curve("X Values", x_values)
        log_curve("Y Values", y_values)

        return zoom_values, x_values, y_values

```
