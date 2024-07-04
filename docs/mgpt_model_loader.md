
# Documentation
- Class name: mgpt_model_loader
- Category: MotionDiff/mGPT
- Output node: False

此节点负责加载和初始化指定配置和模型权重的 MotionGPT 模型。它通过设置必要的环境来确保模型准备就绪，可以生成或处理运动数据，包括在本地不可用时下载模型，并为推理做好准备。

# Input types
## Required
- model
    - 指定要加载和初始化的用于运动生成或处理的模型。此参数决定使用哪种特定的 MotionGPT 模型配置和权重，影响节点可以生成或处理的运动数据的质量和类型。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- mgpt_model
    - 已加载和初始化的 MotionGPT 模型，可以用于生成或处理运动数据。
    - Comfy dtype: MGPTMODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class mgpt_model_loader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model": (
                [   
                    "MotionGPT",
                    "AnimationGPT",
                ],
                {
                "default": "MotionGPT-base"
                    }),
        },
        }

    RETURN_TYPES = ("MGPTMODEL", )
    RETURN_NAMES = ("mgpt_model",)
    FUNCTION = "loadmodel"
    CATEGORY = "MotionDiff/mGPT"

    def loadmodel(self, model):
        script_directory = os.path.dirname(inspect.getabsfile(motiondiff_modules))
        config_path = os.path.join(script_directory, "mGPT/configs/inference.yaml")
        cfg = OmegaConf.load(config_path)

        if not hasattr(self, "model") or self.model == None or model != self.model_name:
            self.model_name = f"{model}_fp16.safetensors"
            base_bath = os.path.join(script_directory, "mGPT","checkpoints")
            model_path = os.path.join(script_directory, base_bath, self.model_name)

            if not os.path.exists(model_path):
                #https://huggingface.co/Kijai/AnimationGPT_pruned/ to ComfyUI/custom_nodes/ComfyUI-MotionDiff/motiondiff_modules/mGPT/checkpoints
                print(f"Downloading model to {model_path}")
                from huggingface_hub import snapshot_download
                snapshot_download(repo_id="Kijai/AnimationGPT_pruned",
                                    local_dir=base_bath, local_dir_use_symlinks=False, allow_patterns=[f"*{self.model_name}*"])  
            
            state_dict = load_torch_file(model_path)

            data_config = OmegaConf.to_container(cfg.DATASET, resolve=True)
            data_config["params"] = {"cfg": cfg, "phase": "test"}
            datamodule = instantiate_from_config(data_config)
            self.model = build_model(cfg, datamodule)
            
            self.model.load_state_dict(state_dict)
        
        return (self.model,)

```
