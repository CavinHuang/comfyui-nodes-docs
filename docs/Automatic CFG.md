
# Documentation
- Class name: Automatic CFG
- Category: model_patches/automatic_cfg/presets
- Output node: False

Automatic CFG节点通过基于'boost'标志调整参数来为模型应用动态配置，从而增强其性能。这种调整旨在优化模型的运行，可能会提高效率和输出质量。

# Input types
## Required
- model
    - model参数代表将应用动态配置的模型。它对于定义进行调整和优化的基础至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- boost
    - boost标志决定了配置调整的强度。启用boost会应用更激进的优化策略，可能会显著提升模型性能。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- model
    - 输出是输入模型的修改版本，通过动态配置调整进行了优化，以提高性能。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class simpleDynamicCFG:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                                "model": ("MODEL",),
                                "boost" : ("BOOLEAN", {"default": True}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "model_patches/automatic_cfg/presets"

    def patch(self, model, boost):
        advcfg = advancedDynamicCFG()
        m = advcfg.patch(model,
                         skip_uncond = boost,
                         uncond_sigma_start = 15,  uncond_sigma_end = 1,
                         automatic_cfg = "hard" if boost else "soft"
                         )[0]
        return (m, )

```
