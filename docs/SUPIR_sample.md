
# Documentation
- Class name: `SUPIR_sample`
- Category: `SUPIR`
- Output node: `False`

SUPIR_sample节点旨在SUPIR模型框架中进行采样，利用模型参数、潜在变量和控制尺度的组合来生成样本。它通过去噪过程、条件输入和各种采样配置来生成针对给定输入的输出，展示了其在处理不同采样场景时的灵活性。

# Input types
## Required
- **`SUPIR_model`**
    - 用于采样的SUPIR模型实例，包含去噪器、扩散模型和控制模型，对采样过程至关重要。
    - Comfy dtype: `SUPIRMODEL`
    - Python dtype: `SUPIRModel`
- **`latents`**
    - 作为采样过程基础的潜在表示或噪声输入，指示生成的起点。
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`positive`**
    - 引导生成朝向所需属性或特征的条件输入，增强样本与特定条件的相关性。
    - Comfy dtype: `SUPIR_cond_pos`
    - Python dtype: `dict`
- **`negative`**
    - 模型应避免的无条件输入或负面引导，有助于引导生成远离不需要的属性。
    - Comfy dtype: `SUPIR_cond_neg`
    - Python dtype: `dict`
- **`seed`**
    - 用于随机数生成的种子值，确保样本的可重复性。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - 采样过程中要执行的步骤数，影响生成样本的细节和质量。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg_scale_start`**
    - 类条件引导的初始缩放因子，设置对指定条件的初始遵从程度。
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cfg_scale_end`**
    - 类条件引导的最终缩放因子，影响采样过程结束时对指定条件的遵从程度。
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`EDM_s_churn`**
    - 影响采样动态的参数，可能与潜在空间的探索或生成样本的多样性有关。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`s_noise`**
    - 可能控制采样过程中引入的噪声量的参数，影响结果的可变性。
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`DPMPP_eta`**
    - 与DPM++采样算法相关的参数，影响采样行为或效率。
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`control_scale_start`**
    - 控制尺度的初始值，可能影响生成过程开始时的控制程度或影响力。
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`control_scale_end`**
    - 控制尺度的最终值，决定生成过程结束时的控制程度或影响力。
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`restore_cfg`**
    - 指示是否在采样后恢复某些配置的参数，可能与模型设置或参数有关。
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`keep_model_loaded`**
    - 指示采样后是否保持模型加载状态的布尔值，影响资源利用和性能。
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`sampler`**
    - 使用的特定采样算法或方法，对确定生成样本的方法至关重要。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Sampler`
## Optional
- **`sampler_tile_size`**
    - 用于分块采样的瓦片大小，影响采样过程的粒度。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sampler_tile_stride`**
    - 分块采样中瓦片的步幅，影响瓦片之间的重叠和生成样本的连续性。
    - Comfy dtype: `INT`
    - Python dtype: `int`

# Output types
- **`latent`**
    - 作为潜在表示的生成样本，可用于进一步处理或转换为最终输出。
    - Comfy dtype: `LATENT`
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
