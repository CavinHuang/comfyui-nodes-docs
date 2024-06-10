---
tags:
- ControlNet
---

# Apply ControlNet (Advanced)
## Documentation
- Class name: `ControlNetApplyAdvanced`
- Category: `conditioning`
- Output node: `False`

This node applies advanced control net transformations to conditioning data based on an image and a control net model. It allows for fine-tuned adjustments of the control net's influence over the generated content, enabling more precise and varied modifications to the conditioning.
## Input types
### Required
- **`positive`**
    - The positive conditioning data to which the control net transformations will be applied. It represents the desired attributes or features to enhance or maintain in the generated content.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[str, Dict[str, Any]]]`
- **`negative`**
    - The negative conditioning data, representing attributes or features to diminish or remove from the generated content. The control net transformations are applied to this data as well, allowing for a balanced adjustment of the content's characteristics.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[str, Dict[str, Any]]]`
- **`control_net`**
    - The control net model is crucial for defining the specific adjustments and enhancements to the conditioning data. It interprets the reference image and strength parameters to apply transformations, significantly influencing the final output by modifying attributes in both positive and negative conditioning data.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `ControlNet`
- **`image`**
    - The image serving as a reference for the control net transformations. It influences the adjustments made by the control net to the conditioning data, guiding the enhancement or suppression of specific features.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`strength`**
    - A scalar value determining the intensity of the control net's influence on the conditioning data. Higher values result in more pronounced adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_percent`**
    - The starting percentage of the control net's effect, allowing for gradual application of transformations over a specified range.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent`**
    - The ending percentage of the control net's effect, defining the range over which the transformations are applied. This enables more nuanced control over the adjustment process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The modified positive conditioning data after the application of control net transformations, reflecting the enhancements made based on the input parameters.
    - Python dtype: `List[Tuple[str, Dict[str, Any]]]`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The modified negative conditioning data after the application of control net transformations, reflecting the suppression or removal of specific features based on the input parameters.
    - Python dtype: `List[Tuple[str, Dict[str, Any]]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - KSampler //Inspire
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [ToBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ToBasicPipe.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - Reroute
    - [SamplerCustom](../../Comfy/Nodes/SamplerCustom.md)
    - [Bus Node](../../was-node-suite-comfyui/Nodes/Bus Node.md)



## Source code
```python
class ControlNetApplyAdvanced:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"positive": ("CONDITIONING", ),
                             "negative": ("CONDITIONING", ),
                             "control_net": ("CONTROL_NET", ),
                             "image": ("IMAGE", ),
                             "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                             "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                             "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001})
                             }}

    RETURN_TYPES = ("CONDITIONING","CONDITIONING")
    RETURN_NAMES = ("positive", "negative")
    FUNCTION = "apply_controlnet"

    CATEGORY = "conditioning"

    def apply_controlnet(self, positive, negative, control_net, image, strength, start_percent, end_percent):
        if strength == 0:
            return (positive, negative)

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
                    c_net = control_net.copy().set_cond_hint(control_hint, strength, (start_percent, end_percent))
                    c_net.set_previous_controlnet(prev_cnet)
                    cnets[prev_cnet] = c_net

                d['control'] = c_net
                d['control_apply_to_uncond'] = False
                n = [t[0], d]
                c.append(n)
            out.append(c)
        return (out[0], out[1])

```
