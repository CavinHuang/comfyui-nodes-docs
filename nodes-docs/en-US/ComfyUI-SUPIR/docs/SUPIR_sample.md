---
tags:
- Sampling
---

# SUPIR Sampler
## Documentation
- Class name: `SUPIR_sample`
- Category: `SUPIR`
- Output node: `False`

The SUPIR_sample node is designed for sampling in the SUPIR model framework, utilizing a combination of model parameters, latents, and control scales to generate samples. It leverages a denoising process, conditional inputs, and various sampling configurations to produce outputs tailored to the given inputs, showcasing its flexibility in handling different sampling scenarios.
## Input types
### Required
- **`SUPIR_model`**
    - The SUPIR model instance used for sampling, encompassing the denoiser, diffusion model, and control model, crucial for the sampling process.
    - Comfy dtype: `SUPIRMODEL`
    - Python dtype: `SUPIRModel`
- **`latents`**
    - Latent representations or noise inputs that serve as the basis for the sampling process, indicating the starting point for generation.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`positive`**
    - Conditional inputs that guide the generation towards desired attributes or features, enhancing the relevance of the samples to specific conditions.
    - Comfy dtype: `SUPIR_cond_pos`
    - Python dtype: `dict`
- **`negative`**
    - Unconditional inputs or negative guidance that the model should avoid, helping to steer the generation away from undesired attributes.
    - Comfy dtype: `SUPIR_cond_neg`
    - Python dtype: `dict`
- **`seed`**
    - A seed value for random number generation, ensuring reproducibility of the samples.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - The number of steps to perform in the sampling process, affecting the detail and quality of the generated samples.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg_scale_start`**
    - The initial scaling factor for class-conditional guidance, setting the starting level of adherence to the specified conditions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cfg_scale_end`**
    - The final scaling factor for class-conditional guidance, influencing the adherence to the specified conditions at the end of the sampling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`EDM_s_churn`**
    - A parameter influencing the sampling dynamics, possibly related to the exploration of the latent space or the diversity of the generated samples.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`s_noise`**
    - A parameter that might control the amount of noise introduced during the sampling process, affecting the variability of the outcomes.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`DPMPP_eta`**
    - A parameter related to the DPM++ sampling algorithm, influencing the sampling behavior or efficiency.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`control_scale_start`**
    - The initial value for the control scale, possibly affecting the degree of control or influence over the generation process at the start.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`control_scale_end`**
    - The final value for the control scale, determining the degree of control or influence over the generation process at the end.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`restore_cfg`**
    - A parameter indicating whether to restore certain configurations after sampling, potentially related to model settings or parameters.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`keep_model_loaded`**
    - A boolean indicating whether the model should remain loaded after sampling, affecting resource utilization and performance.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`sampler`**
    - The specific sampling algorithm or method used, crucial for determining the approach to generating samples.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Sampler`
### Optional
- **`sampler_tile_size`**
    - The size of tiles used in tiled sampling, affecting the granularity of the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sampler_tile_stride`**
    - The stride of tiles in tiled sampling, influencing the overlap between tiles and the continuity of the generated samples.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The generated samples as latent representations, ready for further processing or conversion into final outputs.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SUPIR_sample:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "SUPIR_model": ("SUPIRMODEL",),
            "latents": ("LATENT",),
            "positive": ("SUPIR_cond_pos",),
            "negative": ("SUPIR_cond_neg",),
            "seed": ("INT", {"default": 123, "min": 0, "max": 0xffffffffffffffff, "step": 1}),
            "steps": ("INT", {"default": 45, "min": 3, "max": 4096, "step": 1}),
            "cfg_scale_start": ("FLOAT", {"default": 4.0, "min": 0.0, "max": 100.0, "step": 0.01}),
            "cfg_scale_end": ("FLOAT", {"default": 4.0, "min": 0, "max": 100.0, "step": 0.01}),
            "EDM_s_churn": ("INT", {"default": 5, "min": 0, "max": 40, "step": 1}),
            "s_noise": ("FLOAT", {"default": 1.003, "min": 1.0, "max": 1.1, "step": 0.001}),
            "DPMPP_eta": ("FLOAT", {"default": 1.0, "min": 0, "max": 10.0, "step": 0.01}),
            "control_scale_start": ("FLOAT", {"default": 1.0, "min": 0, "max": 10.0, "step": 0.05}),
            "control_scale_end": ("FLOAT", {"default": 1.0, "min": 0, "max": 10.0, "step": 0.05}),
            "restore_cfg": ("FLOAT", {"default": -1.0, "min": -1.0, "max": 20.0, "step": 0.05}),
            "keep_model_loaded": ("BOOLEAN", {"default": False}),
            "sampler": (
                    [
                        'RestoreDPMPP2MSampler',
                        'RestoreEDMSampler',
                        'TiledRestoreDPMPP2MSampler',
                        'TiledRestoreEDMSampler',
                    ], {
                        "default": 'RestoreEDMSampler'
                    }),
        },
            "optional": {
                "sampler_tile_size": ("INT", {"default": 1024, "min": 64, "max": 4096, "step": 32}),
                "sampler_tile_stride": ("INT", {"default": 512, "min": 32, "max": 2048, "step": 32}),
            }
        }

    RETURN_TYPES = ("LATENT",)
    RETURN_NAMES = ("latent",)
    FUNCTION = "sample"
    CATEGORY = "SUPIR"
    DESCRIPTION = """
- **latent:**
Latent to sample from, when using SUPIR latent this is just for the noise shape,  
it's actually not used otherwise here. Identical to feeding this comfy empty latent.  
If fed anything else it's used as it is, no noise is added.  
- **cfg:**
Linearly scaled CFG is always used, first step will use the cfg_scale_start value,  
and that is interpolated to the cfg_scale_end value at last step.  
To disable scaling set these values to be the same.  
- **EDM_s_churn:**
controls the rate of adaptation of the diffusion process to changes in noise levels  
over time. Has no effect with DPMPP samplers.  
- **s_noise:**
This parameter directly controls the amount of noise added to the image at each  
step of the diffusion process.  
- **DPMPP_eta:**
Scaling factor that influences the diffusion process by adjusting how the denoising  
process adapts to changes in noise levels over time.
No effect with EDM samplers.  
- **control_scale:**
The strenght of the SUPIR control model, scales linearly from start to end.  
Lower values allow more freedom from the input image.  
- **restore_cfg:**
Controls the degree of restoration towards the original image during the diffusion   
process. It allows for dome fine-tuning of the process.  
- **samplers:**
EDM samplers need lots of steps but generally have better quality.  
DPMPP samplers work well with lower steps, good for lightning models.  
Tiled samplers enable tiled diffusion process, this is very slow but allows higher  
resolutions to be used by saving VRAM.  Tile size should be chosen so the image  
is evenly tiled.  Tile stride affects the overlap of the tiles.  Check the  
SUPIR Tiles -node for preview to understand how the image is tiled.

"""

    def sample(self, SUPIR_model, latents, steps, seed, cfg_scale_end, EDM_s_churn, s_noise, positive, negative,
                cfg_scale_start, control_scale_start, control_scale_end, restore_cfg, keep_model_loaded, DPMPP_eta,
                sampler, sampler_tile_size=1024, sampler_tile_stride=512):
        
        torch.manual_seed(seed)
        device = mm.get_torch_device()
        mm.unload_all_models()
        mm.soft_empty_cache()

        self.sampler_config = {
            'target': f'.sgm.modules.diffusionmodules.sampling.{sampler}',
            'params': {
                'num_steps': steps,
                'restore_cfg': restore_cfg,
                's_churn': EDM_s_churn,
                's_noise': s_noise,
                'discretization_config': {
                    'target': '.sgm.modules.diffusionmodules.discretizer.LegacyDDPMDiscretization'
                },
                'guider_config': {
                    'target': '.sgm.modules.diffusionmodules.guiders.LinearCFG',
                    'params': {
                        'scale': cfg_scale_start,
                        'scale_min': cfg_scale_end
                    }
                }
            }
        }
        if 'Tiled' in sampler:
            self.sampler_config['params']['tile_size'] = sampler_tile_size // 8
            self.sampler_config['params']['tile_stride'] = sampler_tile_stride // 8
        if 'DPMPP' in sampler:
            self.sampler_config['params']['eta'] = DPMPP_eta
            self.sampler_config['params']['restore_cfg'] = -1
        if not hasattr (self,'sampler') or self.sampler_config != self.current_sampler_config: 
            self.sampler = instantiate_from_config(self.sampler_config)
            self.current_sampler_config = self.sampler_config
 
        print("sampler_config: ", self.sampler_config)
        
        SUPIR_model.denoiser.to(device)
        SUPIR_model.model.diffusion_model.to(device)
        SUPIR_model.model.control_model.to(device)
        
        use_linear_control_scale = control_scale_start != control_scale_end

        denoiser = lambda input, sigma, c, control_scale: SUPIR_model.denoiser(SUPIR_model.model, input, sigma, c, control_scale)

        original_size = positive['original_size']
        positive = positive['cond']
        negative = negative['uncond']
        samples = latents["samples"]
        samples = samples.to(device)
        #print("positives: ", len(positive))
        #print("negatives: ", len(negative))
        out = []
        pbar = comfy.utils.ProgressBar(samples.shape[0])
        for i, sample in enumerate(samples):
            try:
                if 'original_size' in latents:
                    print("Using random noise")
                    noised_z = torch.randn_like(sample.unsqueeze(0), device=samples.device)
                else:
                    print("Using latent from input")
                    noised_z = sample.unsqueeze(0) * 0.13025
                if len(positive) != len(samples):
                    print("Tiled sampling")
                    _samples = self.sampler(denoiser, noised_z, cond=positive, uc=negative, x_center=sample.unsqueeze(0), control_scale=control_scale_end,
                                    use_linear_control_scale=use_linear_control_scale, control_scale_start=control_scale_start)
                else:
                    #print("positives[i]: ", len(positive[i]))
                    #print("negatives[i]: ", len(negative[i]))
                    _samples = self.sampler(denoiser, noised_z, cond=positive[i], uc=negative[i], x_center=sample.unsqueeze(0), control_scale=control_scale_end,
                                            use_linear_control_scale=use_linear_control_scale, control_scale_start=control_scale_start)

                
            except torch.cuda.OutOfMemoryError as e:
                mm.free_memory(mm.get_total_memory(mm.get_torch_device()), mm.get_torch_device())
                SUPIR_model = None
                mm.soft_empty_cache()
                print("It's likely that too large of an image or batch_size for SUPIR was used,"
                      " and it has devoured all of the memory it had reserved, you may need to restart ComfyUI. Make sure you are using tiled_vae, "
                      " you can also try using fp8 for reduced memory usage if your system supports it.")
                raise e
            out.append(_samples)
            print("Sampled ", i+1, " of ", samples.shape[0])
            pbar.update(1)

        if not keep_model_loaded:
            SUPIR_model.denoiser.to('cpu')
            SUPIR_model.model.diffusion_model.to('cpu')
            SUPIR_model.model.control_model.to('cpu')
            mm.soft_empty_cache()

        if len(out[0].shape) == 4:
            samples_out_stacked = torch.cat(out, dim=0)
        else:
            samples_out_stacked = torch.stack(out, dim=0)

        return ({"samples":samples_out_stacked, "original_size": original_size},)

```
