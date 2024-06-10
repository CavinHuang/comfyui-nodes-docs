---
tags:
- DataVisualization
- XYPlotData
---

# XY Input: Manual XY Entry
## Documentation
- Class name: `XY Input: Manual XY Entry`
- Category: `Efficiency Nodes/XY Inputs`
- Output node: `False`

This node facilitates the manual entry of X and Y values for plotting purposes, allowing users to define and manipulate XY data points directly. It is designed to support a variety of input formats and types, enabling the customization of data for visualization in XY plots.
## Input types
### Required
- **`plot_type`**
    - Specifies the type of plot to be generated, influencing the interpretation and visualization of the XY data.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`plot_value`**
    - Determines the specific values to be used for plotting, directly affecting the plot's appearance and the data's representation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`X or Y`**
    - Comfy dtype: `XY`
    - Outputs either X or Y values, depending on the node's processing, suitable for further use in visualization or analysis.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_Manual_XY_Entry:

    plot_types = ["Nothing", "Seeds++ Batch", "Steps", "StartStep", "EndStep", "CFG Scale", "Sampler", "Scheduler",
                  "Denoise", "VAE", "Positive Prompt S/R", "Negative Prompt S/R", "Checkpoint", "Clip Skip", "LoRA"]
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
            "plot_type": (cls.plot_types,),
            "plot_value": ("STRING", {"default": "", "multiline": True}),}
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, plot_type, plot_value):

        # Store X values as arrays
        if plot_type not in {"Positive Prompt S/R", "Negative Prompt S/R", "VAE", "Checkpoint", "LoRA"}:
            plot_value = plot_value.replace(" ", "")  # Remove spaces
        plot_value = plot_value.replace("\n", "")  # Remove newline characters
        plot_value = plot_value.rstrip(";")  # Remove trailing semicolon
        plot_value = plot_value.split(";")  # Turn to array

        # Define the valid bounds for each type
        bounds = {
            "Seeds++ Batch": {"min": 1, "max": 50},
            "Steps": {"min": 1, "max": 10000},
            "StartStep": {"min": 0, "max": 10000},
            "EndStep": {"min": 0, "max": 10000},
            "CFG Scale": {"min": 0, "max": 100},
            "Sampler": {"options": comfy.samplers.KSampler.SAMPLERS},
            "Scheduler": {"options": comfy.samplers.KSampler.SCHEDULERS},
            "Denoise": {"min": 0, "max": 1},
            "VAE": {"options": folder_paths.get_filename_list("vae")},
            "Checkpoint": {"options": folder_paths.get_filename_list("checkpoints")},
            "Clip Skip": {"min": -24, "max": -1},
            "LoRA": {"options": folder_paths.get_filename_list("loras"),
                     "model_str": {"min": -10, "max": 10},"clip_str": {"min": -10, "max": 10},},
        }

        # Validates a value based on its corresponding value_type and bounds.
        def validate_value(value, value_type, bounds):
            # ________________________________________________________________________
            # Seeds++ Batch
            if value_type == "Seeds++ Batch":
                try:
                    x = int(float(value))
                    if x < bounds["Seeds++ Batch"]["min"]:
                        x = bounds["Seeds++ Batch"]["min"]
                    elif x > bounds["Seeds++ Batch"]["max"]:
                        x = bounds["Seeds++ Batch"]["max"]
                except ValueError:
                    print(f"\033[31mXY Plot Error:\033[0m '{value}' is not a valid batch count.")
                    return None
                if float(value) != x:
                    print(f"\033[31mmXY Plot Error:\033[0m '{value}' is not a valid batch count.")
                    return None
                return x
            # ________________________________________________________________________
            # Steps
            elif value_type == "Steps":
                try:
                    x = int(value)
                    if x < bounds["Steps"]["min"]:
                        x = bounds["Steps"]["min"]
                    elif x > bounds["Steps"]["max"]:
                        x = bounds["Steps"]["max"]
                    return x
                except ValueError:
                    print(
                        f"\033[31mXY Plot Error:\033[0m '{value}' is not a valid Step count.")
                    return None
            # __________________________________________________________________________________________________________
            # Start at Step
            elif value_type == "StartStep":
                try:
                    x = int(value)
                    if x < bounds["StartStep"]["min"]:
                        x = bounds["StartStep"]["min"]
                    elif x > bounds["StartStep"]["max"]:
                        x = bounds["StartStep"]["max"]
                    return x
                except ValueError:
                    print(
                        f"\033[31mXY Plot Error:\033[0m '{value}' is not a valid Start Step.")
                    return None
            # __________________________________________________________________________________________________________
            # End at Step
            elif value_type == "EndStep":
                try:
                    x = int(value)
                    if x < bounds["EndStep"]["min"]:
                        x = bounds["EndStep"]["min"]
                    elif x > bounds["EndStep"]["max"]:
                        x = bounds["EndStep"]["max"]
                    return x
                except ValueError:
                    print(
                        f"\033[31mXY Plot Error:\033[0m '{value}' is not a valid End Step.")
                    return None
            # __________________________________________________________________________________________________________
            # CFG Scale
            elif value_type == "CFG Scale":
                try:
                    x = float(value)
                    if x < bounds["CFG Scale"]["min"]:
                        x = bounds["CFG Scale"]["min"]
                    elif x > bounds["CFG Scale"]["max"]:
                        x = bounds["CFG Scale"]["max"]
                    return x
                except ValueError:
                    print(
                        f"\033[31mXY Plot Error:\033[0m '{value}' is not a number between {bounds['CFG Scale']['min']}"
                        f" and {bounds['CFG Scale']['max']} for CFG Scale.")
                    return None
            # __________________________________________________________________________________________________________
            # Sampler
            elif value_type == "Sampler":
                if isinstance(value, str) and ',' in value:
                    value = tuple(map(str.strip, value.split(',')))
                if isinstance(value, tuple):
                    if len(value) >= 2:
                        value = value[:2]  # Slice the value tuple to keep only the first two elements
                        sampler, scheduler = value
                        scheduler = scheduler.lower()  # Convert the scheduler name to lowercase
                        if sampler not in bounds["Sampler"]["options"]:
                            valid_samplers = '\n'.join(bounds["Sampler"]["options"])
                            print(
                                f"\033[31mXY Plot Error:\033[0m '{sampler}' is not a valid sampler. Valid samplers are:\n{valid_samplers}")
                            sampler = None
                        if scheduler not in bounds["Scheduler"]["options"]:
                            valid_schedulers = '\n'.join(bounds["Scheduler"]["options"])
                            print(
                                f"\033[31mXY Plot Error:\033[0m '{scheduler}' is not a valid scheduler. Valid schedulers are:\n{valid_schedulers}")
                            scheduler = None
                        if sampler is None or scheduler is None:
                            return None
                        else:
                            return sampler, scheduler
                    else:
                        print(
                            f"\033[31mXY Plot Error:\033[0m '{value}' is not a valid sampler.'")
                        return None
                else:
                    if value not in bounds["Sampler"]["options"]:
                        valid_samplers = '\n'.join(bounds["Sampler"]["options"])
                        print(
                            f"\033[31mXY Plot Error:\033[0m '{value}' is not a valid sampler. Valid samplers are:\n{valid_samplers}")
                        return None
                    else:
                        return value, None
            # __________________________________________________________________________________________________________
            # Scheduler
            elif value_type == "Scheduler":
                if value not in bounds["Scheduler"]["options"]:
                    valid_schedulers = '\n'.join(bounds["Scheduler"]["options"])
                    print(
                        f"\033[31mXY Plot Error:\033[0m '{value}' is not a valid Scheduler. Valid Schedulers are:\n{valid_schedulers}")
                    return None
                else:
                    return value
            # __________________________________________________________________________________________________________
            # Denoise
            elif value_type == "Denoise":
                try:
                    x = float(value)
                    if x < bounds["Denoise"]["min"]:
                        x = bounds["Denoise"]["min"]
                    elif x > bounds["Denoise"]["max"]:
                        x = bounds["Denoise"]["max"]
                    return x
                except ValueError:
                    print(
                        f"\033[31mXY Plot Error:\033[0m '{value}' is not a number between {bounds['Denoise']['min']} "
                        f"and {bounds['Denoise']['max']} for Denoise.")
                    return None
            # __________________________________________________________________________________________________________
            # VAE
            elif value_type == "VAE":
                if value not in bounds["VAE"]["options"]:
                    valid_vaes = '\n'.join(bounds["VAE"]["options"])
                    print(f"\033[31mXY Plot Error:\033[0m '{value}' is not a valid VAE. Valid VAEs are:\n{valid_vaes}")
                    return None
                else:
                    return value
            # __________________________________________________________________________________________________________
            # Checkpoint
            elif value_type == "Checkpoint":
                if isinstance(value, str) and ',' in value:
                    value = tuple(map(str.strip, value.split(',')))
                if isinstance(value, tuple):
                    if len(value) >= 2:
                        value = value[:2]  # Slice the value tuple to keep only the first two elements
                        checkpoint, clip_skip = value
                        try:
                            clip_skip = int(clip_skip)  # Convert the clip_skip to integer
                        except ValueError:
                            print(f"\033[31mXY Plot Error:\033[0m '{clip_skip}' is not a valid clip_skip. "
                                  f"Valid clip skip values are integers between {bounds['Clip Skip']['min']} and {bounds['Clip Skip']['max']}.")
                            return None
                        if checkpoint not in bounds["Checkpoint"]["options"]:
                            valid_checkpoints = '\n'.join(bounds["Checkpoint"]["options"])
                            print(
                                f"\033[31mXY Plot Error:\033[0m '{checkpoint}' is not a valid checkpoint. Valid checkpoints are:\n{valid_checkpoints}")
                            checkpoint = None
                        if clip_skip < bounds["Clip Skip"]["min"] or clip_skip > bounds["Clip Skip"]["max"]:
                            print(f"\033[31mXY Plot Error:\033[0m '{clip_skip}' is not a valid clip skip. "
                                  f"Valid clip skip values are integers between {bounds['Clip Skip']['min']} and {bounds['Clip Skip']['max']}.")
                            clip_skip = None
                        if checkpoint is None or clip_skip is None:
                            return None
                        else:
                            return checkpoint, clip_skip, None
                    else:
                        print(
                            f"\033[31mXY Plot Error:\033[0m '{value}' is not a valid checkpoint.'")
                        return None
                else:
                    if value not in bounds["Checkpoint"]["options"]:
                        valid_checkpoints = '\n'.join(bounds["Checkpoint"]["options"])
                        print(
                            f"\033[31mXY Plot Error:\033[0m '{value}' is not a valid checkpoint. Valid checkpoints are:\n{valid_checkpoints}")
                        return None
                    else:
                        return value, None, None
            # __________________________________________________________________________________________________________
            # Clip Skip
            elif value_type == "Clip Skip":
                try:
                    x = int(value)
                    if x < bounds["Clip Skip"]["min"]:
                        x = bounds["Clip Skip"]["min"]
                    elif x > bounds["Clip Skip"]["max"]:
                        x = bounds["Clip Skip"]["max"]
                    return x
                except ValueError:
                    print(f"\033[31mXY Plot Error:\033[0m '{value}' is not a valid Clip Skip.")
                    return None
            # __________________________________________________________________________________________________________
            # LoRA
            elif value_type == "LoRA":
                if isinstance(value, str) and ',' in value:
                    value = tuple(map(str.strip, value.split(',')))

                if isinstance(value, tuple):
                    lora_name, model_str, clip_str = (value + (1.0, 1.0))[:3]  # Defaults model_str and clip_str to 1 if not provided

                    if lora_name not in bounds["LoRA"]["options"]:
                        valid_loras = '\n'.join(bounds["LoRA"]["options"])
                        print(f"{error('XY Plot Error:')} '{lora_name}' is not a valid LoRA. Valid LoRAs are:\n{valid_loras}")
                        lora_name = None

                    try:
                        model_str = float(model_str)
                        clip_str = float(clip_str)
                    except ValueError:
                        print(f"{error('XY Plot Error:')} The LoRA model strength and clip strength values should be numbers"
                            f" between {bounds['LoRA']['model_str']['min']} and {bounds['LoRA']['model_str']['max']}.")
                        return None

                    if model_str < bounds["LoRA"]["model_str"]["min"] or model_str > bounds["LoRA"]["model_str"]["max"]:
                        print(f"{error('XY Plot Error:')} '{model_str}' is not a valid LoRA model strength value. "
                              f"Valid lora model strength values are between {bounds['LoRA']['model_str']['min']} and {bounds['LoRA']['model_str']['max']}.")
                        model_str = None

                    if clip_str < bounds["LoRA"]["clip_str"]["min"] or clip_str > bounds["LoRA"]["clip_str"]["max"]:
                        print(f"{error('XY Plot Error:')} '{clip_str}' is not a valid LoRA clip strength value. "
                              f"Valid lora clip strength values are between {bounds['LoRA']['clip_str']['min']} and {bounds['LoRA']['clip_str']['max']}.")
                        clip_str = None

                    if lora_name is None or model_str is None or clip_str is None:
                        return None
                    else:
                        return lora_name, model_str, clip_str
                else:
                    if value not in bounds["LoRA"]["options"]:
                        valid_loras = '\n'.join(bounds["LoRA"]["options"])
                        print(f"{error('XY Plot Error:')} '{value}' is not a valid LoRA. Valid LoRAs are:\n{valid_loras}")
                        return None
                    else:
                        return value, 1.0, 1.0

            # __________________________________________________________________________________________________________
            else:
                return None

        # Validate plot_value array length is 1 if doing a "Seeds++ Batch"
        if len(plot_value) != 1 and plot_type == "Seeds++ Batch":
            print(f"{error('XY Plot Error:')} '{';'.join(plot_value)}' is not a valid batch count.")
            return (None,)

        # Apply allowed shortcut syntax to certain input types
        if plot_type in ["Sampler", "Checkpoint", "LoRA"]:
            if plot_value[-1].startswith(','):
                # Remove the leading comma from the last entry and store it as suffixes
                suffixes = plot_value.pop().lstrip(',').split(',')
                # Split all preceding entries into subentries
                plot_value = [entry.split(',') for entry in plot_value]
                # Make all entries the same length as suffixes by appending missing elements
                for entry in plot_value:
                    entry += suffixes[len(entry) - 1:]
                # Join subentries back into strings
                plot_value = [','.join(entry) for entry in plot_value]

        # Prompt S/R X Cleanup
        if plot_type in {"Positive Prompt S/R", "Negative Prompt S/R"}:
            if plot_value[0] == '':
                print(f"{error('XY Plot Error:')} Prompt S/R value can not be empty.")
                return (None,)
            else:
                plot_value = [(plot_value[0], None) if i == 0 else (plot_value[0], x) for i, x in enumerate(plot_value)]

        # Loop over each entry in plot_value and check if it's valid
        if plot_type not in {"Nothing", "Positive Prompt S/R", "Negative Prompt S/R"}:
            for i in range(len(plot_value)):
                plot_value[i] = validate_value(plot_value[i], plot_type, bounds)
                if plot_value[i] == None:
                    return (None,)

        # Set up Seeds++ Batch structure
        if plot_type == "Seeds++ Batch":
            plot_value = list(range(plot_value[0]))

        # Nest LoRA value in another array to reflect LoRA stack changes
        if plot_type == "LoRA":
            plot_value = [[x] for x in plot_value]

        # Clean X/Y_values
        if plot_type == "Nothing":
            plot_value = [""]

        return ((plot_type, plot_value),)

```
