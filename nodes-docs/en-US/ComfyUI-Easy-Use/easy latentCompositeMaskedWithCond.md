---
tags:
- Latent
- LatentBlend
---

# LatentCompositeMaskedWithCond
## Documentation
- Class name: `easy latentCompositeMaskedWithCond`
- Category: `EasyUse/Latent`
- Output node: `True`

This node is designed for advanced image manipulation within the latent space, specifically tailored for conditional composite operations. It enables the blending of two latent representations based on a mask, with additional conditions that can modify the blending process. This functionality is crucial for creating nuanced and contextually aware modifications to generated images, allowing for precise control over the composition of visual elements.
## Input types
### Required
- **`pipe`**
    - unknown
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `unknown`
- **`text_combine`**
    - unknown
    - Comfy dtype: `LIST`
    - Python dtype: `unknown`
- **`source_latent`**
    - unknown
    - Comfy dtype: `LATENT`
    - Python dtype: `unknown`
- **`source_mask`**
    - unknown
    - Comfy dtype: `MASK`
    - Python dtype: `unknown`
- **`destination_mask`**
    - unknown
    - Comfy dtype: `MASK`
    - Python dtype: `unknown`
- **`text_combine_mode`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`replace_text`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - unknown
    - Python dtype: `unknown`
- **`latent`**
    - Comfy dtype: `LATENT`
    - unknown
    - Python dtype: `unknown`
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class latentCompositeMaskedWithCond:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pipe": ("PIPE_LINE",),
                "text_combine": ("LIST",),
                "source_latent": ("LATENT",),
                "source_mask": ("MASK",),
                "destination_mask": ("MASK",),
                "text_combine_mode": (["add", "replace", "cover"], {"default": "add"}),
                "replace_text": ("STRING", {"default": ""})
            },
            "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID"},
        }

    OUTPUT_IS_LIST = (False, False, True)
    RETURN_TYPES = ("PIPE_LINE", "LATENT", "CONDITIONING")
    RETURN_NAMES = ("pipe", "latent", "conditioning",)
    FUNCTION = "run"
    OUTPUT_NODE = True

    CATEGORY = "EasyUse/Latent"

    def run(self, pipe, text_combine, source_latent, source_mask, destination_mask, text_combine_mode, replace_text, prompt=None, extra_pnginfo=None, my_unique_id=None):
        positive = None
        clip = pipe["clip"]
        destination_latent = pipe["samples"]

        conds = []

        for text in text_combine:
            if text_combine_mode == 'cover':
                positive = text
            elif text_combine_mode == 'replace' and replace_text != '':
                positive = pipe["loader_settings"]["positive"].replace(replace_text, text)
            else:
                positive = pipe["loader_settings"]["positive"] + ',' + text
            positive_token_normalization = pipe["loader_settings"]["positive_token_normalization"]
            positive_weight_interpretation = pipe["loader_settings"]["positive_weight_interpretation"]
            a1111_prompt_style = pipe["loader_settings"]["a1111_prompt_style"]
            positive_cond = pipe["positive"]

            log_node_warn("正在处理提示词编码...")
            steps = pipe["loader_settings"]["steps"] if "steps" in pipe["loader_settings"] else 1
            positive_embeddings_final = advanced_encode(clip, positive,
                                         positive_token_normalization,
                                         positive_weight_interpretation, w_max=1.0,
                                         apply_to_pooled='enable', a1111_prompt_style=a1111_prompt_style, steps=steps)

            # source cond
            (cond_1,) = ConditioningSetMask().append(positive_cond, source_mask, "default", 1)
            (cond_2,) = ConditioningSetMask().append(positive_embeddings_final, destination_mask, "default", 1)
            positive_cond = cond_1 + cond_2

            conds.append(positive_cond)
        # latent composite masked
        (samples,) = LatentCompositeMasked().composite(destination_latent, source_latent, 0, 0, False)

        new_pipe = {
            **pipe,
            "samples": samples,
            "loader_settings": {
                **pipe["loader_settings"],
                "positive": positive,
            }
        }

        del pipe

        return (new_pipe, samples, conds)

```
