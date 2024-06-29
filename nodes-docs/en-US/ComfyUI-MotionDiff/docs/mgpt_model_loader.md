---
tags:
- MotionData
---

# MotionGPT Model Loader
## Documentation
- Class name: `mgpt_model_loader`
- Category: `MotionDiff/mGPT`
- Output node: `False`

This node is responsible for loading and initializing the MotionGPT model with a specified configuration and model weights. It ensures the model is ready for generating or processing motion data by setting up the necessary environment, including downloading the model if not locally available, and preparing it for inference.
## Input types
### Required
- **`model`**
    - Specifies the model to be loaded and initialized for motion generation or processing. This parameter determines which specific MotionGPT model configuration and weights are used, impacting the quality and type of motion data the node can generate or process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`mgpt_model`**
    - Comfy dtype: `MGPTMODEL`
    - The loaded and initialized MotionGPT model, ready for generating or processing motion data.
    - Python dtype: `torch.nn.Module`
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
