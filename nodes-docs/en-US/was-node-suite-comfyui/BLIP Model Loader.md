---
tags:
- Loader
- ModelIO
---

# BLIP Model Loader
## Documentation
- Class name: `BLIP Model Loader`
- Category: `WAS Suite/Loaders`
- Output node: `False`

The BLIP Model Loader node is designed to dynamically load and initialize BLIP models based on the specified configuration, such as model type (caption or interrogate). It ensures the models are ready for inference by setting them to evaluation mode and moving them to the appropriate device.
## Input types
### Required
- **`blip_model`**
    - Specifies the type of BLIP model to load, such as 'caption' or 'interrogate', determining the model's functionality and application.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`blip_model`**
    - Comfy dtype: `BLIP_MODEL`
    - The type of BLIP model loaded, reflecting the input specification.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [BLIP Analyze Image](../../was-node-suite-comfyui/Nodes/BLIP Analyze Image.md)



## Source code
```python
class WAS_BLIP_Model_Loader:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "blip_model": (["caption", "interrogate"], ),
            }
        }

    RETURN_TYPES = ("BLIP_MODEL",)
    FUNCTION = "blip_model"

    CATEGORY = "WAS Suite/Loaders"

    def blip_model(self, blip_model):

        if ( 'timm' not in packages()
            or 'transformers' not in packages()
            or 'fairscale' not in packages() ):
            cstr(f"Modules or packages are missing to use BLIP models. Please run the `{os.path.join(WAS_SUITE_ROOT, 'requirements.txt')}` through ComfyUI's python executable.").error.print()
            exit

        if 'transformers==4.26.1' not in packages(True):
            cstr(f"`transformers==4.26.1` is required for BLIP models. Please run the `{os.path.join(WAS_SUITE_ROOT, 'requirements.txt')}` through ComfyUI's python executable.").error.print()
            exit

        device = 'cpu'
        conf = getSuiteConfig()
        size = 384

        if blip_model == 'caption':

            from .modules.BLIP.blip_module import blip_decoder

            blip_dir = os.path.join(MODELS_DIR, 'blip')
            if not os.path.exists(blip_dir):
                os.makedirs(blip_dir, exist_ok=True)

            torch.hub.set_dir(blip_dir)

            if conf.__contains__('blip_model_url'):
                model_url = conf['blip_model_url']
            else:
                model_url = 'https://storage.googleapis.com/sfr-vision-language-research/BLIP/models/model_base_capfilt_large.pth'

            model = blip_decoder(pretrained=model_url, image_size=size, vit='base')
            model.eval()
            model = model.to(device)

        elif blip_model == 'interrogate':

            from .modules.BLIP.blip_module import blip_vqa

            blip_dir = os.path.join(MODELS_DIR, 'blip')
            if not os.path.exists(blip_dir):
                os.makedirs(blip_dir, exist_ok=True)

            torch.hub.set_dir(blip_dir)

            if conf.__contains__('blip_model_vqa_url'):
                model_url = conf['blip_model_vqa_url']
            else:
                model_url = 'https://storage.googleapis.com/sfr-vision-language-research/BLIP/models/model_base_vqa_capfilt_large.pth'

            model = blip_vqa(pretrained=model_url, image_size=size, vit='base')
            model.eval()
            model = model.to(device)

        result = ( model, blip_model )

        return ( result, )

```
