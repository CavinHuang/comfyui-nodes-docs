
# Documentation
- Class name: Automatic CFG - Post rescale only
- Category: model_patches/automatic_cfg/presets
- Output node: False

本节点设计用于对生成模型的输出进行后处理重缩放操作，主要目标是根据重缩放因子调整模型输出。它旨在通过调整输出的尺度来优化模型的预测，从而增强生成过程中条件和非条件组件之间的平衡。

# Input types
## Required
- model
    - 将要应用后处理重缩放操作的生成模型。该参数至关重要，因为它决定了哪个基础模型的输出将被调整。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- subtract_latent_mean
    - 一个布尔标志，指示是否应从模型输出中减去潜在均值，这会影响最终生成结果的特征。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- subtract_latent_mean_sigma_start
    - 定义减去潜在均值操作的起始sigma值，影响该操作在生成过程中的应用时机。
    - Comfy dtype: FLOAT
    - Python dtype: float
- subtract_latent_mean_sigma_end
    - 定义减去潜在均值操作的结束sigma值，标记该操作应用范围的终点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- latent_intensity_rescale
    - 一个布尔标志，指示是否应重新缩放潜在空间的强度，这会影响生成输出的视觉质量和特征。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- latent_intensity_rescale_method
    - 指定用于重新缩放潜在空间强度的方法，影响重缩放操作的执行方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- latent_intensity_rescale_cfg
    - 潜在强度重缩放操作的配置值，决定了应用的重缩放强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- latent_intensity_rescale_sigma_start
    - 定义潜在强度重缩放操作的起始sigma值，影响该调整在生成过程中的应用时机。
    - Comfy dtype: FLOAT
    - Python dtype: float
- latent_intensity_rescale_sigma_end
    - 定义潜在强度重缩放操作的结束sigma值，标记该调整应用范围的终点。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 应用了后处理重缩放操作的修改后的生成模型。此输出反映了对模型输出缩放所做的调整，旨在提高生成质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class postCFGrescaleOnly:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                                "model": ("MODEL",),
                                "subtract_latent_mean" : ("BOOLEAN", {"default": True}),
                                "subtract_latent_mean_sigma_start": ("FLOAT", {"default": 15,  "min": 0.0, "max": 10000.0, "step": 0.1, "round": 0.1}),
                                "subtract_latent_mean_sigma_end":   ("FLOAT", {"default": 7.5, "min": 0.0, "max": 10000.0, "step": 0.1, "round": 0.1}),
                                "latent_intensity_rescale"     : ("BOOLEAN", {"default": True}),
                                "latent_intensity_rescale_method" : (["soft","hard","range"], {"default": "hard"},),
                                "latent_intensity_rescale_cfg" : ("FLOAT", {"default": 7.6,  "min": 0.0, "max": 100.0, "step": 0.1, "round": 0.1}),
                                "latent_intensity_rescale_sigma_start": ("FLOAT", {"default": 15,  "min": 0.0, "max": 10000.0, "step": 0.1, "round": 0.1}),
                                "latent_intensity_rescale_sigma_end":   ("FLOAT", {"default": 7.5, "min": 0.0, "max": 10000.0, "step": 0.1, "round": 0.1}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "model_patches/automatic_cfg/presets"

    def patch(self, model,
              subtract_latent_mean, subtract_latent_mean_sigma_start, subtract_latent_mean_sigma_end,
              latent_intensity_rescale, latent_intensity_rescale_method, latent_intensity_rescale_cfg, latent_intensity_rescale_sigma_start, latent_intensity_rescale_sigma_end
              ):
        advcfg = advancedDynamicCFG()
        m = advcfg.patch(model=model, 
                         subtract_latent_mean = subtract_latent_mean,
                         subtract_latent_mean_sigma_start = subtract_latent_mean_sigma_start, subtract_latent_mean_sigma_end = subtract_latent_mean_sigma_end,
                         latent_intensity_rescale = latent_intensity_rescale, latent_intensity_rescale_cfg = latent_intensity_rescale_cfg, latent_intensity_rescale_method = latent_intensity_rescale_method,
                         latent_intensity_rescale_sigma_start = latent_intensity_rescale_sigma_start, latent_intensity_rescale_sigma_end = latent_intensity_rescale_sigma_end,
                         ignore_pre_cfg_func = True
                         )[0]
        return (m, )

```
