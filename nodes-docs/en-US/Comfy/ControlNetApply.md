---
tags:
- ControlNet
---

# Apply ControlNet
## Documentation
- Class name: `ControlNetApply`
- Category: `conditioning`
- Output node: `False`

This node applies a control network to a given image and conditioning, adjusting the image's attributes based on the control network's parameters and a specified strength. It enables dynamic modification of image characteristics through control hints, facilitating targeted adjustments without altering the original conditioning structure.
## Input types
### Required
- **`conditioning`**
    - The conditioning data to be modified by the control network. It serves as the basis for the control network's adjustments, influencing the final output.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
- **`control_net`**
    - The control network to be applied. It defines the specific adjustments to be made to the image, based on its trained parameters.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `ControlNet`
- **`image`**
    - The image to which the control network's adjustments will be applied. It provides the visual context for the control network's operations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`strength`**
    - A scalar value determining the intensity of the control network's adjustments. It allows for fine-tuning the impact of the control network on the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The modified conditioning data, reflecting the adjustments made by the control network.
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - Reroute
    - [ConditioningSetArea](../../Comfy/Nodes/ConditioningSetArea.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)
    - [ttN pipeKSampler](../../ComfyUI_tinyterraNodes/Nodes/ttN pipeKSampler.md)
    - YDetailer
    - [ToBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ToBasicPipe.md)
    - [ToDetailerPipe](../../ComfyUI-Impact-Pack/Nodes/ToDetailerPipe.md)
    - [ControlNetApply](../../Comfy/Nodes/ControlNetApply.md)



## Source code
```python
class ControlNetApply:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning": ("CONDITIONING", ),
                             "control_net": ("CONTROL_NET", ),
                             "image": ("IMAGE", ),
                             "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01})
                             }}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "apply_controlnet"

    CATEGORY = "conditioning"

    def apply_controlnet(self, conditioning, control_net, image, strength):
        if strength == 0:
            return (conditioning, )

        c = []
        control_hint = image.movedim(-1,1)
        for t in conditioning:
            n = [t[0], t[1].copy()]
            c_net = control_net.copy().set_cond_hint(control_hint, strength)
            if 'control' in t[1]:
                c_net.set_previous_controlnet(t[1]['control'])
            n[1]['control'] = c_net
            n[1]['control_apply_to_uncond'] = True
            c.append(n)
        return (c, )

```
