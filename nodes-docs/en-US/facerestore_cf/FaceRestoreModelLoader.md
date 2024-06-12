---
tags:
- Face
- FaceRestoration
---

# FaceRestoreModelLoader
## Documentation
- Class name: `FaceRestoreModelLoader`
- Category: `facerestore_cf`
- Output node: `False`

The FaceRestoreModelLoader node is designed to load and manage face restoration models, facilitating the initialization and configuration of models required for face restoration tasks. It acts as a central hub for accessing different face restoration and detection models, streamlining the process of model selection and loading for subsequent face restoration operations.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the face restoration model to be loaded. This parameter is crucial for identifying and retrieving the correct model from a predefined list of available models.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`facerestore_model`**
    - Comfy dtype: `FACERESTORE_MODEL`
    - Returns the loaded face restoration model, ready for use in face restoration tasks.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [FaceRestoreCFWithModel](../../facerestore_cf/Nodes/FaceRestoreCFWithModel.md)
    - FaceRestoreWithModel



## Source code
```python
class FaceRestoreModelLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model_name": (folder_paths.get_filename_list("facerestore_models"), ),
                             }}
    RETURN_TYPES = ("FACERESTORE_MODEL",)
    FUNCTION = "load_model"

    CATEGORY = "facerestore_cf"

    # def load_model(self, model_name):
    #     model_path = folder_paths.get_full_path("facerestore_models", model_name)
    #     sd = comfy.utils.load_torch_file(model_path, safe_load=True)
    #     out = model_loading.load_state_dict(sd).eval()
    #     return (out, )

    def load_model(self, model_name):
        if "codeformer" in model_name.lower():
            print(f'\tLoading CodeFormer: {model_name}')
            model_path = folder_paths.get_full_path("facerestore_models", model_name)
            device = model_management.get_torch_device()
            codeformer_net = ARCH_REGISTRY.get("CodeFormer")(
                dim_embd=512,
                codebook_size=1024,
                n_head=8,
                n_layers=9,
                connect_list=["32", "64", "128", "256"],
            ).to(device)
            checkpoint = torch.load(model_path)["params_ema"]
            codeformer_net.load_state_dict(checkpoint)
            out = codeformer_net.eval()  
            return (out, )
        else:
            model_path = folder_paths.get_full_path("facerestore_models", model_name)
            sd = comfy.utils.load_torch_file(model_path, safe_load=True)
            out = model_loading.load_state_dict(sd).eval()
            return (out, )

```
