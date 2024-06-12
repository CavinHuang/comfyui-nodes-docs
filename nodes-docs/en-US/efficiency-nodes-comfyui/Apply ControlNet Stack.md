---
tags:
- ControlNet
---

# Apply ControlNet Stack
## Documentation
- Class name: `Apply ControlNet Stack`
- Category: `Efficiency Nodes/Stackers`
- Output node: `False`

The Apply ControlNet Stack node is designed to enhance the conditioning of positive and negative prompts by applying a stack of control networks. This process allows for the dynamic adjustment of the prompts based on specified control networks, images, and strength parameters, thereby refining the conditioning for more targeted and effective generation outcomes.
## Input types
### Required
- **`positive`**
    - The positive prompt to be conditioned. It serves as the initial input for the control network stack application, influencing the generation towards desired attributes or themes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[str, Dict]]`
- **`negative`**
    - The negative prompt to be conditioned. It acts as a counterpart to the positive prompt, guiding the generation away from undesired attributes or themes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[str, Dict]]`
### Optional
- **`cnet_stack`**
    - An optional stack of control networks and associated parameters that are applied sequentially to the positive and negative prompts. This stack enables complex, layered adjustments to the conditioning.
    - Comfy dtype: `CONTROL_NET_STACK`
    - Python dtype: `Optional[List[Tuple[ControlNet, torch.Tensor, float, float, float]]]`
## Output types
- **`CONDITIONING+`**
    - Comfy dtype: `CONDITIONING`
    - The conditioned positive prompt after the application of the control network stack.
    - Python dtype: `List[Tuple[str, Dict]]`
- **`CONDITIONING-`**
    - Comfy dtype: `CONDITIONING`
    - The conditioned negative prompt after the application of the control network stack.
    - Python dtype: `List[Tuple[str, Dict]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_Apply_ControlNet_Stack:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"positive": ("CONDITIONING",),
                             "negative": ("CONDITIONING",)},
                "optional": {"cnet_stack": ("CONTROL_NET_STACK",)}
                }

    RETURN_TYPES = ("CONDITIONING","CONDITIONING",)
    RETURN_NAMES = ("CONDITIONING+","CONDITIONING-",)
    FUNCTION = "apply_cnet_stack"
    CATEGORY = "Efficiency Nodes/Stackers"

    def apply_cnet_stack(self, positive, negative, cnet_stack=None):
        if cnet_stack is None:
            return (positive, negative)

        for control_net_tuple in cnet_stack:
            control_net, image, strength, start_percent, end_percent = control_net_tuple
            controlnet_conditioning = ControlNetApplyAdvanced().apply_controlnet(positive, negative, control_net, image,
                                                                                 strength, start_percent, end_percent)
            positive, negative = controlnet_conditioning[0], controlnet_conditioning[1]

        return (positive, negative, )

```
