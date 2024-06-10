---
tags:
- CLIP
- Loader
- ModelIO
---

# CLIPSeg Model Loader (Salt)
## Documentation
- Class name: `SaltCLIPSegLoader`
- Category: `SALT/Loaders`
- Output node: `False`

The SaltCLIPSegLoader node is designed to load and initialize the CLIPSeg model for image segmentation tasks. It facilitates the process of fetching the model and its processor from a specified source, caching them locally for efficient reuse.
## Input types
### Required
- **`model`**
    - Specifies the model identifier for the CLIPSeg model to be loaded. This allows for flexibility in choosing different CLIPSeg model versions or configurations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`clipseg_model`**
    - Comfy dtype: `CLIPSEG_MODEL`
    - Returns a tuple containing the CLIPSeg processor and the CLIPSeg model, ready for image segmentation tasks.
    - Python dtype: `Tuple[CLIPSegProcessor, CLIPSegForImageSegmentation]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltCLIPSegLoader:
    def __init__(self):
        pass
        
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": ("STRING", {"default": "CIDAS/clipseg-rd64-refined", "multiline": False}),
            },
        }

    RETURN_TYPES = ("CLIPSEG_MODEL",)
    RETURN_NAMES = ("clipseg_model",)
    FUNCTION = "clipseg_model"

    CATEGORY = f"{NAME}/Loaders"

    def clipseg_model(self, model):
        from transformers import CLIPSegProcessor, CLIPSegForImageSegmentation

        cache = os.path.join(models_dir, 'clipseg')

        inputs = CLIPSegProcessor.from_pretrained(model, cache_dir=cache)
        model = CLIPSegForImageSegmentation.from_pretrained(model, cache_dir=cache)

        return ( (inputs, model), ) 

```
