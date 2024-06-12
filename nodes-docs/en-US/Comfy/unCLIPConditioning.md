---
tags:
- CLIP
- CLIPConditioning
- Conditioning
---

# unCLIPConditioning
## Documentation
- Class name: `unCLIPConditioning`
- Category: `conditioning`
- Output node: `False`

This node is designed to integrate CLIP vision outputs into the conditioning process, adjusting the influence of these outputs based on specified strength and noise augmentation parameters. It enriches the conditioning with visual context, enhancing the generation process.
## Input types
### Required
- **`conditioning`**
    - The base conditioning data to which the CLIP vision outputs are to be added, serving as the foundation for further modifications.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
- **`clip_vision_output`**
    - The output from a CLIP vision model, providing visual context that is integrated into the conditioning.
    - Comfy dtype: `CLIP_VISION_OUTPUT`
    - Python dtype: `Dict[str, Any]`
- **`strength`**
    - Determines the intensity of the CLIP vision output's influence on the conditioning.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise_augmentation`**
    - Specifies the level of noise augmentation to apply to the CLIP vision output before integrating it into the conditioning.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The enriched conditioning data, now containing integrated CLIP vision outputs with applied strength and noise augmentation.
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [ConditioningConcat](../../Comfy/Nodes/ConditioningConcat.md)



## Source code
```python
class unCLIPConditioning:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning": ("CONDITIONING", ),
                             "clip_vision_output": ("CLIP_VISION_OUTPUT", ),
                             "strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             "noise_augmentation": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                             }}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "apply_adm"

    CATEGORY = "conditioning"

    def apply_adm(self, conditioning, clip_vision_output, strength, noise_augmentation):
        if strength == 0:
            return (conditioning, )

        c = []
        for t in conditioning:
            o = t[1].copy()
            x = {"clip_vision_output": clip_vision_output, "strength": strength, "noise_augmentation": noise_augmentation}
            if "unclip_conditioning" in o:
                o["unclip_conditioning"] = o["unclip_conditioning"][:] + [x]
            else:
                o["unclip_conditioning"] = [x]
            n = [t[0], o]
            c.append(n)
        return (c, )

```
