---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# SUPIR Upscale (Legacy)
## Documentation
- Class name: `SUPIR_Upscale`
- Category: `SUPIR`
- Output node: `False`

The SUPIR_Upscale node is designed to upscale images using the SUPIR model, enhancing image resolution while maintaining or improving image quality. This node is part of a suite of nodes aimed at image processing and enhancement, leveraging advanced deep learning techniques to achieve superior upscaling results.
## Input types
### Required
- **`supir_model`**
    - Specifies the SUPIR model to be used for upscaling, allowing for customization of the upscaling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`sdxl_model`**
    - Determines the secondary model used in conjunction with the SUPIR model to enhance the upscaling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`image`**
    - Specifies the image to be upscaled, serving as the primary input for the upscaling process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`seed`**
    - Sets the seed for random number generation, ensuring reproducibility of the upscaling results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resize_method`**
    - Determines the method used for resizing images during the upscaling process, affecting the texture and quality of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scale_by`**
    - Specifies the factor by which the image will be upscaled, directly influencing the resolution of the output image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`steps`**
    - Defines the number of steps to be used in the upscaling process, impacting the detail and quality of the upscaled image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`restoration_scale`**
    - Adjusts the scale of restoration applied to the upscaled image, affecting the balance between detail enhancement and artifact reduction.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cfg_scale`**
    - Controls the configuration scale for the upscaling process, influencing the adherence to the input image's content and style.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`a_prompt`**
    - Provides a positive textual description to guide the upscaling process, enhancing certain aspects of the image according to the specified attributes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`n_prompt`**
    - Provides a negative textual description to avoid certain aspects during the upscaling process, helping to steer the result away from undesired attributes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`s_churn`**
    - Specifies the churn rate in the sampling process, affecting the exploration of the latent space and the diversity of the upscaled results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`s_noise`**
    - Sets the noise level in the sampling process, influencing the amount of randomness and potentially the detail in the upscaled image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`control_scale`**
    - Adjusts the control scale for the upscaling process, affecting the overall control over the upscaling outcome.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cfg_scale_start`**
    - Specifies the starting configuration scale, allowing for dynamic adjustment of the cfg scale throughout the upscaling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`control_scale_start`**
    - Specifies the starting control scale, enabling dynamic adjustment of control over the upscaling outcome throughout the process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`color_fix_type`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`keep_model_loaded`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
- **`use_tiled_vae`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
- **`encoder_tile_size_pixels`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`decoder_tile_size_latent`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
### Optional
- **`captions`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`diffusion_dtype`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`encoder_dtype`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`batch_size`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`use_tiled_sampling`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
- **`sampler_tile_size`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`sampler_tile_stride`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`fp8_unet`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
- **`fp8_vae`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
- **`sampler`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
## Output types
- **`upscaled_image`**
    - Comfy dtype: `IMAGE`
    - The result of the upscaling process, showcasing enhanced resolution and quality.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SUPIR_Upscale:
    upscale_methods = ["nearest-exact", "bilinear", "area", "bicubic", "lanczos"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "supir_model": (folder_paths.get_filename_list("checkpoints"),),
            "sdxl_model": (folder_paths.get_filename_list("checkpoints"),),
            "image": ("IMAGE",),
            "seed": ("INT", {"default": 123, "min": 0, "max": 0xffffffffffffffff, "step": 1}),
            "resize_method": (s.upscale_methods, {"default": "lanczos"}),
            "scale_by": ("FLOAT", {"default": 1.0, "min": 0.01, "max": 20.0, "step": 0.01}),
            "steps": ("INT", {"default": 45, "min": 3, "max": 4096, "step": 1}),
            "restoration_scale": ("FLOAT", {"default": -1.0, "min": -1.0, "max": 6.0, "step": 1.0}),
            "cfg_scale": ("FLOAT", {"default": 4.0, "min": 0, "max": 100, "step": 0.01}),
            "a_prompt": ("STRING", {"multiline": True, "default": "high quality, detailed", }),
            "n_prompt": ("STRING", {"multiline": True, "default": "bad quality, blurry, messy", }),
            "s_churn": ("INT", {"default": 5, "min": 0, "max": 40, "step": 1}),
            "s_noise": ("FLOAT", {"default": 1.003, "min": 1.0, "max": 1.1, "step": 0.001}),
            "control_scale": ("FLOAT", {"default": 1.0, "min": 0, "max": 10.0, "step": 0.05}),
            "cfg_scale_start": ("FLOAT", {"default": 4.0, "min": 0.0, "max": 100.0, "step": 0.05}),
            "control_scale_start": ("FLOAT", {"default": 0.0, "min": 0, "max": 1.0, "step": 0.05}),
            "color_fix_type": (
                [
                    'None',
                    'AdaIn',
                    'Wavelet',
                ], {
                    "default": 'Wavelet'
                }),
            "keep_model_loaded": ("BOOLEAN", {"default": True}),
            "use_tiled_vae": ("BOOLEAN", {"default": True}),
            "encoder_tile_size_pixels": ("INT", {"default": 512, "min": 64, "max": 8192, "step": 64}),
            "decoder_tile_size_latent": ("INT", {"default": 64, "min": 32, "max": 8192, "step": 64}),
        },
            "optional": {
                "captions": ("STRING", {"forceInput": True, "multiline": False, "default": "", }),
                "diffusion_dtype": (
                    [
                        'fp16',
                        'bf16',
                        'fp32',
                        'auto'
                    ], {
                        "default": 'auto'
                    }),
                "encoder_dtype": (
                    [
                        'bf16',
                        'fp32',
                        'auto'
                    ], {
                        "default": 'auto'
                    }),
                "batch_size": ("INT", {"default": 1, "min": 1, "max": 128, "step": 1}),
                "use_tiled_sampling": ("BOOLEAN", {"default": False}),
                "sampler_tile_size": ("INT", {"default": 1024, "min": 64, "max": 4096, "step": 32}),
                "sampler_tile_stride": ("INT", {"default": 512, "min": 32, "max": 2048, "step": 32}),
                "fp8_unet": ("BOOLEAN", {"default": False}),
                "fp8_vae": ("BOOLEAN", {"default": False}),
                "sampler": (
                    [
                        'RestoreDPMPP2MSampler',
                        'RestoreEDMSampler',
                    ], {
                        "default": 'RestoreEDMSampler'
                    }),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("upscaled_image",)
    FUNCTION = "process"

    CATEGORY = "SUPIR"

    def process(self, steps, image, color_fix_type, seed, scale_by, cfg_scale, resize_method, s_churn, s_noise,
                encoder_tile_size_pixels, decoder_tile_size_latent,
                control_scale, cfg_scale_start, control_scale_start, restoration_scale, keep_model_loaded,
                a_prompt, n_prompt, sdxl_model, supir_model, use_tiled_vae, use_tiled_sampling=False, sampler_tile_size=128, sampler_tile_stride=64, captions="", diffusion_dtype="auto",
                encoder_dtype="auto", batch_size=1, fp8_unet=False, fp8_vae=False, sampler="RestoreEDMSampler"):
        device = mm.get_torch_device()
        mm.unload_all_models()

        SUPIR_MODEL_PATH = folder_paths.get_full_path("checkpoints", supir_model)
        SDXL_MODEL_PATH = folder_paths.get_full_path("checkpoints", sdxl_model)

        config_path = os.path.join(script_directory, "options/SUPIR_v0.yaml")
        config_path_tiled = os.path.join(script_directory, "options/SUPIR_v0_tiled.yaml")
        clip_config_path = os.path.join(script_directory, "configs/clip_vit_config.json")
        tokenizer_path = os.path.join(script_directory, "configs/tokenizer")

        custom_config = {
            'sdxl_model': sdxl_model,
            'diffusion_dtype': diffusion_dtype,
            'encoder_dtype': encoder_dtype,
            'use_tiled_vae': use_tiled_vae,
            'supir_model': supir_model,
            'use_tiled_sampling': use_tiled_sampling,
            'fp8_unet': fp8_unet,
            'fp8_vae': fp8_vae,
            'sampler': sampler
        }

        if diffusion_dtype == 'auto':
            try:
                if mm.should_use_fp16():
                    print("Diffusion using fp16")
                    dtype = torch.float16
                    model_dtype = 'fp16'
                if mm.should_use_bf16():
                    print("Diffusion using bf16")
                    dtype = torch.bfloat16
                    model_dtype = 'bf16'
                else:
                    print("Diffusion using using fp32")
                    dtype = torch.float32
                    model_dtype = 'fp32'
            except:
                raise AttributeError("ComfyUI too old, can't autodecet properly. Set your dtypes manually.")
        else:
            print(f"Diffusion using using {diffusion_dtype}")
            dtype = convert_dtype(diffusion_dtype)
            model_dtype = diffusion_dtype

        if encoder_dtype == 'auto':
            try:
                if mm.should_use_bf16():
                    print("Encoder using bf16")
                    vae_dtype = 'bf16'
                else:
                    print("Encoder using using fp32")
                    vae_dtype = 'fp32'
            except:
                raise AttributeError("ComfyUI too old, can't autodetect properly. Set your dtypes manually.")
        else:
            vae_dtype = encoder_dtype
            print(f"Encoder using using {vae_dtype}")

        if not hasattr(self, "model") or self.model is None or self.current_config != custom_config:
            self.current_config = custom_config
            self.model = None
            
            mm.soft_empty_cache()
            
            if use_tiled_sampling:
                config = OmegaConf.load(config_path_tiled)
                config.model.params.sampler_config.params.tile_size = sampler_tile_size // 8
                config.model.params.sampler_config.params.tile_stride = sampler_tile_stride // 8
                config.model.params.sampler_config.target = f".sgm.modules.diffusionmodules.sampling.Tiled{sampler}"
                print("Using tiled sampling")
            else:
                config = OmegaConf.load(config_path)
                config.model.params.sampler_config.target = f".sgm.modules.diffusionmodules.sampling.{sampler}"
                print("Using non-tiled sampling")

            if mm.XFORMERS_IS_AVAILABLE:
                config.model.params.control_stage_config.params.spatial_transformer_attn_type = "softmax-xformers"
                config.model.params.network_config.params.spatial_transformer_attn_type = "softmax-xformers"
                config.model.params.first_stage_config.params.ddconfig.attn_type = "vanilla-xformers" 
                
            config.model.params.ae_dtype = vae_dtype
            config.model.params.diffusion_dtype = model_dtype
            
            self.model = instantiate_from_config(config.model).cpu()

            try:
                print(f'Attempting to load SUPIR model: [{SUPIR_MODEL_PATH}]')
                supir_state_dict = load_state_dict(SUPIR_MODEL_PATH)
                
            except:
                raise Exception("Failed to load SUPIR model")
            try:
                print(f"Attempting to load SDXL model: [{SDXL_MODEL_PATH}]")
                sdxl_state_dict = load_state_dict(SDXL_MODEL_PATH)
            except:
                raise Exception("Failed to load SDXL model")
            self.model.load_state_dict(supir_state_dict, strict=False)
            self.model.load_state_dict(sdxl_state_dict, strict=False)

            del supir_state_dict

            #first clip model from SDXL checkpoint
            try:
                print("Loading first clip model from SDXL checkpoint")
                
                replace_prefix = {}
                replace_prefix["conditioner.embedders.0.transformer."] = ""
    
                sd = comfy.utils.state_dict_prefix_replace(sdxl_state_dict, replace_prefix, filter_keys=False)
                clip_text_config = CLIPTextConfig.from_pretrained(clip_config_path)
                self.model.conditioner.embedders[0].tokenizer = CLIPTokenizer.from_pretrained(tokenizer_path)
                self.model.conditioner.embedders[0].transformer = CLIPTextModel(clip_text_config)
                self.model.conditioner.embedders[0].transformer.load_state_dict(sd, strict=False)
                self.model.conditioner.embedders[0].eval()
                for param in self.model.conditioner.embedders[0].parameters():
                    param.requires_grad = False
            except:
                raise Exception("Failed to load first clip model from SDXL checkpoint")
            
            del sdxl_state_dict

            #second clip model from SDXL checkpoint
            try:
                print("Loading second clip model from SDXL checkpoint")
                replace_prefix2 = {}
                replace_prefix2["conditioner.embedders.1.model."] = ""
                sd = comfy.utils.state_dict_prefix_replace(sd, replace_prefix2, filter_keys=True)                
                clip_g = build_text_model_from_openai_state_dict(sd, cast_dtype=dtype)
                self.model.conditioner.embedders[1].model = clip_g
            except:
                raise Exception("Failed to load second clip model from SDXL checkpoint")
        
            del sd, clip_g
            mm.soft_empty_cache()

            self.model.to(dtype)

            #only unets and/or vae to fp8 
            if fp8_unet:
                self.model.model.to(torch.float8_e4m3fn)
            if fp8_vae:
                self.model.first_stage_model.to(torch.float8_e4m3fn)

            if use_tiled_vae:
                self.model.init_tile_vae(encoder_tile_size=encoder_tile_size_pixels, decoder_tile_size=decoder_tile_size_latent)
        
        upscaled_image, = ImageScaleBy.upscale(self, image, resize_method, scale_by)
        B, H, W, C = upscaled_image.shape
        new_height = H if H % 64 == 0 else ((H // 64) + 1) * 64
        new_width = W if W % 64 == 0 else ((W // 64) + 1) * 64
        upscaled_image = upscaled_image.permute(0, 3, 1, 2)
        resized_image = F.interpolate(upscaled_image, size=(new_height, new_width), mode='bicubic', align_corners=False)
        resized_image = resized_image.to(device)
        
        captions_list = []
        captions_list.append(captions)
        print("captions: ", captions_list)

        use_linear_CFG = cfg_scale_start > 0
        use_linear_control_scale = control_scale_start > 0
        out = []
        pbar = comfy.utils.ProgressBar(B)

        batched_images = [resized_image[i:i + batch_size] for i in
                          range(0, len(resized_image), batch_size)]
        captions_list = captions_list * resized_image.shape[0]
        batched_captions = [captions_list[i:i + batch_size] for i in range(0, len(captions_list), batch_size)]

        mm.soft_empty_cache()
        i = 1
        for imgs, caps in zip(batched_images, batched_captions):
            try:
                samples = self.model.batchify_sample(imgs, caps, num_steps=steps,
                                                     restoration_scale=restoration_scale, s_churn=s_churn,
                                                     s_noise=s_noise, cfg_scale=cfg_scale, control_scale=control_scale,
                                                     seed=seed,
                                                     num_samples=1, p_p=a_prompt, n_p=n_prompt,
                                                     color_fix_type=color_fix_type,
                                                     use_linear_CFG=use_linear_CFG,
                                                     use_linear_control_scale=use_linear_control_scale,
                                                     cfg_scale_start=cfg_scale_start,
                                                     control_scale_start=control_scale_start)
            except torch.cuda.OutOfMemoryError as e:
                mm.free_memory(mm.get_total_memory(mm.get_torch_device()), mm.get_torch_device())
                self.model = None
                mm.soft_empty_cache()
                print("It's likely that too large of an image or batch_size for SUPIR was used,"
                      " and it has devoured all of the memory it had reserved, you may need to restart ComfyUI. Make sure you are using tiled_vae, "
                      " you can also try using fp8 for reduced memory usage if your system supports it.")
                raise e

            out.append(samples.squeeze(0).cpu())
            print("Sampled ", i * len(imgs), " out of ", B)
            i = i + 1
            pbar.update(1)
        if not keep_model_loaded:
            self.model = None
            mm.soft_empty_cache()

        if len(out[0].shape) == 4:
            out_stacked = torch.cat(out, dim=0).cpu().to(torch.float32).permute(0, 2, 3, 1)
        else:
            out_stacked = torch.stack(out, dim=0).cpu().to(torch.float32).permute(0, 2, 3, 1)
            
        final_image, = ImageScale.upscale(self, out_stacked, resize_method, W, H, crop="disabled")

        return (final_image,)

```
