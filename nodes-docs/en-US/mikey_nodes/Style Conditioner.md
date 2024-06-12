---
tags:
- Style
---

# Style Conditioner (Mikey)
## Documentation
- Class name: `Style Conditioner`
- Category: `Mikey/Conditioning`
- Output node: `False`

The StyleConditioner node is designed to apply specific stylistic adjustments to conditioning bases and refiners, leveraging a combination of predefined and dynamically generated style prompts. It utilizes seed-based selection for styles and performs encoding and averaging operations to blend the selected style with the existing conditioning, enabling nuanced control over the stylistic output.
## Input types
### Required
- **`style`**
    - Specifies the style to be applied. This can dynamically change the appearance or thematic elements of the output by adjusting the conditioning bases and refiners according to the selected style.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength`**
    - Determines the intensity of the style application, affecting how strongly the selected style influences the conditioning bases and refiners.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`positive_cond_base`**
    - The initial positive conditioning base to which the style adjustments will be applied.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`negative_cond_base`**
    - The initial negative conditioning base to which the style adjustments will be applied.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`positive_cond_refiner`**
    - The initial positive conditioning refiner to which the style adjustments will be applied.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`negative_cond_refiner`**
    - The initial negative conditioning refiner to which the style adjustments will be applied.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`base_clip`**
    - The CLIP model used for encoding the base conditioning.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`refiner_clip`**
    - The CLIP model used for encoding the refiner conditioning.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`use_seed`**
    - Indicates whether a seed should be used for selecting the style, enabling deterministic style selection.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - The seed value used for deterministic style selection when 'use_seed' is true.
    - Comfy dtype: `INT`
    - Python dtype: `str`
## Output types
- **`base_pos_cond`**
    - Comfy dtype: `CONDITIONING`
    - Returns the updated positive conditioning base after style adjustments.
    - Python dtype: `torch.Tensor`
- **`base_neg_cond`**
    - Comfy dtype: `CONDITIONING`
    - Returns the updated negative conditioning base after style adjustments.
    - Python dtype: `torch.Tensor`
- **`refiner_pos_cond`**
    - Comfy dtype: `CONDITIONING`
    - Returns the updated positive conditioning refiner after style adjustments.
    - Python dtype: `torch.Tensor`
- **`refiner_neg_cond`**
    - Comfy dtype: `CONDITIONING`
    - Returns the updated negative conditioning refiner after style adjustments.
    - Python dtype: `torch.Tensor`
- **`style_str`**
    - Comfy dtype: `STRING`
    - Returns the string representation of the applied style.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class StyleConditioner:
    @classmethod
    def INPUT_TYPES(s):
        s.styles, s.pos_style, s.neg_style = read_styles()
        return {"required": {"style": (s.styles,),"strength": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.1}),
                             "positive_cond_base": ("CONDITIONING",), "negative_cond_base": ("CONDITIONING",),
                             "positive_cond_refiner": ("CONDITIONING",), "negative_cond_refiner": ("CONDITIONING",),
                             "base_clip": ("CLIP",), "refiner_clip": ("CLIP",),
                             "use_seed": (['true','false'], {'default': 'false'}),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             }
        }

    RETURN_TYPES = ('CONDITIONING','CONDITIONING','CONDITIONING','CONDITIONING','STRING',)
    RETURN_NAMES = ('base_pos_cond','base_neg_cond','refiner_pos_cond','refiner_neg_cond','style_str',)
    FUNCTION = 'add_style'
    CATEGORY = 'Mikey/Conditioning'

    def add_style(self, style, strength, positive_cond_base, negative_cond_base,
                  positive_cond_refiner, negative_cond_refiner, base_clip, refiner_clip,
                  use_seed, seed):
        if use_seed == 'true' and len(self.styles) > 0:
            offset = seed % len(self.styles)
            style = self.styles[offset]
        pos_prompt = self.pos_style[style]
        neg_prompt = self.neg_style[style]
        pos_prompt = pos_prompt.replace('{prompt}', '')
        neg_prompt = neg_prompt.replace('{prompt}', '')
        if style == 'none':
            return (positive_cond_base, negative_cond_base, positive_cond_refiner, negative_cond_refiner, style, )
        # encode the style prompt
        positive_cond_base_new = CLIPTextEncodeSDXL.encode(self, base_clip, 1024, 1024, 0, 0, 1024, 1024, pos_prompt, pos_prompt)[0]
        negative_cond_base_new = CLIPTextEncodeSDXL.encode(self, base_clip, 1024, 1024, 0, 0, 1024, 1024, neg_prompt, neg_prompt)[0]
        positive_cond_refiner_new = CLIPTextEncodeSDXLRefiner.encode(self, refiner_clip, 6, 4096, 4096, pos_prompt)[0]
        negative_cond_refiner_new = CLIPTextEncodeSDXLRefiner.encode(self, refiner_clip, 2.5, 4096, 4096, neg_prompt)[0]
        # average the style prompt with the existing conditioning
        positive_cond_base = ConditioningAverage.addWeighted(self, positive_cond_base_new, positive_cond_base, strength)[0]
        negative_cond_base = ConditioningAverage.addWeighted(self, negative_cond_base_new, negative_cond_base, strength)[0]
        positive_cond_refiner = ConditioningAverage.addWeighted(self, positive_cond_refiner_new, positive_cond_refiner, strength)[0]
        negative_cond_refiner = ConditioningAverage.addWeighted(self, negative_cond_refiner_new, negative_cond_refiner, strength)[0]

        return (positive_cond_base, negative_cond_base, positive_cond_refiner, negative_cond_refiner, style, )

```
