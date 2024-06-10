---
tags:
- DataVisualization
- XYPlot
- XYPlotData
---

# XY Plot
## Documentation
- Class name: `easy XYPlot`
- Category: `EasyUse/Pipe`
- Output node: `False`

The `easyXYPlot` node is designed to facilitate the creation and manipulation of XY plots, particularly in the context of visualizing and analyzing data points or conditions across two dimensions. It supports advanced features such as handling positive and negative conditions, integrating with control networks for specific adjustments, and customizing plot dynamics based on user-defined variables.
## Input types
### Required
- **`grid_spacing`**
    - Specifies the spacing between grid lines in the XY plot, affecting the plot's granularity and readability.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`output_individuals`**
    - Determines whether individual data points should be outputted separately, allowing for detailed analysis of each point.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`flip_xy`**
    - Controls whether the X and Y axes should be flipped, altering the plot's orientation and perspective.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`x_axis`**
    - Defines the label or identifier for the X-axis, contributing to the plot's contextual understanding.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`x_values`**
    - Represents the data points or conditions along the X-axis, directly influencing the plot's horizontal distribution.
    - Comfy dtype: `STRING`
    - Python dtype: `list`
- **`y_axis`**
    - Defines the label or identifier for the Y-axis, contributing to the plot's contextual understanding.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`y_values`**
    - Represents the data points or conditions along the Y-axis, directly influencing the plot's vertical distribution.
    - Comfy dtype: `STRING`
    - Python dtype: `list`
### Optional
- **`pipe`**
    - An optional pipeline parameter that can be used to pass additional information or settings for the plot generation process.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `dict`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The modified or new pipeline configuration, including any changes or additions made through the plot settings.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler SDXL (Eff.)](../../efficiency-nodes-comfyui/Nodes/KSampler SDXL (Eff.).md)



## Source code
```python
class pipeXYPlot:
    lora_list = ["None"] + folder_paths.get_filename_list("loras")
    lora_strengths = {"min": -4.0, "max": 4.0, "step": 0.01}
    token_normalization = ["none", "mean", "length", "length+mean"]
    weight_interpretation = ["comfy", "A1111", "compel", "comfy++"]

    loader_dict = {
        "ckpt_name": folder_paths.get_filename_list("checkpoints"),
        "vae_name": ["Baked-VAE"] + folder_paths.get_filename_list("vae"),
        "clip_skip": {"min": -24, "max": -1, "step": 1},
        "lora_name": lora_list,
        "lora_model_strength": lora_strengths,
        "lora_clip_strength": lora_strengths,
        "positive": [],
        "negative": [],
    }

    sampler_dict = {
        "steps": {"min": 1, "max": 100, "step": 1},
        "cfg": {"min": 0.0, "max": 100.0, "step": 1.0},
        "sampler_name": comfy.samplers.KSampler.SAMPLERS,
        "scheduler": comfy.samplers.KSampler.SCHEDULERS,
        "denoise": {"min": 0.0, "max": 1.0, "step": 0.01},
        "seed": {"min": 0, "max": MAX_SEED_NUM},
    }

    plot_dict = {**sampler_dict, **loader_dict}

    plot_values = ["None", ]
    plot_values.append("---------------------")
    for k in sampler_dict:
        plot_values.append(f'preSampling: {k}')
    plot_values.append("---------------------")
    for k in loader_dict:
        plot_values.append(f'loader: {k}')

    def __init__(self):
        pass

    rejected = ["None", "---------------------", "Nothing"]

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "grid_spacing": ("INT", {"min": 0, "max": 500, "step": 5, "default": 0, }),
                "output_individuals": (["False", "True"], {"default": "False"}),
                "flip_xy": (["False", "True"], {"default": "False"}),
                "x_axis": (pipeXYPlot.plot_values, {"default": 'None'}),
                "x_values": (
                "STRING", {"default": '', "multiline": True, "placeholder": 'insert values seperated by "; "'}),
                "y_axis": (pipeXYPlot.plot_values, {"default": 'None'}),
                "y_values": (
                "STRING", {"default": '', "multiline": True, "placeholder": 'insert values seperated by "; "'}),
            },
            "optional": {
              "pipe": ("PIPE_LINE",)
            },
            "hidden": {
                "plot_dict": (pipeXYPlot.plot_dict,),
            },
        }

    RETURN_TYPES = ("PIPE_LINE",)
    RETURN_NAMES = ("pipe",)
    FUNCTION = "plot"

    CATEGORY = "EasyUse/Pipe"

    def plot(self, grid_spacing, output_individuals, flip_xy, x_axis, x_values, y_axis, y_values, pipe=None):
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
                   "output_individuals": output_individuals}

        if pipe is not None:
            new_pipe = pipe
            new_pipe['loader_settings'] = {
                **pipe['loader_settings'],
                "xyplot": xy_plot
            }
            del pipe
        return (new_pipe, xy_plot,)

```
