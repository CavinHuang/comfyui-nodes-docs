---
tags:
- Image
- ImageThresholding
---

# DynamicThresholdingFull
## Documentation
- Class name: `dynamicThresholdingFull`
- Category: `EasyUse/PreSampling`
- Output node: `False`

The `dynamicThresholdingFull` node dynamically adjusts thresholding parameters for image processing tasks, leveraging inputs such as model, mimic scale, and threshold percentile. It employs dynamic thresholding to adaptively modify processing behavior, optimizing the balance between detail preservation and noise reduction.
## Input types
### Required
- **`model`**
    - Specifies the model for dynamic thresholding, serving as the core component for threshold adjustments.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`mimic_scale`**
    - Determines the scale at which the model mimics aspects of the input, influencing thresholding behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`threshold_percentile`**
    - Sets the percentile for threshold calculation, affecting the aggressiveness of thresholding.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mimic_mode`**
    - Defines the mode of mimicry, guiding how the mimic scale is applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `DynThresh.Modes`
- **`mimic_scale_min`**
    - Establishes the minimum scale for mimicry, ensuring a baseline level of detail preservation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cfg_mode`**
    - Specifies the configuration mode, altering thresholding behavior based on the model's configuration.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `DynThresh.Modes`
- **`cfg_scale_min`**
    - Indicates the minimum scale for configuration, impacting the fineness of thresholding adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sched_val`**
    - A value to schedule or adjust the thresholding dynamically over time or iterations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`separate_feature_channels`**
    - Determines whether feature channels should be processed separately or together, affecting the thresholding process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`scaling_startpoint`**
    - Defines the starting point for scaling in the dynamic thresholding process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `DynThresh.Startpoints`
- **`variability_measure`**
    - Specifies the measure of variability to consider in the dynamic thresholding process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `DynThresh.Variabilities`
- **`interpolate_phi`**
    - A factor for interpolating the thresholding function, influencing the smoothness of the transition between thresholds.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Produces a modified model with dynamically adjusted thresholding parameters, optimized for image processing.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - Reroute
    - [Lora Loader Stack (rgthree)](../../rgthree-comfy/Nodes/Lora Loader Stack (rgthree).md)



## Source code
```python
class dynamicThresholdingFull:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "mimic_scale": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 100.0, "step": 0.5}),
                "threshold_percentile": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "mimic_mode": (DynThresh.Modes,),
                "mimic_scale_min": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 100.0, "step": 0.5}),
                "cfg_mode": (DynThresh.Modes,),
                "cfg_scale_min": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 100.0, "step": 0.5}),
                "sched_val": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step": 0.01}),
                "separate_feature_channels": (["enable", "disable"],),
                "scaling_startpoint": (DynThresh.Startpoints,),
                "variability_measure": (DynThresh.Variabilities,),
                "interpolate_phi": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"
    CATEGORY = "EasyUse/PreSampling"

    def patch(self, model, mimic_scale, threshold_percentile, mimic_mode, mimic_scale_min, cfg_mode, cfg_scale_min,
              sched_val, separate_feature_channels, scaling_startpoint, variability_measure, interpolate_phi):
        dynamic_thresh = DynThresh(mimic_scale, threshold_percentile, mimic_mode, mimic_scale_min, cfg_mode,
                                   cfg_scale_min, sched_val, 0, 999, separate_feature_channels == "enable",
                                   scaling_startpoint, variability_measure, interpolate_phi)

        def sampler_dyn_thresh(args):
            input = args["input"]
            cond = input - args["cond"]
            uncond = input - args["uncond"]
            cond_scale = args["cond_scale"]
            time_step = args["timestep"]
            dynamic_thresh.step = 999 - time_step[0]

            return input - dynamic_thresh.dynthresh(cond, uncond, cond_scale, None)

        m = model.clone()
        m.set_model_sampler_cfg_function(sampler_dyn_thresh)
        return (m,)

```
