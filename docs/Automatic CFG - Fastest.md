
# Documentation
- Class name: Automatic CFG - Fastest
- Category: model_patches/automatic_cfg/presets
- Output node: False

这个节点为模型应用了一个高速配置补丁，优化模型以获得更快的性能，同时不影响生成内容的质量。它使用了一种先进的配置来简化模型的操作，使其非常适合需要快速调整的场景。

# Input types
## Required
- model
    - 需要应用高速配置补丁的模型。它是经过优化以提高性能的核心组件。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Output types
- model
    - 经过高速配置优化的模型，具有更好的性能表现。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class simpleDynamicCFGHighSpeed:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                                "model": ("MODEL",),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "model_patches/automatic_cfg/presets"

    def patch(self, model):
        advcfg = advancedDynamicCFG()
        m = advcfg.patch(model=model, automatic_cfg = "hard",
                         skip_uncond = True, uncond_sigma_start = 7.5, uncond_sigma_end = 1,
                         latent_intensity_rescale = False, latent_intensity_rescale_cfg = 7.6,
                         latent_intensity_rescale_sigma_start = 15, latent_intensity_rescale_sigma_end = 7.5,
                         latent_intensity_rescale_method = "hard")[0]
        return (m, )

```
