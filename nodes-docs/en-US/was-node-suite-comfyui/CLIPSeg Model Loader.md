---
tags:
- CLIP
- Loader
- ModelIO
---

# CLIPSeg Model Loader
## Documentation
- Class name: `CLIPSeg Model Loader`
- Category: `WAS Suite/Loaders`
- Output node: `False`

This node is designed to load a CLIPSeg model, which is a specialized model for image segmentation using CLIP (Contrastive Language–Image Pretraining). It facilitates the integration of CLIPSeg's capabilities into workflows, enabling advanced image segmentation tasks that leverage both textual and visual information.
## Input types
### Required
- **`model`**
    - Specifies the model to be loaded. The default model is 'CIDAS/clipseg-rd64-refined'. This parameter allows for the selection of different CLIPSeg models based on the task requirements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`clipseg_model`**
    - Comfy dtype: `CLIPSEG_MODEL`
    - Outputs a tuple containing the CLIPSeg model and its processor, ready for image segmentation tasks.
    - Python dtype: `Tuple[CLIPSegProcessor, CLIPSegForImageSegmentation]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [CLIPSeg Masking](../../was-node-suite-comfyui/Nodes/CLIPSeg Masking.md)



## Source code
```python
class WAS_CLIPSeg_Model_Loader:
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

    CATEGORY = "WAS Suite/Loaders"

    def clipseg_model(self, model):
        from transformers import CLIPSegProcessor, CLIPSegForImageSegmentation

        cache = os.path.join(MODELS_DIR, 'clipseg')

        inputs = CLIPSegProcessor.from_pretrained(model, cache_dir=cache)
        model = CLIPSegForImageSegmentation.from_pretrained(model, cache_dir=cache)

        return ( (inputs, model), )

```
