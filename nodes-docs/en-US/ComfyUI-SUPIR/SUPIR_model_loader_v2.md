---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
---

# SUPIR Model Loader (v2)
## Documentation
- Class name: `SUPIR_model_loader_v2`
- Category: `SUPIR`
- Output node: `False`

The SUPIR_model_loader_v2 node is designed to initialize and prepare the SUPIR model for use, specifically by loading the model's state from a specified path and optionally adjusting its precision for memory efficiency. This node plays a crucial role in setting up the SUPIR model for subsequent image processing tasks, ensuring that the model is correctly loaded and ready for operation.
## Input types
### Required
- **`model`**
    - Specifies the main model configuration for the SUPIR model loader, integrating various components like CLIP and VAE for enhanced image processing.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`clip`**
    - Specifies the CLIP model used in conjunction with the SUPIR model to enhance its capabilities, particularly for tasks involving image and text processing.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`vae`**
    - Specifies the VAE model used alongside the SUPIR model, contributing to the overall image processing and generation capabilities.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`supir_model`**
    - Specifies the file paths to the SUPIR model checkpoints, which are essential for loading the model's state for use in image processing tasks.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`fp8_unet`**
    - A boolean flag that, when set, converts the model's weights to a lower precision format (torch.float8_e4m3fn) to save VRAM, with a slight impact on quality.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`diffusion_dtype`**
    - Determines the data type for diffusion operations, offering options like fp16, bf16, fp32, or auto for automatic selection based on the execution environment.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`high_vram`**
    - A boolean flag that, when enabled, uses a high VRAM mode for loading model weights, potentially improving model loading speed.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`SUPIR_model`**
    - Comfy dtype: `SUPIRMODEL`
    - The loaded SUPIR model, ready for image processing tasks.
    - Python dtype: `torch.nn.Module`
- **`SUPIR_VAE`**
    - Comfy dtype: `SUPIRVAE`
    - The loaded SUPIR VAE component, integral to the model's image processing capabilities.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SUPIR_model_loader_v2:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model" :("MODEL",),
            "clip": ("CLIP",),
            "vae": ("VAE",),
            "supir_model": (folder_paths.get_filename_list("checkpoints"),),
            "fp8_unet": ("BOOLEAN", {"default": False}),
            "diffusion_dtype": (
                    [
                        'fp16',
                        'bf16',
                        'fp32',
                        'auto'
                    ], {
                        "default": 'auto'
                    }),
            },
            "optional": {
                "high_vram": ("BOOLEAN", {"default": False}),
            }
        }

    RETURN_TYPES = ("SUPIRMODEL", "SUPIRVAE")
    RETURN_NAMES = ("SUPIR_model","SUPIR_VAE",)
    FUNCTION = "process"
    CATEGORY = "SUPIR"
    DESCRIPTION = """
Loads the SUPIR model and merges it with the SDXL model.  

Diffusion type should be kept on auto, unless you have issues loading the model.  
fp8_unet casts the unet weights to torch.float8_e4m3fn, which saves a lot of VRAM but has slight quality impact.  
high_vram: uses Accelerate to load weights to GPU, slightly faster model loading.
"""

    def process(self, supir_model, diffusion_dtype, fp8_unet, model, clip, vae, high_vram=False):
        if high_vram:
            device = mm.get_torch_device()
        else:
            device = mm.unet_offload_device()
        print("Loading weights to: ", device)
        mm.unload_all_models()

        SUPIR_MODEL_PATH = folder_paths.get_full_path("checkpoints", supir_model)

        config_path = os.path.join(script_directory, "options/SUPIR_v0.yaml")
        clip_config_path = os.path.join(script_directory, "configs/clip_vit_config.json")
        tokenizer_path = os.path.join(script_directory, "configs/tokenizer")

        custom_config = {
            'diffusion_dtype': diffusion_dtype,
            'supir_model': supir_model,
            'fp8_unet': fp8_unet,
            'model': model,
            "clip": clip,
            "vae": vae
        }

        if diffusion_dtype == 'auto':
            try:
                if mm.should_use_fp16():
                    print("Diffusion using fp16")
                    dtype = torch.float16
                elif mm.should_use_bf16():
                    print("Diffusion using bf16")
                    dtype = torch.bfloat16
                else:
                    print("Diffusion using fp32")
                    dtype = torch.float32
            except:
                raise AttributeError("ComfyUI version too old, can't autodecet properly. Set your dtypes manually.")
        else:
            print(f"Diffusion using {diffusion_dtype}")
            dtype = convert_dtype(diffusion_dtype)
        
        if not hasattr(self, "model") or self.model is None or self.current_config != custom_config:
            self.current_config = custom_config
            self.model = None
            
            mm.soft_empty_cache()
            
            config = OmegaConf.load(config_path)
            if mm.XFORMERS_IS_AVAILABLE:
                print("Using XFORMERS")
                config.model.params.control_stage_config.params.spatial_transformer_attn_type = "softmax-xformers"
                config.model.params.network_config.params.spatial_transformer_attn_type = "softmax-xformers"
                config.model.params.first_stage_config.params.ddconfig.attn_type = "vanilla-xformers" 
                
            config.model.target = ".SUPIR.models.SUPIR_model_v2.SUPIRModel"
            pbar = comfy.utils.ProgressBar(5)

            #with (init_empty_weights() if is_accelerate_available else nullcontext()):
            self.model = instantiate_from_config(config.model).cpu()
            self.model.model.dtype = dtype
            pbar.update(1)
            try:
                print(f"Attempting to load SDXL model from node inputs")
                mm.load_model_gpu(model)
                sdxl_state_dict = model.model.state_dict_for_saving(None, vae.get_sd(), None)
                if is_accelerate_available:
                    for key in sdxl_state_dict:
                        set_module_tensor_to_device(self.model, key, device=device, dtype=dtype, value=sdxl_state_dict[key])
                else:
                    self.model.load_state_dict(sdxl_state_dict, strict=False)
                if fp8_unet:
                    self.model.model.to(torch.float8_e4m3fn)
                else:
                    self.model.model.to(dtype)
                del sdxl_state_dict
                pbar.update(1)
            except:
                raise Exception("Failed to load SDXL model")            
            gc.collect()
            mm.soft_empty_cache()
            #first clip model from SDXL checkpoint
            try:
                print("Loading first clip model from SDXL checkpoint")
                clip_sd = None
                clip_model = clip.load_model()
                mm.load_model_gpu(clip_model)
                clip_sd = clip.get_sd()
                clip_sd = model.model.model_config.process_clip_state_dict_for_saving(clip_sd)

                replace_prefix = {}
                replace_prefix["conditioner.embedders.0.transformer."] = ""
    
                clip_l_sd = comfy.utils.state_dict_prefix_replace(clip_sd, replace_prefix, filter_keys=True)
                clip_text_config = CLIPTextConfig.from_pretrained(clip_config_path)
                self.model.conditioner.embedders[0].tokenizer = CLIPTokenizer.from_pretrained(tokenizer_path)
                with (init_empty_weights() if is_accelerate_available else nullcontext()):
                    self.model.conditioner.embedders[0].transformer = CLIPTextModel(clip_text_config)
                if is_accelerate_available:
                    for key in clip_l_sd:
                        set_module_tensor_to_device(self.model.conditioner.embedders[0].transformer, key, device=device, dtype=dtype, value=clip_l_sd[key])
                else:
                    self.model.conditioner.embedders[0].transformer.load_state_dict(clip_l_sd, strict=False)
                self.model.conditioner.embedders[0].eval()
                for param in self.model.conditioner.embedders[0].parameters():
                    param.requires_grad = False
                self.model.conditioner.embedders[0].to(dtype)
                del clip_l_sd
                pbar.update(1)
            except:
                raise Exception("Failed to load first clip model from SDXL checkpoint")
            gc.collect()
            mm.soft_empty_cache()
            #second clip model from SDXL checkpoint
            try:
                print("Loading second clip model from SDXL checkpoint")
                replace_prefix2 = {}
                replace_prefix2["conditioner.embedders.1.model."] = ""
                clip_g_sd = comfy.utils.state_dict_prefix_replace(clip_sd, replace_prefix2, filter_keys=True)             
                clip_g = build_text_model_from_openai_state_dict(clip_g_sd, device, cast_dtype=dtype)
                self.model.conditioner.embedders[1].model = clip_g
                self.model.conditioner.embedders[1].model.to(dtype)
                del clip_g_sd
                pbar.update(1)
            except:
                raise Exception("Failed to load second clip model from SDXL checkpoint")
            
            try:
                print(f'Attempting to load SUPIR model: [{SUPIR_MODEL_PATH}]')
                supir_state_dict = load_state_dict(SUPIR_MODEL_PATH)
                if "Q" not in supir_model or not is_accelerate_available: #I don't know why this doesn't work with the Q model. 
                    for key in supir_state_dict:
                        set_module_tensor_to_device(self.model, key, device=device, dtype=dtype, value=supir_state_dict[key])
                else:
                    self.model.load_state_dict(supir_state_dict, strict=False)
                if fp8_unet:
                    self.model.model.to(torch.float8_e4m3fn)
                else:
                    self.model.model.to(dtype)
                del supir_state_dict
                pbar.update(1)
            except:
                raise Exception("Failed to load SUPIR model")
            mm.soft_empty_cache()

        return (self.model, self.model.first_stage_model,)

```
