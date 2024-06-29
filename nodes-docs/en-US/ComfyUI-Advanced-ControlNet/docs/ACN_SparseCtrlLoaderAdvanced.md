---
tags:
- ControlNet
- ControlNetLoader
---

# Load SparseCtrl Model 🛂🅐🅒🅝
## Documentation
- Class name: `ACN_SparseCtrlLoaderAdvanced`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl`
- Output node: `False`

The node is designed to load a Sparse ControlNet model, which is a specialized form of control network that utilizes sparse methods for enhanced control and manipulation of generative models. It supports motion-based adjustments and allows for the specification of sparse methods and optional timestep keyframes for fine-tuned control.
## Input types
### Required
- **`sparsectrl_name`**
    - Specifies the name of the Sparse ControlNet to be loaded, serving as a key identifier for retrieving the appropriate model files.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`use_motion`**
    - A boolean flag that determines whether motion-based adjustments should be applied to the control network, enhancing dynamic control.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`motion_strength`**
    - Defines the strength of the motion effect applied, allowing for the modulation of motion intensity in the control network.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`motion_scale`**
    - Sets the scale of motion effects, providing a means to adjust the overall impact of motion on the control network.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`sparse_method`**
    - Specifies the sparse method to be used, offering a choice of techniques for sparse control.
    - Comfy dtype: `SPARSE_METHOD`
    - Python dtype: `SparseMethod`
- **`tk_optional`**
    - An optional parameter that allows for the inclusion of timestep keyframes, enabling precise control over specific moments or phases.
    - Comfy dtype: `TIMESTEP_KEYFRAME`
    - Python dtype: `TimestepKeyframeGroup`
## Output types
- **`control_net`**
    - Comfy dtype: `CONTROL_NET`
    - Returns the loaded Sparse ControlNet model, ready for integration and use in generative tasks.
    - Python dtype: `SparseCtrlAdvanced`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)



## Source code
```python
class SparseCtrlLoaderAdvanced:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "sparsectrl_name": (folder_paths.get_filename_list("controlnet"), ),
                "use_motion": ("BOOLEAN", {"default": True}, ),
                "motion_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.001}, ),
                "motion_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.001}, ),
            },
            "optional": {
                "sparse_method": ("SPARSE_METHOD", ),
                "tk_optional": ("TIMESTEP_KEYFRAME", ),
            }
        }
    
    RETURN_TYPES = ("CONTROL_NET", )
    FUNCTION = "load_controlnet"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl"

    def load_controlnet(self, sparsectrl_name: str, use_motion: bool, motion_strength: float, motion_scale: float, sparse_method: SparseMethod=SparseSpreadMethod(), tk_optional: TimestepKeyframeGroup=None):
        sparsectrl_path = folder_paths.get_full_path("controlnet", sparsectrl_name)
        sparse_settings = SparseSettings(sparse_method=sparse_method, use_motion=use_motion, motion_strength=motion_strength, motion_scale=motion_scale)
        sparsectrl = load_sparsectrl(sparsectrl_path, timestep_keyframe=tk_optional, sparse_settings=sparse_settings)
        return (sparsectrl,)

```
