---
tags:
- Style
---

# Style Conditioner Base Only (Mikey)
## Documentation
- Class name: `Style Conditioner Base Only`
- Category: `Mikey/Conditioning`
- Output node: `False`

This node is designed to conditionally apply styling to a base input without the additional refinement layer, focusing on modifying the base attributes according to a specified style and strength. It abstracts the complexity of style application, ensuring that the base input is enhanced or altered in a manner consistent with the desired aesthetic or thematic direction.
## Input types
### Required
- **`style`**
    - Specifies the style to be applied. This affects the overall aesthetic or thematic direction of the base input.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength`**
    - Determines the intensity of the style application, influencing how significantly the base input is altered.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`positive_cond_base`**
    - The base positive conditioning to which the style will be applied, serving as the initial state before styling.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`negative_cond_base`**
    - The base negative conditioning to which the style will be applied, complementing the positive conditioning in defining the initial styling state.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`base_clip`**
    - The CLIP model used for encoding the style prompts, integral to the process of applying the specified style.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`use_seed`**
    - Indicates whether a seed should be used to deterministically select a style from a predefined set, ensuring reproducibility.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`seed`**
    - The seed value used for deterministic style selection when 'use_seed' is true, affecting the style choice.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`base_pos_cond`**
    - Comfy dtype: `CONDITIONING`
    - The modified positive base conditioning after the style has been applied, reflecting the desired aesthetic changes.
    - Python dtype: `torch.Tensor`
- **`base_neg_cond`**
    - Comfy dtype: `CONDITIONING`
    - The modified negative base conditioning after the style has been applied, complementing the positive conditioning in the styled output.
    - Python dtype: `torch.Tensor`
- **`style_str`**
    - Comfy dtype: `STRING`
    - The style that was applied, providing a reference to the aesthetic or thematic direction chosen.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class StyleConditionerBaseOnly:
    @classmethod
    def INPUT_TYPES(s):
        s.styles, s.pos_style, s.neg_style = read_styles()
        return {"required": {"style": (s.styles,),"strength": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                             "positive_cond_base": ("CONDITIONING",), "negative_cond_base": ("CONDITIONING",),
                             "base_clip": ("CLIP",),
                             "use_seed": (['true','false'], {'default': 'false'}),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             }
        }

    RETURN_TYPES = ('CONDITIONING','CONDITIONING','STRING',)
    RETURN_NAMES = ('base_pos_cond','base_neg_cond','style_str',)
    FUNCTION = 'add_style'
    CATEGORY = 'Mikey/Conditioning'

    def add_style(self, style, strength, positive_cond_base, negative_cond_base,
                  base_clip,
                  use_seed, seed):
        if use_seed == 'true' and len(self.styles) > 0:
            offset = seed % len(self.styles)
            style = self.styles[offset]
        pos_prompt = self.pos_style[style]
        neg_prompt = self.neg_style[style]
        pos_prompt = pos_prompt.replace('{prompt}', '')
        neg_prompt = neg_prompt.replace('{prompt}', '')
        if style == 'none':
            return (positive_cond_base, negative_cond_base, style, )
        # encode the style prompt
        positive_cond_base_new = CLIPTextEncodeSDXL.encode(self, base_clip, 1024, 1024, 0, 0, 1024, 1024, pos_prompt, pos_prompt)[0]
        negative_cond_base_new = CLIPTextEncodeSDXL.encode(self, base_clip, 1024, 1024, 0, 0, 1024, 1024, neg_prompt, neg_prompt)[0]
        # average the style prompt with the existing conditioning
        positive_cond_base = ConditioningAverage.addWeighted(self, positive_cond_base_new, positive_cond_base, strength)[0]
        negative_cond_base = ConditioningAverage.addWeighted(self, negative_cond_base_new, negative_cond_base, strength)[0]
        return (positive_cond_base, negative_cond_base, style, )

```
