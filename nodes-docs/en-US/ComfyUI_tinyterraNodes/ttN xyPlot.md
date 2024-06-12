---
tags:
- DataVisualization
- XYPlot
- XYPlotData
---

# xyPlot
## Documentation
- Class name: `ttN xyPlot`
- Category: `ttN/legacy`
- Output node: `False`

The `ttN xyPlot` node is designed for generating and processing XY plots within a specific visualization framework. It focuses on validating plot types, managing plot variables, and orchestrating the generation of images based on XY coordinates. This node integrates various functionalities to ensure the creation of visual representations is both efficient and adaptable to different types of data inputs.
## Input types
### Required
- **`grid_spacing`**
    - Determines the spacing between grid points in the plot, affecting the plot's resolution and visual density.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`latent_id`**
    - Identifies a specific latent variable to be used in the plot, influencing the data representation and visualization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`output_individuals`**
    - Controls whether individual data points are outputted, impacting the level of detail in the plot visualization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`flip_xy`**
    - Specifies whether the X and Y axes should be flipped, altering the plot's orientation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`x_axis`**
    - Defines the data type or category for the X-axis, shaping how data is interpreted and plotted.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`x_values`**
    - A list of values to be plotted on the X-axis, determining the specific points and their arrangement in the plot.
    - Comfy dtype: `STRING`
    - Python dtype: `List[str]`
- **`y_axis`**
    - Specifies the data type or category for the Y-axis, influencing the plot's data interpretation and visualization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`y_values`**
    - A collection of values for plotting on the Y-axis, which dictates the plot points and their organization.
    - Comfy dtype: `STRING`
    - Python dtype: `List[str]`
## Output types
- **`xyPlot`**
    - Comfy dtype: `XYPLOT`
    - The generated XY plot data, encapsulating the visual representation of the plotted points.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_XYPlot:
    version = '1.2.0'
    lora_list = ["None"] + folder_paths.get_filename_list("loras")
    lora_strengths = {"min": -4.0, "max": 4.0, "step": 0.01}
    token_normalization = ["none", "mean", "length", "length+mean"]
    weight_interpretation = ["comfy", "A1111", "compel", "comfy++"]

    loader_dict = {
        "ckpt_name": folder_paths.get_filename_list("checkpoints"),
        "vae_name": ["Baked-VAE"] + folder_paths.get_filename_list("vae"),
        "clip_skip": {"min": -24, "max": -1, "step": 1},
        "lora1_name": lora_list,
        "lora1_model_strength": lora_strengths,
        "lora1_clip_strength": lora_strengths,
        "lora1_model&clip_strength": lora_strengths,
        "lora2_name": lora_list,
        "lora2_model_strength": lora_strengths,
        "lora2_clip_strength": lora_strengths,
        "lora2_model&clip_strength": lora_strengths,
        "lora3_name": lora_list,
        "lora3_model_strength": lora_strengths,
        "lora3_clip_strength": lora_strengths,
        "lora3_model&clip_strength": lora_strengths,
        "positive": [],
        "positive_token_normalization": token_normalization,
        "positive_weight_interpretation": weight_interpretation,
        "negative": [],
        "negative_token_normalization": token_normalization,
        "negative_weight_interpretation": weight_interpretation,
    }

    sampler_dict = {
        "lora_name": lora_list,
        "lora_model_strength": lora_strengths,
        "lora_clip_strength": lora_strengths,
        "lora_model&clip_strength": lora_strengths,
        "steps": {"min": 1, "max": 100, "step": 1},
        "cfg": {"min": 0.0, "max": 100.0, "step": 1.0},
        "sampler_name": comfy.samplers.KSampler.SAMPLERS,
        "scheduler": comfy.samplers.KSampler.SCHEDULERS,
        "denoise": {"min": 0.0, "max": 1.0, "step": 0.01},
        "seed": ['increment', 'decrement', 'randomize'],
    }

    plot_dict = {**sampler_dict, **loader_dict} 

    plot_values = ["None",]
    plot_values.append("---------------------")
    for k in sampler_dict:
        plot_values.append(f'sampler: {k}')
    plot_values.append("---------------------")
    for k in loader_dict:
        plot_values.append(f'loader: {k}')
    
    def __init__(self):
        pass
    
    rejected = ["None", "---------------------"]

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                #"info": ("INFO", {"default": "Any values not set by xyplot will be taken from the KSampler or connected pipeLoader", "multiline": True}),
                "grid_spacing": ("INT",{"min": 0, "max": 500, "step": 5, "default": 0,}),
                "latent_id": ("INT",{"min": 0, "max": 100, "step": 1, "default": 0, }),
                "output_individuals": (["False", "True"],{"default": "False"}),
                "flip_xy": (["False", "True"],{"default": "False"}),
                "x_axis": (ttN_XYPlot.plot_values, {"default": 'None'}),
                "x_values": ("STRING",{"default": '', "multiline": True, "placeholder": 'insert values seperated by "; "'}),
                "y_axis": (ttN_XYPlot.plot_values, {"default": 'None'}),
                "y_values": ("STRING",{"default": '', "multiline": True, "placeholder": 'insert values seperated by "; "'}),
            },
            "hidden": {
                "plot_dict": (ttN_XYPlot.plot_dict,),
                "ttNnodeVersion": ttN_XYPlot.version,
            },
        }

    RETURN_TYPES = ("XYPLOT", )
    RETURN_NAMES = ("xyPlot", )
    FUNCTION = "plot"

    CATEGORY = "ttN/legacy"
    
    def plot(self, grid_spacing, latent_id, output_individuals, flip_xy, x_axis, x_values, y_axis, y_values):
        def clean_values(values):
            original_values = values.split("; ")
            cleaned_values = []

            for value in original_values:
                # Strip the semi-colon
                cleaned_value = value.strip(';').strip()

                if cleaned_value == "":
                    continue
                
                # Try to convert the cleaned_value back to int or float if possible
                try:
                    cleaned_value = int(cleaned_value)
                except ValueError:
                    try:
                        cleaned_value = float(cleaned_value)
                    except ValueError:
                        pass

                # Append the cleaned_value to the list
                cleaned_values.append(cleaned_value)

            return cleaned_values
        
        if x_axis in self.rejected:
            x_axis = "None"
            x_values = []
        else:
            x_values = clean_values(x_values)

        if y_axis in self.rejected:
            y_axis = "None"
            y_values = []
        else:
            y_values = clean_values(y_values)

        if flip_xy == "True":
            x_axis, y_axis = y_axis, x_axis
            x_values, y_values = y_values, x_values
        
        xy_plot = {"x_axis": x_axis,
                   "x_vals": x_values,
                   "y_axis": y_axis,
                   "y_vals": y_values,
                   "grid_spacing": grid_spacing,
                   "latent_id": latent_id,
                   "output_individuals": output_individuals}
        
        return (xy_plot, )

```
