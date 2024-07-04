
# Documentation
- Class name: SplineEditor
- Category: KJNodes/experimental
- Output node: False

SplineEditor节点是一个专为创建和操作样条曲线设计的图形编辑器，用于生成各种类型的输出数据。它通过交互式编辑功能，允许对样条曲线的形状和特征进行精细控制。这个节点特别适用于需要自定义调度、批量掩码或坐标转换的应用场景。

# Input types
## Required
- points_store
    - 存储控制点数据，用于生成和操作样条曲线。
    - Comfy dtype: STRING
    - Python dtype: str
- coordinates
    - 控制点坐标的字符串表示，用于定义样条曲线的形状和轨迹。
    - Comfy dtype: STRING
    - Python dtype: str
- mask_width
    - 指定要生成的掩码宽度，影响输出掩码的空间分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- mask_height
    - 定义掩码高度，影响输出掩码的垂直分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- points_to_sample
    - 设置从样条曲线生成的采样点数量，独立于控制点数量。
    - Comfy dtype: INT
    - Python dtype: int
- sampling_method
    - 选择采样方法，可以是沿时间轴（用于调度）或沿路径（用于坐标）。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- interpolation
    - 指定控制点之间的插值方法，影响样条曲线的平滑度和形状。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- tension
    - 调整样条曲线的张力，影响其曲率以及与控制点的贴合程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- repeat_output
    - 确定输出重复的次数，用于生成多个输出数据实例。
    - Comfy dtype: INT
    - Python dtype: int
- float_output_type
    - 决定浮点输出的格式，可以选择列表、pandas系列或张量格式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- min_value
    - 指定输出的最小值，为生成的数据设置下限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_value
    - 定义输出的最大值，为生成的数据设置上限。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- mask
    - Comfy dtype: MASK
    - 基于定义的样条曲线生成掩码批次，适用于需要掩码输入的应用。
    - Python dtype: str
- coord_str
    - Comfy dtype: STRING
    - 提供从样条曲线派生的坐标字符串表示，用于路径或形状的文本表示。
    - Python dtype: str
- float
    - Comfy dtype: FLOAT
    - 输出浮点数列表、pandas系列或张量（取决于所选输出类型），表示从样条曲线采样的值。
    - Python dtype: float
- count
    - Comfy dtype: INT
    - 返回整数计数，可能表示输出数据中的元素数量。
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SplineEditor:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "points_store": ("STRING", {"multiline": False}),
                "coordinates": ("STRING", {"multiline": False}),
                "mask_width": ("INT", {"default": 512, "min": 8, "max": 4096, "step": 8}),
                "mask_height": ("INT", {"default": 512, "min": 8, "max": 4096, "step": 8}),
                "points_to_sample": ("INT", {"default": 16, "min": 2, "max": 1000, "step": 1}),
                "sampling_method": (
                [   
                    'path',
                    'time',
                ],
                {
                    "default": 'time'
                }),
                "interpolation": (
                [   
                    'cardinal',
                    'monotone',
                    'basis',
                    'linear',
                    'step-before',
                    'step-after',
                    'polar',
                    'polar-reverse',
                ],
                {
                "default": 'cardinal'
                    }),
                "tension": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "repeat_output": ("INT", {"default": 1, "min": 1, "max": 4096, "step": 1}),
                "float_output_type": (
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
                "min_value": ("FLOAT", {"default": 0.0, "min": -10000.0, "max": 10000.0, "step": 0.01}),
                "max_value": ("FLOAT", {"default": 1.0, "min": -10000.0, "max": 10000.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("MASK", "STRING", "FLOAT", "INT")
    RETURN_NAMES = ("mask", "coord_str", "float", "count")
    FUNCTION = "splinedata"
    CATEGORY = "KJNodes/experimental"
    DESCRIPTION = """
# WORK IN PROGRESS  
Do not count on this as part of your workflow yet,  
probably contains lots of bugs and stability is not  
guaranteed!!  
  
## Graphical editor to create values for various   
## schedules and/or mask batches.  

**Shift + click** to add control point at end.
**Ctrl + click** to add control point (subdivide) between two points.  
**Right click on a point** to delete it.    
Note that you can't delete from start/end.  
  
Right click on canvas for context menu:  
These are purely visual options, doesn't affect the output:  
 - Toggle handles visibility
 - Display sample points: display the points to be returned.  

**points_to_sample** value sets the number of samples  
returned from the **drawn spline itself**, this is independent from the  
actual control points, so the interpolation type matters.  
sampling_method: 
 - time: samples along the time axis, used for schedules  
 - path: samples along the path itself, useful for coordinates  

output types:
 - mask batch  
        example compatible nodes: anything that takes masks  
 - list of floats
        example compatible nodes: IPAdapter weights  
 - pandas series
        example compatible nodes: anything that takes Fizz'  
        nodes Batch Value Schedule  
 - torch tensor  
        example compatible nodes: unknown
"""

    def splinedata(self, mask_width, mask_height, coordinates, float_output_type, interpolation, 
                   points_to_sample, sampling_method, points_store, tension, repeat_output, min_value=0.0, max_value=1.0):
        
        coordinates = json.loads(coordinates)
        for coord in coordinates:
            coord['x'] = int(round(coord['x']))
            coord['y'] = int(round(coord['y']))
            
        normalized_y_values = [
            (1.0 - (point['y'] / 512) - 0.0) * (max_value - min_value) + min_value
            for point in coordinates
        ]
        if float_output_type == 'list':
            out_floats = normalized_y_values * repeat_output
        elif float_output_type == 'pandas series':
            try:
                import pandas as pd
            except:
                raise Exception("MaskOrImageToWeight: pandas is not installed. Please install pandas to use this output_type")
            out_floats = pd.Series(normalized_y_values * repeat_output),
        elif float_output_type == 'tensor':
            out_floats = torch.tensor(normalized_y_values * repeat_output, dtype=torch.float32)
        # Create a color map for grayscale intensities
        color_map = lambda y: torch.full((mask_height, mask_width, 3), y, dtype=torch.float32)

        # Create image tensors for each normalized y value
        mask_tensors = [color_map(y) for y in normalized_y_values]
        masks_out = torch.stack(mask_tensors)
        masks_out = masks_out.repeat(repeat_output, 1, 1, 1)
        masks_out = masks_out.mean(dim=-1)
        return (masks_out, str(coordinates), out_floats, len(out_floats))

```
