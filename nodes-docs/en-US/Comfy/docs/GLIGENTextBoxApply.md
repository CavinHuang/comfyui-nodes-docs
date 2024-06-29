---
tags:
- CLIP
- Conditioning
---

# GLIGENTextBoxApply
## Documentation
- Class name: `GLIGENTextBoxApply`
- Category: `conditioning/gligen`
- Output node: `False`

The GLIGENTextBoxApply node is designed to append text-based conditioning to a given set of conditioning inputs using a GLIGEN model. It utilizes CLIP to encode the text and integrates the encoded information into the conditioning, allowing for text-driven modifications in generative tasks.
## Input types
### Required
- **`conditioning_to`**
    - The set of conditioning inputs to which the text-based conditioning will be appended. It serves as the foundation for text-driven modifications.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, Union[torch.Tensor, List[Any], Dict[str, Any]]]]]`
- **`clip`**
    - The CLIP model used for encoding the input text into a format suitable for conditioning. It plays a crucial role in interpreting the text semantically.
    - Comfy dtype: `CLIP`
    - Python dtype: `CLIP`
- **`gligen_textbox_model`**
    - The GLIGEN model responsible for applying the text-based conditioning. It defines how the text influences the generative process.
    - Comfy dtype: `GLIGEN`
    - Python dtype: `GLIGEN`
- **`text`**
    - The input text to be encoded and applied as conditioning. This text drives the modifications in the generative task.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`width`**
    - The width parameter specifies the dimension to which the text conditioning should be applied, influencing the spatial aspect of the conditioning.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The height parameter specifies the dimension to which the text conditioning should be applied, influencing the spatial aspect of the conditioning.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`x`**
    - The x-coordinate for the positioning of the text-based conditioning, affecting its spatial placement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y`**
    - The y-coordinate for the positioning of the text-based conditioning, affecting its spatial placement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The modified set of conditioning inputs, now including the text-based conditioning applied through the GLIGEN model.
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, Union[torch.Tensor, List[Any], Dict[str, Any]]]]]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [ToDetailerPipe](../../ComfyUI-Impact-Pack/Nodes/ToDetailerPipe.md)



## Source code
```python
class GLIGENTextBoxApply:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning_to": ("CONDITIONING", ),
                              "clip": ("CLIP", ),
                              "gligen_textbox_model": ("GLIGEN", ),
                              "text": ("STRING", {"multiline": True, "dynamicPrompts": True}),
                              "width": ("INT", {"default": 64, "min": 8, "max": MAX_RESOLUTION, "step": 8}),
                              "height": ("INT", {"default": 64, "min": 8, "max": MAX_RESOLUTION, "step": 8}),
                              "x": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                              "y": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                             }}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "append"

    CATEGORY = "conditioning/gligen"

    def append(self, conditioning_to, clip, gligen_textbox_model, text, width, height, x, y):
        c = []
        cond, cond_pooled = clip.encode_from_tokens(clip.tokenize(text), return_pooled="unprojected")
        for t in conditioning_to:
            n = [t[0], t[1].copy()]
            position_params = [(cond_pooled, height // 8, width // 8, y // 8, x // 8)]
            prev = []
            if "gligen" in n[1]:
                prev = n[1]['gligen'][2]

            n[1]['gligen'] = ("position", gligen_textbox_model, prev + position_params)
            c.append(n)
        return (c, )

```
