---
tags:
- Style
---

# Apply Style Model
## Documentation
- Class name: `StyleModelApply`
- Category: `conditioning/style_model`
- Output node: `False`

This node applies a style model to a given conditioning, enhancing or altering its style based on the output of a CLIP vision model. It integrates the style model's conditioning into the existing conditioning, allowing for a seamless blend of styles in the generation process.
## Input types
### Required
- **`conditioning`**
    - The original conditioning data to which the style model's conditioning will be applied. It's crucial for defining the base context or style that will be enhanced or altered.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Dict]]`
- **`style_model`**
    - The style model used to generate new conditioning based on the CLIP vision model's output. It plays a key role in defining the new style to be applied.
    - Comfy dtype: `STYLE_MODEL`
    - Python dtype: `StyleModel`
- **`clip_vision_output`**
    - The output from a CLIP vision model, which is used by the style model to generate new conditioning. It provides the visual context necessary for style application.
    - Comfy dtype: `CLIP_VISION_OUTPUT`
    - Python dtype: `torch.Tensor`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The enhanced or altered conditioning, incorporating the style model's output. It represents the final, styled conditioning ready for further processing or generation.
    - Python dtype: `List[Tuple[torch.Tensor, Dict]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class StyleModelApply:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning": ("CONDITIONING", ),
                             "style_model": ("STYLE_MODEL", ),
                             "clip_vision_output": ("CLIP_VISION_OUTPUT", ),
                             }}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "apply_stylemodel"

    CATEGORY = "conditioning/style_model"

    def apply_stylemodel(self, clip_vision_output, style_model, conditioning):
        cond = style_model.get_cond(clip_vision_output).flatten(start_dim=0, end_dim=1).unsqueeze(dim=0)
        c = []
        for t in conditioning:
            n = [torch.cat((t[0], cond), dim=1), t[1].copy()]
            c.append(n)
        return (c, )

```
