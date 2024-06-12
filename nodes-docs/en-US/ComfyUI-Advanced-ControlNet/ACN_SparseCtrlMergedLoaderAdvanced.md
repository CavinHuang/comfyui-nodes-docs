---
tags:
- ControlNet
- ControlNetLoader
---

# 🧪Load Merged SparseCtrl Model 🛂🅐🅒🅝
## Documentation
- Class name: `ACN_SparseCtrlMergedLoaderAdvanced`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl/experimental`
- Output node: `False`

This node is designed for advanced loading of merged Sparse Control Networks, integrating both standard control networks and sparse control mechanisms with enhanced settings for motion. It facilitates the combination of these networks to leverage the strengths of each, providing a more versatile and dynamic control network for applications requiring nuanced control over motion and other attributes.
## Input types
### Required
- **`sparsectrl_name`**
    - Specifies the name of the sparse control network to be loaded. This name is used to locate the network within a predefined directory structure.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`control_net_name`**
    - Specifies the name of the standard control network to be merged with the sparse control network. This name is used to identify and load the corresponding standard control network.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`use_motion`**
    - A boolean flag indicating whether motion settings should be applied to the sparse control network, enhancing its dynamic capabilities.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`motion_strength`**
    - Defines the strength of the motion effect to be applied, allowing for fine-tuning of how motion influences the control network's behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`motion_scale`**
    - Sets the scale of motion effects, providing control over the magnitude of motion adjustments within the network.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`sparse_method`**
    - Determines the method used for sparse control within the network, affecting how control signals are generated and applied.
    - Comfy dtype: `SPARSE_METHOD`
    - Python dtype: `SparseMethod`
- **`tk_optional`**
    - Optional timestep keyframe group to be used for temporal control, offering additional flexibility in how motion and other dynamics are handled.
    - Comfy dtype: `TIMESTEP_KEYFRAME`
    - Python dtype: `TimestepKeyframeGroup`
## Output types
- **`control_net`**
    - Comfy dtype: `CONTROL_NET`
    - The merged and enhanced control network, incorporating both standard and sparse control mechanisms with motion settings applied.
    - Python dtype: `SparseCtrlAdvanced`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SparseCtrlMergedLoaderAdvanced:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "sparsectrl_name": (folder_paths.get_filename_list("controlnet"), ),
                "control_net_name": (folder_paths.get_filename_list("controlnet"), ),
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

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl/experimental"

    def load_controlnet(self, sparsectrl_name: str, control_net_name: str, use_motion: bool, motion_strength: float, motion_scale: float, sparse_method: SparseMethod=SparseSpreadMethod(), tk_optional: TimestepKeyframeGroup=None):
        sparsectrl_path = folder_paths.get_full_path("controlnet", sparsectrl_name)
        controlnet_path = folder_paths.get_full_path("controlnet", control_net_name)
        sparse_settings = SparseSettings(sparse_method=sparse_method, use_motion=use_motion, motion_strength=motion_strength, motion_scale=motion_scale, merged=True)
        # first, load normal controlnet
        controlnet = load_controlnet(controlnet_path, timestep_keyframe=tk_optional)
        # confirm that controlnet is ControlNetAdvanced
        if controlnet is None or type(controlnet) != ControlNetAdvanced:
            raise ValueError(f"controlnet_path must point to a normal ControlNet, but instead: {type(controlnet).__name__}")
        # next, load sparsectrl, making sure to load motion portion
        sparsectrl = load_sparsectrl(sparsectrl_path, timestep_keyframe=tk_optional, sparse_settings=SparseSettings.default())
        # now, combine state dicts
        new_state_dict = controlnet.control_model.state_dict()
        for key, value in sparsectrl.control_model.motion_holder.motion_wrapper.state_dict().items():
            new_state_dict[key] = value
        # now, reload sparsectrl with real settings
        sparsectrl = load_sparsectrl(sparsectrl_path, controlnet_data=new_state_dict, timestep_keyframe=tk_optional, sparse_settings=sparse_settings)
        return (sparsectrl,)

```
