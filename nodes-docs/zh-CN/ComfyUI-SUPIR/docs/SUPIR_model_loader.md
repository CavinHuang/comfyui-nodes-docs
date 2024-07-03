
# Documentation
- Class name: SUPIR_model_loader
- Category: SUPIR
- Output node: False

SUPIR_model_loader节点负责加载SUPIR模型，这是SUPIR框架中用于图像处理和增强的关键组件。它处理模型的初始化和配置，确保模型为后续的图像处理任务做好准备。

# Input types
## Required
- supir_model
    - 指定SUPIR模型checkpoint文件的路径，对于加载模型的状态以进行图像处理任务至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- sdxl_model
    - 指定SDXL模型checkpoint文件的路径，这些文件将与SUPIR模型合并以增强其功能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- fp8_unet
    - 一个标志，用于确定是否将UNet权重转换为较低精度格式以节省VRAM，这可能会对质量产生轻微影响。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- diffusion_dtype
    - 指定扩散操作的数据类型，提供了优化性能或兼容性的选项。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- SUPIR_model
    - 加载和配置完毕的SUPIR模型，可以立即用于图像处理任务。
    - Comfy dtype: SUPIRMODEL
    - Python dtype: torch.nn.Module
- SUPIR_VAE
    - SUPIR模型的VAE组件，对某些图像处理操作至关重要。
    - Comfy dtype: SUPIRVAE
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SUPIR_model_loader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "supir_model": (folder_paths.get_filename_list("checkpoints"),),
            "sdxl_model": (folder_paths.get_filename_list("checkpoints"),),
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
        }

    RETURN_TYPES = ("SUPIRMODEL", "SUPIRVAE")
    RETURN_NAMES = ("SUPIR_model","SUPIR_VAE",)
    FUNCTION = "process"
    CATEGORY = "SUPIR"
    DESCRIPTION = """
Old loader, not recommended to be used.  
Loads the SUPIR model and the selected SDXL model and merges them.
"""

    def process(self, supir_model, sdxl_model, diffusion_dtype, fp8_unet):
        device = mm.get_torch_device()
        mm.unload_all_models()

        SUPIR_MODEL_PATH = folder_paths.get_full_path("checkpoints", supir_model)
        SDXL_MODEL_PATH = folder_paths.get_full_path("checkpoints", sdxl_model)

        config_path = os.path.join(script_directory, "options/SUPIR_v0.yaml")
        clip_config_path = os.path.join(script_directory, "configs/clip_vit_config.json")
        tokenizer_path = os.path.join(script_directory, "configs/tokenizer")

        custom_config = {
            'sdxl_model': sdxl_model,
            'diffusion_dtype': diffusion_dtype,
            'supir_model': supir_model,
            'fp8_unet': fp8_unet,
        }

        if diffusion_dtype == 'auto':
            try:
                if mm.should_use_fp16():
                    print("Diffusion using fp16")
                    dtype = torch.float16
                    model_dtype = 'fp16'
                elif mm.should_use_bf16():
                    print("Diffusion using bf16")
                    dtype = torch.bfloat16
                    model_dtype = 'bf16'
                else:
                    print("Diffusion using fp32")
                    dtype = torch.float32
                    model_dtype = 'fp32'
            except:
                raise AttributeError("ComfyUI version too old, can't autodetect properly. Set your dtypes manually.")
        else:
            print(f"Diffusion using {diffusion_dtype}")
            dtype = convert_dtype(diffusion_dtype)
            model_dtype = diffusion_dtype
        
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
                
            config.model.params.diffusion_dtype = model_dtype
            config.model.target = ".SUPIR.models.SUPIR_model_v2.SUPIRModel"
            pbar = comfy.utils.ProgressBar(5)

            self.model = instantiate_from_config(config.model).cpu()
            self.model.model.dtype = dtype
            pbar.update(1)
            try:
                print(f"Attempting to load SDXL model: [{SDXL_MODEL_PATH}]")
                sdxl_state_dict = load_state_dict(SDXL_MODEL_PATH)
                self.model.load_state_dict(sdxl_state_dict, strict=False)
                if fp8_unet:
                    self.model.model.to(torch.float8_e4m3fn)
                else:
                    self.model.model.to(dtype)
                pbar.update(1)
            except:
                raise Exception("Failed to load SDXL model")
            
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
                self.model.conditioner.embedders[0].to(dtype)
                for param in self.model.conditioner.embedders[0].parameters():
                    param.requires_grad = False
                pbar.update(1)
            except:
                raise Exception("Failed to load first clip model from SDXL checkpoint")
            
            del sdxl_state_dict

            #second clip model from SDXL checkpoint
            try:
                print("Loading second clip model from SDXL checkpoint")
                replace_prefix2 = {}
                replace_prefix2["conditioner.embedders.1.model."] = ""
                sd = comfy.utils.state_dict_prefix_replace(sd, replace_prefix2, filter_keys=True)                
                clip_g = build_text_model_from_openai_state_dict(sd, device, cast_dtype=dtype)
                self.model.conditioner.embedders[1].model = clip_g
                self.model.conditioner.embedders[1].to(dtype)
                pbar.update(1)
            except:
                raise Exception("Failed to load second clip model from SDXL checkpoint")
        
            del sd, clip_g

            try:
                print(f'Attempting to load SUPIR model: [{SUPIR_MODEL_PATH}]')
                supir_state_dict = load_state_dict(SUPIR_MODEL_PATH)
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
