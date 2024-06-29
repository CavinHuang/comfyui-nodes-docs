---
tags:
- ControlNet
---

# Reference ControlNet 🛂🅐🅒🅝
## Documentation
- Class name: `ACN_ReferenceControlNet`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/Reference`
- Output node: `False`

The ACN_ReferenceControlNet node is designed to load and apply a Reference ControlNet configuration for advanced control in generative models. It allows for the customization of reference types, style fidelity, and reference weight to fine-tune the influence of the control net on the generative process.
## Input types
### Required
- **`reference_type`**
    - Specifies the type of reference to be used, affecting how the control net interprets and applies style and content guidance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`style_fidelity`**
    - Determines the fidelity of the style to be applied by the control net, influencing the balance between style and content in the generated output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`ref_weight`**
    - Controls the weight of the reference in the control net's decision-making process, adjusting the overall impact of the reference on the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`control_net`**
    - Comfy dtype: `CONTROL_NET`
    - The configured Reference ControlNet, ready to be applied to the generative model for influencing its output.
    - Python dtype: `ReferenceAdvanced`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ReferenceControlNetNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "reference_type": (ReferenceType._LIST,),
                "style_fidelity": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "ref_weight": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
            },
        }
    
    RETURN_TYPES = ("CONTROL_NET", )
    FUNCTION = "load_controlnet"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/Reference"

    def load_controlnet(self, reference_type: str, style_fidelity: float, ref_weight: float):
        ref_opts = ReferenceOptions.create_combo(reference_type=reference_type, style_fidelity=style_fidelity, ref_weight=ref_weight)
        controlnet = ReferenceAdvanced(ref_opts=ref_opts, timestep_keyframes=None)
        return (controlnet,)

```
