---
tags:
- XYPlotData
---

# Spline Editor
## Documentation
- Class name: `SplineEditor`
- Category: `KJNodes/experimental`
- Output node: `False`

The SplineEditor node is a graphical editor designed for creating and manipulating splines to generate various types of output data. It allows for intricate control over the spline's shape and characteristics through interactive editing features. This node is particularly useful for applications requiring custom schedules, mask batches, or coordinate transformations.
## Input types
### Required
- **`points_store`**
    - Stores the control points data, used for generating and manipulating the spline.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`coordinates`**
    - A string representation of coordinates for control points, used to define the shape and trajectory of the spline.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`mask_width`**
    - Specifies the width of the mask to be generated, affecting the spatial resolution of the output mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mask_height`**
    - Defines the height of the mask, influencing the vertical resolution of the output mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`points_to_sample`**
    - Sets the number of sample points to generate from the spline, independent of the control points count.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sampling_method`**
    - Chooses the sampling method, either along the time axis for schedules or along the path for coordinates.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`interpolation`**
    - Specifies the method of interpolation between control points, impacting the smoothness and shape of the spline.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`tension`**
    - Adjusts the tension of the spline, affecting its curvature and how tightly it adheres to the control points.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`repeat_output`**
    - Determines how many times the output is repeated, useful for generating multiple instances of the output data.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`float_output_type`**
    - Determines the format of the floating-point output, allowing selection among list, pandas series, or tensor formats.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`min_value`**
    - Specifies the minimum value for the output, setting a lower bound on the generated data.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max_value`**
    - Defines the maximum value for the output, establishing an upper limit on the generated data.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - Generates a mask batch based on the defined spline, useful for applications requiring mask inputs.
    - Python dtype: `str`
- **`coord_str`**
    - Comfy dtype: `STRING`
    - Provides a string representation of coordinates derived from the spline, useful for textual representation of paths or shapes.
    - Python dtype: `str`
- **`float`**
    - Comfy dtype: `FLOAT`
    - Outputs a list of floats, pandas series, or tensor, depending on the selected output type, representing sampled values from the spline.
    - Python dtype: `float`
- **`count`**
    - Comfy dtype: `INT`
    - Returns an integer count, potentially representing the number of elements in the output data.
    - Python dtype: `int`
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
