---
tags:
- DataVisualization
- XYPlotData
---

# XY Input: Checkpoint
## Documentation
- Class name: `XY Input: Checkpoint`
- Category: `Efficiency Nodes/XY Inputs`
- Output node: `False`

The TSC_XYplot_Checkpoint node is designed to process XY plot data related to model checkpoints, focusing on validating and handling checkpoint values and clip skip values for efficiency analysis in model training and refinement processes.
## Input types
### Required
- **`target_ckpt`**
    - Specifies the target checkpoint type, either 'Base' or 'Refiner', to determine the context of the XY plot data processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`input_mode`**
    - Determines the mode of input which affects how checkpoint data is processed and visualized in the XY plot.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`batch_path`**
    - The file path to the batch data used for generating the XY plot, influencing the source of data analysis.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`subdirectories`**
    - A boolean indicating whether to include subdirectories in the batch data search, expanding the scope of data analysis.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`batch_sort`**
    - Specifies the sorting order of batch data, either 'ascending' or 'descending', to organize the data for analysis.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`batch_max`**
    - Defines the maximum number of batches to consider for the XY plot, setting an upper limit on the data analysis.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ckpt_count`**
    - Indicates the number of checkpoints to include in the analysis, directly impacting the comprehensiveness of the XY plot.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ckpt_name_i`**
    - Specifies the name of the i-th checkpoint, allowing for detailed customization of checkpoint data included in the XY plot.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clip_skip_i`**
    - Determines the clip skip value for the i-th checkpoint, affecting the granularity of data analysis for each checkpoint.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`vae_name_i`**
    - Identifies the name of the i-th VAE model, enabling the inclusion of VAE-specific data in the XY plot analysis.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`X or Y`**
    - Comfy dtype: `XY`
    - Outputs the type of XY plot data generated ('Clip Skip' or 'Clip Skip (Refiner)') along with the corresponding values, facilitating efficiency analysis.
    - Python dtype: `Tuple[str, List[int]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_Checkpoint:
    modes = ["Ckpt Names", "Ckpt Names+ClipSkip", "Ckpt Names+ClipSkip+VAE", "Checkpoint Batch"]
    @classmethod
    def INPUT_TYPES(cls):
        checkpoints = ["None"] + folder_paths.get_filename_list("checkpoints")
        vaes = ["Baked VAE"] + folder_paths.get_filename_list("vae")

        inputs = {
            "required": {
                        "target_ckpt": (["Base", "Refiner"],),
                        "input_mode": (cls.modes,),
                        "batch_path": ("STRING", {"default": xy_batch_default_path, "multiline": False}),
                        "subdirectories": ("BOOLEAN", {"default": False}),
                        "batch_sort": (["ascending", "descending"],),
                        "batch_max": ("INT", {"default": -1, "min": -1, "max": 50, "step": 1}),
                        "ckpt_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM, "step": 1})
            }
        }

        for i in range(1, XYPLOT_LIM+1):
            inputs["required"][f"ckpt_name_{i}"] = (checkpoints,)
            inputs["required"][f"clip_skip_{i}"] = ("INT", {"default": -1, "min": -24, "max": -1, "step": 1})
            inputs["required"][f"vae_name_{i}"] = (vaes,)

        return inputs

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, target_ckpt, input_mode, batch_path, subdirectories, batch_sort, batch_max, ckpt_count, **kwargs):

        # Define XY type
        xy_type = "Checkpoint" if target_ckpt == "Base" else "Refiner"

        if "Batch" not in input_mode:
            # Extract values from kwargs
            checkpoints = [kwargs.get(f"ckpt_name_{i}") for i in range(1, ckpt_count + 1)]
            clip_skips = [kwargs.get(f"clip_skip_{i}") for i in range(1, ckpt_count + 1)]
            vaes = [kwargs.get(f"vae_name_{i}") for i in range(1, ckpt_count + 1)]

            # Set None for Clip Skip and/or VAE if not correct modes
            for i in range(ckpt_count):
                if "ClipSkip" not in input_mode:
                    clip_skips[i] = None
                if "VAE" not in input_mode:
                    vaes[i] = None

            xy_value = [(checkpoint, clip_skip, vae) for checkpoint, clip_skip, vae in zip(checkpoints, clip_skips, vaes) if
                        checkpoint != "None"]
        else:
            if batch_max == 0:
                return (None,)

            try:
                ckpts = get_batch_files(batch_path, CKPT_EXTENSIONS, include_subdirs=subdirectories)

                if not ckpts:
                    print(f"{error('XY Plot Error:')} No Checkpoint files found.")
                    return (None,)

                if batch_sort == "ascending":
                    ckpts.sort()
                elif batch_sort == "descending":
                    ckpts.sort(reverse=True)

                # Construct the xy_value using the obtained ckpts
                xy_value = [(ckpt, None, None) for ckpt in ckpts]

                if batch_max != -1:  # If there's a limit
                    xy_value = xy_value[:batch_max]

            except Exception as e:
                print(f"{error('XY Plot Error:')} {e}")
                return (None,)

        return ((xy_type, xy_value),) if xy_value else (None,)

```
