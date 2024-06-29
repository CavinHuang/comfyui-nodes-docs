---
tags:
- ControlNet
---

# ControlNetHadamard
## Documentation
- Class name: `ControlNetHadamard`
- Category: `Bmad/conditioning`
- Output node: `False`

This node applies a control network to a set of images and conditions, adjusting the conditions based on the control network's output and a specified strength. It's designed for dynamic image conditioning, allowing for the modification of image attributes or styles according to the control network's logic.
## Input types
### Required
- **`conds`**
    - The conditions to be applied to each image, which are modified by the control network to achieve the desired effect.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, Any]]]`
- **`control_net`**
    - The control network used to modify the conditions based on the images and the specified strength.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `torch.nn.Module`
- **`image`**
    - The images to which the conditions are applied, serving as the basis for the control network's modifications.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`strength`**
    - Determines the intensity of the control network's effect on the conditions, allowing for fine-tuned adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The modified conditions after being processed by the control network, reflecting the applied changes.
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, Any]]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ControlNetHadamard(nodes.ControlNetApply):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conds": ("CONDITIONING",),
                             "control_net": ("CONTROL_NET",),
                             "image": ("IMAGE",),
                             "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                             }}

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "apply"
    CATEGORY = "Bmad/conditioning"
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)

    def apply(self, conds, control_net, images, strength):
        control_net = control_net[0]
        strength = strength[0]

        if len(images) != len(conds):
            raise "lists sizes do not match"  # maybe relax check and allow for fewer conds than images?

        print(len(images))
        print(len(images[0]))
        print(len(conds))
        new_conds = []
        for i in range(len(images)):
            new_conds.append(super().apply_controlnet(conds[i], control_net, images[i], strength)[0])
        return (new_conds,)

```
