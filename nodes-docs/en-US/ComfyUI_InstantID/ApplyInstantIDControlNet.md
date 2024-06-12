---
tags:
- IdentityImage
---

# InstantID Apply ControlNet
## Documentation
- Class name: `ApplyInstantIDControlNet`
- Category: `InstantID`
- Output node: `False`

This node is designed to apply a control network to modify facial embeddings based on specified conditions, leveraging insights from facial analysis and control network parameters to achieve targeted modifications in facial representations.
## Input types
### Required
- **`face_embeds`**
    - Facial embeddings that represent the key features of a face, serving as the input for targeted modifications.
    - Comfy dtype: `FACE_EMBEDS`
    - Python dtype: `torch.Tensor`
- **`control_net`**
    - The control network model used to apply modifications to the facial embeddings.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `torch.nn.Module`
- **`image_kps`**
    - Key points from the image that are used to guide the modifications applied by the control network.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`positive`**
    - Positive conditioning phrases or keywords that guide the direction of the modifications.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Negative conditioning phrases or keywords that specify undesired attributes to be avoided in the modifications.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`strength`**
    - The intensity of the modifications applied by the control network.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_at`**
    - The starting point in the process where modifications begin to be applied.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - The ending point in the process where modifications cease to be applied.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`mask`**
    - An optional mask that can be used to localize the modifications applied by the control network.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The modified positive conditioning after applying the control network, reflecting the targeted modifications.
    - Python dtype: `List[Tuple[str, Dict]]`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The modified negative conditioning after applying the control network, reflecting the avoidance of specified undesired attributes.
    - Python dtype: `List[Tuple[str, Dict]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ApplyInstantIDControlNet:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "face_embeds": ("FACE_EMBEDS", ),
                "control_net": ("CONTROL_NET", ),
                "image_kps": ("IMAGE", ),
                "positive": ("CONDITIONING", ),
                "negative": ("CONDITIONING", ),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01, }),
                "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001, }),
                "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001, }),
            },
            "optional": {
                "mask": ("MASK",),
            }
        }

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING",)
    RETURN_NAMES = ("positive", "negative", )
    FUNCTION = "apply_controlnet"
    CATEGORY = "InstantID"

    def apply_controlnet(self, face_embeds, control_net, image_kps, positive, negative, strength, start_at, end_at, mask=None):
        self.device = comfy.model_management.get_torch_device()

        if strength == 0:
            return (positive, negative)

        if mask is not None:
            mask = mask.to(self.device)

        if mask is not None and len(mask.shape) < 3:
            mask = mask.unsqueeze(0)

        image_prompt_embeds = face_embeds['cond']
        uncond_image_prompt_embeds = face_embeds['uncond']

        cnets = {}
        cond_uncond = []
        control_hint = image_kps.movedim(-1,1)

        is_cond = True
        for conditioning in [positive, negative]:
            c = []
            for t in conditioning:
                d = t[1].copy()

                prev_cnet = d.get('control', None)
                if prev_cnet in cnets:
                    c_net = cnets[prev_cnet]
                else:
                    c_net = control_net.copy().set_cond_hint(control_hint, strength, (start_at, end_at))
                    c_net.set_previous_controlnet(prev_cnet)
                    cnets[prev_cnet] = c_net

                d['control'] = c_net
                d['control_apply_to_uncond'] = False
                d['cross_attn_controlnet'] = image_prompt_embeds.to(comfy.model_management.intermediate_device()) if is_cond else uncond_image_prompt_embeds.to(comfy.model_management.intermediate_device())

                if mask is not None and is_cond:
                    d['mask'] = mask
                    d['set_area_to_bounds'] = False

                n = [t[0], d]
                c.append(n)
            cond_uncond.append(c)
            is_cond = False

        return(cond_uncond[0], cond_uncond[1])

```
