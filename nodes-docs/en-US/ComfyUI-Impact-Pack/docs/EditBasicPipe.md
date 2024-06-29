---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# Edit BasicPipe
## Documentation
- Class name: `EditBasicPipe`
- Category: `ImpactPack/Pipe`
- Output node: `False`

The EditBasicPipe node is designed to modify elements of a basic pipeline configuration, allowing for the customization of model, clip, VAE, and conditioning components.
## Input types
### Required
- **`basic_pipe`**
    - Represents the initial state of the basic pipeline components, which include model, clip, VAE, and conditioning elements. It is essential for determining the starting point for modifications.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[torch.nn.Module, torch.nn.Module, torch.nn.Module, List[str], List[str]]`
### Optional
- **`model`**
    - Optional parameter to replace the current model component of the basic pipe.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Optional parameter to replace the current clip component of the basic pipe.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - Optional parameter to replace the current VAE component of the basic pipe.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`positive`**
    - Optional parameter to add or replace the positive conditioning component of the basic pipe.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[str]`
- **`negative`**
    - Optional parameter to add or replace the negative conditioning component of the basic pipe.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[str]`
## Output types
- **`basic_pipe`**
    - Comfy dtype: `BASIC_PIPE`
    - The modified basic pipeline configuration, reflecting any changes made to the model, clip, VAE, and conditioning components.
    - Python dtype: `Tuple[torch.nn.Module, torch.nn.Module, torch.nn.Module, List[str], List[str]]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ImpactKSamplerBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ImpactKSamplerBasicPipe.md)
    - [DetailerForEachDebugPipe](../../ComfyUI-Impact-Pack/Nodes/DetailerForEachDebugPipe.md)



## Source code
```python
class EditBasicPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {"basic_pipe": ("BASIC_PIPE",), },
                "optional": {
                     "model": ("MODEL",),
                     "clip": ("CLIP",),
                     "vae": ("VAE",),
                     "positive": ("CONDITIONING",),
                     "negative": ("CONDITIONING",),
                     },
                }

    RETURN_TYPES = ("BASIC_PIPE", )
    RETURN_NAMES = ("basic_pipe", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Pipe"

    def doit(self, basic_pipe, model=None, clip=None, vae=None, positive=None, negative=None):
        res_model, res_clip, res_vae, res_positive, res_negative = basic_pipe

        if model is not None:
            res_model = model

        if clip is not None:
            res_clip = clip

        if vae is not None:
            res_vae = vae

        if positive is not None:
            res_positive = positive

        if negative is not None:
            res_negative = negative

        pipe = res_model, res_clip, res_vae, res_positive, res_negative

        return (pipe, )

```
