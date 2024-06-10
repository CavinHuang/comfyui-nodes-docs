---
tags:
- ControlNet
---

# Reference ControlNet (Finetune) 🛂🅐🅒🅝
## Documentation
- Class name: `ACN_ReferenceControlNetFinetune`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/Reference`
- Output node: `False`

This node specializes in refining the application of reference-based control mechanisms within a neural network, focusing on enhancing the integration of attention and adaptive instance normalization (AdaIN) techniques for improved style fidelity and reference weighting. It aims to fine-tune the control network's response to reference inputs, ensuring a more precise and effective adaptation to the provided references.
## Input types
### Required
- **`attn_style_fidelity`**
    - Specifies the fidelity of the style to be maintained when applying attention mechanisms, influencing the network's ability to preserve the stylistic aspects of the reference.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_ref_weight`**
    - Determines the weight of the reference input in the attention mechanism, affecting how strongly the reference influences the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_strength`**
    - Controls the overall strength of the attention mechanism, adjusting the impact of the reference on the network's output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`adain_style_fidelity`**
    - Defines the fidelity of the style to be maintained when applying adaptive instance normalization (AdaIN), influencing the preservation of stylistic elements from the reference.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`adain_ref_weight`**
    - Sets the weight of the reference input in the AdaIN mechanism, modifying the extent to which the reference affects the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`adain_strength`**
    - Adjusts the strength of the AdaIN mechanism, determining the influence of the reference on the final output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`control_net`**
    - Comfy dtype: `CONTROL_NET`
    - The refined control network, enhanced for better integration and application of reference-based control mechanisms like attention and AdaIN.
    - Python dtype: `ReferenceAdvanced`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ReferenceControlFinetune:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "attn_style_fidelity": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "attn_ref_weight": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "attn_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "adain_style_fidelity": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "adain_ref_weight": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "adain_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
            },
        }
    
    RETURN_TYPES = ("CONTROL_NET", )
    FUNCTION = "load_controlnet"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/Reference"

    def load_controlnet(self,
                        attn_style_fidelity: float, attn_ref_weight: float, attn_strength: float,
                        adain_style_fidelity: float, adain_ref_weight: float, adain_strength: float):
        ref_opts = ReferenceOptions(reference_type=ReferenceType.ATTN_ADAIN,
                                    attn_style_fidelity=attn_style_fidelity, attn_ref_weight=attn_ref_weight, attn_strength=attn_strength,
                                    adain_style_fidelity=adain_style_fidelity, adain_ref_weight=adain_ref_weight, adain_strength=adain_strength)
        controlnet = ReferenceAdvanced(ref_opts=ref_opts, timestep_keyframes=None)
        return (controlnet,)

```
