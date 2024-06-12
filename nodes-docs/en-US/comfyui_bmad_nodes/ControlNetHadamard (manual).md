---
tags:
- ControlNet
---

# ControlNetHadamard (manual)
## Documentation
- Class name: `ControlNetHadamard (manual)`
- Category: `Bmad/conditioning`
- Output node: `False`

This node applies a control network to a set of images based on provided conditions and a specified strength, adjusting the images' conditioning for further processing. It leverages the concept of Hadamard product in the context of control networks to modulate the influence of the control network on the images.
## Input types
### Required
- **`conds`**
    - Conditions to apply to each image, determining how the control network modifies the image.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[str, Dict[str, Any]]]`
- **`control_net`**
    - The control network to be applied to the images, dictating the nature of the modifications.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `torch.nn.Module`
- **`strength`**
    - A scalar value determining the intensity of the control network's effect on the images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`inputs_len`**
    - Specifies the number of images to be processed, allowing for dynamic adjustment based on input.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The modified conditions after applying the control network to the images.
    - Python dtype: `List[Tuple[str, Dict[str, Any]]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ControlNetHadamardManual(ControlNetHadamard):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conds": ("CONDITIONING",),
                             "control_net": ("CONTROL_NET",),
                             "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                             "inputs_len": ("INT", {"default": 9, "min": 0, "max": 32})
                             }}

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "apply"
    CATEGORY = "Bmad/conditioning"
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)

    def apply(self, conds, control_net, strength, inputs_len, **kwargs):
        inputs_len = inputs_len[0]
        images = []
        for i in range(inputs_len):
            arg_name = get_arg_name_from_multiple_inputs("image", i)
            images.append(kwargs[arg_name][0])
        return super().apply(conds, control_net, images, strength)

```
