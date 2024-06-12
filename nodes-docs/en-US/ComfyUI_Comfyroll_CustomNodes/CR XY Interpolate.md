---
tags:
- AnimationScheduling
- FrameInterpolation
- Interpolation
- VisualEffects
---

# 📉 CR XY Interpolate
## Documentation
- Class name: `CR XY Interpolate`
- Category: `🧩 Comfyroll Studio/✨ Essential/📉 XY Grid`
- Output node: `False`

The CR XY Interpolate node is designed for interpolating between two points or sets of points on an XY grid, facilitating the creation of smooth transitions or animations within a two-dimensional space. This node is particularly useful in scenarios where visual continuity or gradual changes between states are desired.
## Input types
### Required
- **`x_columns`**
    - Specifies the number of columns in the X dimension for the grid. It defines the horizontal spread of points to be interpolated.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`x_start_value`**
    - The starting value for the X dimension, indicating the initial point or state from which interpolation begins.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`x_step`**
    - The step size for the X dimension, determining the increment between each point in the grid along the X axis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`x_annotation_prepend`**
    - A prefix for annotating the X dimension, used for labeling or identifying points along the X axis.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`y_rows`**
    - Specifies the number of rows in the Y dimension for the grid. It defines the vertical spread of points to be interpolated.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y_start_value`**
    - The starting value for the Y dimension, indicating the initial point or state from which interpolation begins.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`y_step`**
    - The step size for the Y dimension, determining the increment between each point in the grid along the Y axis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`y_annotation_prepend`**
    - A prefix for annotating the Y dimension, used for labeling or identifying points along the Y axis.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`index`**
    - An index to specify a particular interpolation operation or sequence. It can be used to manage multiple interpolations within the same grid.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`gradient_profile`**
    - Specifies the gradient profile to be used for interpolation, affecting the transition smoothness between points.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`X`**
    - Comfy dtype: `FLOAT`
    - The interpolated values along the X dimension, representing a blend of the input states based on the specified parameters.
    - Python dtype: `List[float]`
- **`Y`**
    - Comfy dtype: `FLOAT`
    - The interpolated values along the Y dimension, representing a blend of the input states based on the specified parameters.
    - Python dtype: `List[float]`
- **`x_annotation`**
    - Comfy dtype: `STRING`
    - Generated annotations for the X dimension based on the 'x_annotation_prepend' input and interpolation parameters.
    - Python dtype: `List[str]`
- **`y_annotation`**
    - Comfy dtype: `STRING`
    - Generated annotations for the Y dimension based on the 'y_annotation_prepend' input and interpolation parameters.
    - Python dtype: `List[str]`
- **`trigger`**
    - Comfy dtype: `BOOLEAN`
    - A trigger output that can be used to initiate further actions or processes once the interpolation is complete.
    - Python dtype: `bool`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a link to additional documentation or help related to the node and its usage.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_XYInterpolate:

    @classmethod
    def INPUT_TYPES(s):
        gradient_profiles = ["Lerp"]    
    
        return {"required": {"x_columns":("INT", {"default": 5.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "x_start_value": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 0.01,}),
                             "x_step": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 0.01,}),
                             "x_annotation_prepend": ("STRING", {"multiline": False, "default": ""}), 
                             "y_rows":("INT", {"default": 5.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "y_start_value": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 0.01,}),
                             "y_step": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 0.01,}),
                             "y_annotation_prepend": ("STRING", {"multiline": False, "default": ""}), 
                             "index": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "gradient_profile": (gradient_profiles,)                              
                            }              
                }
    
    RETURN_TYPES = ("FLOAT", "FLOAT", "STRING", "STRING", "BOOLEAN", "STRING", )
    RETURN_NAMES = ("X", "Y", "x_annotation", "y_annotation", "trigger", "show_help", )    
    FUNCTION = "gradient"
    CATEGORY = icons.get("Comfyroll/XY Grid") 

    def gradient(self, x_columns, x_start_value, x_step, x_annotation_prepend,
    y_rows, y_start_value, y_step, y_annotation_prepend, 
    index, gradient_profile):

        # Index values for all XY nodes start from 1
        index -=1
        trigger = False
        grid_size = x_columns * y_rows
        
        x = index % x_columns
        y = int(index / x_columns)    
        
        x_float_out = round(x_start_value + x * x_step, 3)
        y_float_out = round(y_start_value + y * y_step, 3)
           
        x_ann_out = ""
        y_ann_out = ""
        
        if index + 1 == grid_size:
            for i in range(0, x_columns):
                x = index % x_columns
                x_float_out = x_start_value + i * x_step
                x_float_out = round(x_float_out, 3)
                x_ann_out = x_ann_out + x_annotation_prepend + str(x_float_out) + "; "
            for j in range(0, y_rows):
                y = int(index / x_columns)
                y_float_out = y_start_value + j * y_step
                y_float_out = round(y_float_out, 3)
                y_ann_out = y_ann_out + y_annotation_prepend + str(y_float_out) + "; "
                    
            x_ann_out = x_ann_out[:-1]
            y_ann_out = y_ann_out[:-1]
            print(x_ann_out,y_ann_out)
            trigger = True
             
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/XY-Grid-Nodes#cr-xy-interpolate"

        return (x_float_out, y_float_out, x_ann_out, y_ann_out, trigger, show_help, )

```
