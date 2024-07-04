
# Documentation
- Class name: `Automatic CFG - Advanced`
- Category: `model_patches/automatic_cfg`
- Output node: `False`

Automatic CFG - Advanced节点代表了一种高级的动态控制流图(CFG)调整配置，旨在通过应用复杂的CFG修改来提高模型性能和灵活性。

# Input types
## Required
- **`model`**
    - 这是将要应用高级动态CFG调整的模型，作为增强的基础。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- **`automatic_cfg`**
    - 指定要应用的自动CFG调整级别，范围从基本到高级配置。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- **`skip_uncond`**
    - 决定是否跳过无条件生成步骤，优化模型在特定任务中的性能。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- **`uncond_sigma_start`**
    - 无条件生成的起始sigma值，是模型优化的微调参数之一。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`uncond_sigma_end`**
    - 无条件生成的结束sigma值，标志着模型优化的微调过程结束。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`lerp_uncond`**
    - 指示是否对无条件生成使用线性插值，增强模型的适应性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- **`lerp_uncond_strength`**
    - 无条件生成的线性插值强度，调整效果的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`lerp_uncond_sigma_start`**
    - 无条件生成中线性插值的起始sigma值，设置插值的初始条件。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`lerp_uncond_sigma_end`**
    - 无条件生成中线性插值的结束sigma值，确定插值的最终条件。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`subtract_latent_mean`**
    - 决定是否减去潜在空间的平均值，影响模型的生成过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- **`subtract_latent_mean_sigma_start`**
    - 减去潜在平均值的起始sigma值，影响调整的开始。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`subtract_latent_mean_sigma_end`**
    - 减去潜在平均值的结束sigma值，标志着调整的结束。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`latent_intensity_rescale`**
    - 指示是否应重新缩放潜在空间的强度，修改模型的输出。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- **`latent_intensity_rescale_method`**
    - 指定用于重新缩放潜在空间强度的方法，影响模型的行为。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- **`latent_intensity_rescale_cfg`**
    - 重新缩放潜在强度的配置值，决定调整的规模。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`latent_intensity_rescale_sigma_start`**
    - 重新缩放潜在强度的起始sigma值，设置重新缩放的初始参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`latent_intensity_rescale_sigma_end`**
    - 重新缩放潜在强度的结束sigma值，确定调整的最终参数。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- **`model`**
    - 应用了高级动态CFG调整的增强模型，准备好进行改进的性能和灵活性。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class advancedDynamicCFG:
    def __init__(self):
        self.last_cfg_ht_one = 8

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                                "model": ("MODEL",),

                                "automatic_cfg" : (["None","soft","hard","range"], {"default": "hard"},),

                                "skip_uncond" : ("BOOLEAN", {"default": True}),
                                "uncond_sigma_start": ("FLOAT", {"default": 7.5, "min": 0.0, "max": 10000.0, "step": 0.1, "round": 0.01}),
                                "uncond_sigma_end":   ("FLOAT", {"default": 1, "min": 0.0, "max": 10000.0, "step": 0.1, "round": 0.01}),

                                "lerp_uncond" : ("BOOLEAN", {"default": False}),
                                "lerp_uncond_strength":    ("FLOAT", {"default": 2, "min": 0.0, "max": 10.0, "step": 0.1, "round": 0.1}),
                                "lerp_uncond_sigma_start": ("FLOAT", {"default": 15,  "min": 0.0, "max": 10000.0, "step": 0.01, "round": 0.01}),
                                "lerp_uncond_sigma_end":   ("FLOAT", {"default": 1, "min": 0.0, "max": 10000.0, "step": 0.01, "round": 0.01}),

                                "subtract_latent_mean" : ("BOOLEAN", {"default": False}),
                                "subtract_latent_mean_sigma_start": ("FLOAT", {"default": 15,  "min": 0.0, "max": 10000.0, "step": 0.01, "round": 0.01}),
                                "subtract_latent_mean_sigma_end":   ("FLOAT", {"default": 7.5, "min": 0.0, "max": 10000.0, "step": 0.01, "round": 0.01}),

                                "latent_intensity_rescale"     : ("BOOLEAN", {"default": True}),
                                "latent_intensity_rescale_method" : (["soft","hard","range"], {"default": "hard"},),
                                "latent_intensity_rescale_cfg" : ("FLOAT", {"default": 7.6,  "min": 0.0, "max": 100.0, "step": 0.1, "round": 0.1}),
                                "latent_intensity_rescale_sigma_start": ("FLOAT", {"default": 15,  "min": 0.0, "max": 10000.0, "step": 0.1, "round": 0.01}),
                                "latent_intensity_rescale_sigma_end":   ("FLOAT", {"default": 7.5, "min": 0.0, "max": 10000.0, "step": 0.1, "round": 0.01}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "model_patches/automatic_cfg"

    def patch(self, model, automatic_cfg = "None",
              skip_uncond = False, uncond_sigma_start = 15, uncond_sigma_end = 0,
              lerp_uncond = False, lerp_uncond_strength = 1, lerp_uncond_sigma_start = 15, lerp_uncond_sigma_end = 1,
              subtract_latent_mean     = False,   subtract_latent_mean_sigma_start      = 15, subtract_latent_mean_sigma_end     = 1,
              latent_intensity_rescale = False,   latent_intensity_rescale_sigma_start  = 15, latent_intensity_rescale_sigma_end = 1,
              latent_intensity_rescale_cfg = 8, latent_intensity_rescale_method = "hard",
              ignore_pre_cfg_func = False):
        
        global minimum_sigma_to_disable_uncond, maximum_sigma_to_enable_uncond, global_skip_uncond
        sigmin, sigmax = get_sigmin_sigmax(model)
        
        lerp_start, lerp_end          = lerp_uncond_sigma_start, lerp_uncond_sigma_end
        subtract_start, subtract_end  = subtract_latent_mean_sigma_start, subtract_latent_mean_sigma_end
        rescale_start, rescale_end    = latent_intensity_rescale_sigma_start, latent_intensity_rescale_sigma_end
        print(f"Model maximum sigma: {sigmax} / Model minimum sigma: {sigmin}")
        if skip_uncond:
            global_skip_uncond = skip_uncond
            comfy.samplers.sampling_function = sampling_function_patched
            maximum_sigma_to_enable_uncond, minimum_sigma_to_disable_uncond = uncond_sigma_start, uncond_sigma_end
            print(f"Sampling function patched. Uncond enabled from {round(maximum_sigma_to_enable_uncond,2)} to {round(minimum_sigma_to_disable_uncond,2)}")
        elif not ignore_pre_cfg_func:
            global_skip_uncond = skip_uncond # just in case of mixup with another node
            comfy.samplers.sampling_function = original_sampling_function
            maximum_sigma_to_enable_uncond, minimum_sigma_to_disable_uncond = 1000000, 0
            print(f"Sampling function unpatched.")
        
        top_k = 0.25
        reference_cfg = 8
        def automatic_cfg(args):
            cond_scale = args["cond_scale"]
            input_x = args["input"]
            cond_pred = args["cond_denoised"]
            uncond_pred = args["uncond_denoised"]
            sigma = args["sigma"][0]

            if sigma >= sigmax or cond_scale > 1:
                self.last_cfg_ht_one = cond_scale
            target_intensity = self.last_cfg_ht_one / 10

            if (check_skip(sigma, maximum_sigma_to_enable_uncond, minimum_sigma_to_disable_uncond) and skip_uncond) or cond_scale == 1:
                return input_x - cond_pred
            
            if lerp_uncond and not check_skip(sigma, lerp_start, lerp_end) and lerp_uncond_strength != 1:
                uncond_pred = torch.lerp(cond_pred, uncond_pred, lerp_uncond_strength)
            cond   = input_x - cond_pred
            uncond = input_x - uncond_pred

            if automatic_cfg == "None":
                return uncond + cond_scale * (cond - uncond)
            
            denoised_tmp = input_x - (uncond + reference_cfg * (cond - uncond))
            
            for b in range(len(denoised_tmp)):
                denoised_ranges = get_denoised_ranges(denoised_tmp[b], automatic_cfg, top_k)
                for c in range(len(denoised_tmp[b])):
                    fixeds_scale = reference_cfg * target_intensity / denoised_ranges[c]
                    denoised_tmp[b][c] = uncond[b][c] + fixeds_scale * (cond[b][c] - uncond[b][c])

            return denoised_tmp
        
        def center_mean_latent_post_cfg(args):
            denoised = args["denoised"]
            sigma    = args["sigma"][0]
            if check_skip(sigma, subtract_start, subtract_end):
                return denoised
            denoised = center_latent_mean_values(denoised, False, 1)
            return denoised

        def rescale_post_cfg(args):
            denoised   = args["denoised"]
            sigma      = args["sigma"][0]
            
            if check_skip(sigma, rescale_start, rescale_end):
                return denoised
            target_intensity = latent_intensity_rescale_cfg / 10
            for b in range(len(denoised)):
                denoised_ranges = get_denoised_ranges(denoised[b], latent_intensity_rescale_method)
                for c in range(len(denoised[b])):
                    scale_correction = target_intensity / denoised_ranges[c]
                    denoised[b][c]   = denoised[b][c] * scale_correction
            return denoised
        
        m = model.clone()
        if not ignore_pre_cfg_func:
            m.set_model_sampler_cfg_function(automatic_cfg, disable_cfg1_optimization = False)
        if subtract_latent_mean:
            m.set_model_sampler_post_cfg_function(center_mean_latent_post_cfg)
        if latent_intensity_rescale:
            m.set_model_sampler_post_cfg_function(rescale_post_cfg)
        return (m, )

```
