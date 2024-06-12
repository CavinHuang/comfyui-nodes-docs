---
tags:
- ControlNet
---

# Apply Advanced ControlNet 🛂🅐🅒🅝
## Documentation
- Class name: `ACN_AdvancedControlNetApply`
- Category: `Adv-ControlNet 🛂🅐🅒🅝`
- Output node: `False`

This node applies advanced control networks to modify the conditioning of an image based on specified control nets, images, and strength parameters. It enables the dynamic adjustment of image attributes through control networks, enhancing the flexibility and precision of image conditioning.
## Input types
### Required
- **`positive`**
    - Specifies the positive conditioning data that the control net will modify, contributing to the enhancement of desired image attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `list`
- **`negative`**
    - Specifies the negative conditioning data that the control net will adjust, aiming to suppress undesired image attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `list`
- **`control_net`**
    - The control net to be applied. It defines the specific modifications and adjustments to be made to the conditioning, directly influencing the outcome.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `ControlNet`
- **`image`**
    - The image to which the control net adjustments will be applied. It serves as the visual content that will be modified according to the control net's specifications.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`strength`**
    - Determines the intensity of the control net's effect on the image conditioning. A higher value results in more pronounced modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_percent`**
    - Defines the starting percentage of the effect applied by the control net, allowing for gradual application of the control net's effect over the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent`**
    - Defines the ending percentage of the effect applied by the control net, enabling precise control over how the effect tapers off.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`mask_optional`**
    - An optional mask that can be applied to target specific areas of the image for conditioning adjustments.
    - Comfy dtype: `MASK`
    - Python dtype: `MASK`
- **`timestep_kf`**
    - Optional keyframe for specifying the timestep at which the control net's effect should be applied, allowing for temporal control.
    - Comfy dtype: `TIMESTEP_KEYFRAME`
    - Python dtype: `TIMESTEP_KEYFRAME`
- **`latent_kf_override`**
    - Allows for overriding the latent keyframes, providing flexibility in how the control net's effects are applied over time.
    - Comfy dtype: `LATENT_KEYFRAME`
    - Python dtype: `LATENT_KEYFRAME`
- **`weights_override`**
    - Optional parameter to override the default weights of the control net, offering customization of the control net's influence.
    - Comfy dtype: `CONTROL_NET_WEIGHTS`
    - Python dtype: `CONTROL_NET_WEIGHTS`
- **`model_optional`**
    - An optional model parameter that, if provided, will be used instead of the default control net model, allowing for further customization.
    - Comfy dtype: `MODEL`
    - Python dtype: `MODEL`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The modified positive conditioning data after applying the control net, reflecting the enhancements made.
    - Python dtype: `list`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The modified negative conditioning data after applying the control net, reflecting the suppression of undesired attributes.
    - Python dtype: `list`
- **`model_opt`**
    - Comfy dtype: `MODEL`
    - An optional output model that may be modified by the node's processing, available for further use.
    - Python dtype: `MODEL`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [SamplerCustom](../../Comfy/Nodes/SamplerCustom.md)
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [KSampler (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler (Efficient).md)
    - [ConditioningSetMask](../../Comfy/Nodes/ConditioningSetMask.md)



## Source code
```python
class AdvancedControlNetApply:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "positive": ("CONDITIONING", ),
                "negative": ("CONDITIONING", ),
                "control_net": ("CONTROL_NET", ),
                "image": ("IMAGE", ),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001})
            },
            "optional": {
                "mask_optional": ("MASK", ),
                "timestep_kf": ("TIMESTEP_KEYFRAME", ),
                "latent_kf_override": ("LATENT_KEYFRAME", ),
                "weights_override": ("CONTROL_NET_WEIGHTS", ),
                "model_optional": ("MODEL",),
            }
        }

    RETURN_TYPES = ("CONDITIONING","CONDITIONING","MODEL",)
    RETURN_NAMES = ("positive", "negative", "model_opt")
    FUNCTION = "apply_controlnet"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝"

    def apply_controlnet(self, positive, negative, control_net, image, strength, start_percent, end_percent,
                         mask_optional: Tensor=None, model_optional: ModelPatcher=None,
                         timestep_kf: TimestepKeyframeGroup=None, latent_kf_override: LatentKeyframeGroup=None,
                         weights_override: ControlWeights=None):
        if strength == 0:
            return (positive, negative, model_optional)
        if model_optional:
            model_optional = model_optional.clone()

        control_hint = image.movedim(-1,1)
        cnets = {}

        out = []
        for conditioning in [positive, negative]:
            c = []
            for t in conditioning:
                d = t[1].copy()

                prev_cnet = d.get('control', None)
                if prev_cnet in cnets:
                    c_net = cnets[prev_cnet]
                else:
                    # copy, convert to advanced if needed, and set cond
                    c_net = convert_to_advanced(control_net.copy()).set_cond_hint(control_hint, strength, (start_percent, end_percent))
                    if is_advanced_controlnet(c_net):
                        # disarm node check
                        c_net.disarm()
                        # if model required, verify model is passed in, and if so patch it
                        if c_net.require_model:
                            if not model_optional:
                                raise Exception(f"Type '{type(c_net).__name__}' requires model_optional input, but got None.")
                            c_net.patch_model(model=model_optional)
                        # apply optional parameters and overrides, if provided
                        if timestep_kf is not None:
                            c_net.set_timestep_keyframes(timestep_kf)
                        if latent_kf_override is not None:
                            c_net.latent_keyframe_override = latent_kf_override
                        if weights_override is not None:
                            c_net.weights_override = weights_override
                        # verify weights are compatible
                        c_net.verify_all_weights()
                        # set cond hint mask
                        if mask_optional is not None:
                            mask_optional = mask_optional.clone()
                            # if not in the form of a batch, make it so
                            if len(mask_optional.shape) < 3:
                                mask_optional = mask_optional.unsqueeze(0)
                            c_net.set_cond_hint_mask(mask_optional)
                    c_net.set_previous_controlnet(prev_cnet)
                    cnets[prev_cnet] = c_net

                d['control'] = c_net
                d['control_apply_to_uncond'] = False
                n = [t[0], d]
                c.append(n)
            out.append(c)
        return (out[0], out[1], model_optional)

```
