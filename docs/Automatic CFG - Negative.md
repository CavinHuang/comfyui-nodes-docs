
# Documentation
- Class name: Automatic CFG - Negative
- Category: model_patches/automatic_cfg/presets
- Output node: False

该节点专门用于对生成内容的模型应用动态配置，重点是通过根据负面提示调整模型的行为来增强生成过程。它利用先进的配置技术来微调模型的输出，旨在减轻用户指定的负面方面的影响。

# Input types
## Required
- model
    - model参数是该节点修改的核心组件，应用动态配置来调整其内容生成行为。
    - Comfy dtype: MODEL
    - Python dtype: MODEL
- boost
    - boost参数决定是否跳过无条件生成步骤，有效地改变模型的生成过程，以更加关注指定的条件。
    - Comfy dtype: BOOLEAN
    - Python dtype: BOOLEAN
- negative_strength
    - 该参数控制负面条件的强度，允许微调模型在生成过程中应该如何减轻或忽略指定的负面方面。
    - Comfy dtype: FLOAT
    - Python dtype: FLOAT

# Output types
- model
    - 应用了动态配置的修改后模型，专门用于通过考虑负面提示来增强内容生成。
    - Comfy dtype: MODEL
    - Python dtype: MODEL


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class simpleDynamicCFGlerpUncond:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                                "model": ("MODEL",),
                                "boost" : ("BOOLEAN", {"default": True}),
                                "negative_strength": ("FLOAT", {"default": 1, "min": 0.0, "max": 5.0, "step": 0.1, "round": 0.1}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "model_patches/automatic_cfg/presets"

    def patch(self, model, boost, negative_strength):
        advcfg = advancedDynamicCFG()
        m = advcfg.patch(model=model,
                         automatic_cfg="hard", skip_uncond=boost,
                         uncond_sigma_start = 15, uncond_sigma_end = 1,
                         lerp_uncond=negative_strength != 1, lerp_uncond_strength=negative_strength,
                         lerp_uncond_sigma_start = 15, lerp_uncond_sigma_end = 1
                         )[0]
        return (m, )

```
