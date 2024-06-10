---
tags:
- DepthMap
- DepthMapEstimation
- Image
---

# MiDaS Model Loader
## Documentation
- Class name: `MiDaS Model Loader`
- Category: `WAS Suite/Loaders`
- Output node: `False`

The MiDaS Model Loader node is designed to load and prepare the MiDaS model for depth estimation tasks. It handles the installation of necessary dependencies, model selection based on input, and the application of appropriate transformations for input images.
## Input types
### Required
- **`midas_model`**
    - Specifies the version of the MiDaS model to be loaded. The choice of model affects the depth estimation accuracy and performance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`midas_model`**
    - Comfy dtype: `MIDAS_MODEL`
    - Returns the loaded MiDaS model and the transformation function required for preparing input images for depth estimation.
    - Python dtype: `Tuple[torch.nn.Module, Callable]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [MiDaS Depth Approximation](../../was-node-suite-comfyui/Nodes/MiDaS Depth Approximation.md)



## Source code
```python
class MiDaS_Model_Loader:
    def __init__(self):
        self.midas_dir = os.path.join(MODELS_DIR, 'midas')

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "midas_model": (["DPT_Large", "DPT_Hybrid"],),
            },
        }

    RETURN_TYPES = ("MIDAS_MODEL",)
    RETURN_NAMES = ("midas_model",)
    FUNCTION = "load_midas_model"

    CATEGORY = "WAS Suite/Loaders"

    def load_midas_model(self, midas_model):

        global MIDAS_INSTALLED

        if not MIDAS_INSTALLED:
            self.install_midas()

        if midas_model == 'DPT_Large':
            model_name = 'dpt_large_384.pt'
        elif midas_model == 'DPT_Hybrid':
            model_name = 'dpt_hybrid_384.pt'
        else:
            model_name = 'dpt_large_384.pt'

        model_path = os.path.join(self.midas_dir, 'checkpoints'+os.sep+model_name)

        torch.hub.set_dir(self.midas_dir)
        if os.path.exists(model_path):
            cstr(f"Loading MiDaS Model from `{model_path}`").msg.print()
            midas_type = model_path
        else:
            cstr("Downloading and loading MiDaS Model...").msg.print()
        midas = torch.hub.load("intel-isl/MiDaS", midas_model, trust_repo=True)
        device = torch.device("cpu")

        cstr(f"MiDaS is using passive device `{device}` until in use.").msg.print()

        midas.to(device)
        midas_transforms = torch.hub.load("intel-isl/MiDaS", "transforms")
        transform = midas_transforms.dpt_transform

        return ( (midas, transform), )

    def install_midas(self):
        global MIDAS_INSTALLED
        if 'timm' not in packages():
            install_package("timm")
        MIDAS_INSTALLED = True

```
