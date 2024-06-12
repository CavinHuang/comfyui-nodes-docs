---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# DetailerPipe -> BasicPipe
## Documentation
- Class name: `DetailerPipeToBasicPipe`
- Category: `ImpactPack/Pipe`
- Output node: `False`

This node transforms a detailer pipe configuration into two basic pipe configurations, one for the base model and another for the refiner model. It abstracts the complexity of handling different components within a detailer pipe and simplifies it into more manageable basic pipe structures.
## Input types
### Required
- **`detailer_pipe`**
    - The detailer pipe input is a comprehensive configuration that includes models, clips, VAEs, and conditioning information for both the base and refiner setups. It serves as the source from which the basic pipe configurations are derived.
    - Comfy dtype: `DETAILER_PIPE`
    - Python dtype: `Tuple[torch.nn.Module, torch.nn.Module, torch.nn.Module, str, str, NoneType, NoneType, NoneType, NoneType, NoneType, torch.nn.Module, torch.nn.Module, str, str]`
## Output types
- **`base_basic_pipe`**
    - Comfy dtype: `BASIC_PIPE`
    - The base basic pipe configuration, derived from the input detailer pipe, containing the model, clip, VAE, and conditioning information for the base setup.
    - Python dtype: `Tuple[torch.nn.Module, torch.nn.Module, torch.nn.Module, str, str]`
- **`refiner_basic_pipe`**
    - Comfy dtype: `BASIC_PIPE`
    - The refiner basic pipe configuration, also derived from the input detailer pipe, but focusing on the refiner model's setup including its model, clip, VAE, and conditioning information.
    - Python dtype: `Tuple[torch.nn.Module, torch.nn.Module, torch.nn.Module, str, str]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [EditBasicPipe](../../ComfyUI-Impact-Pack/Nodes/EditBasicPipe.md)



## Source code
```python
class DetailerPipeToBasicPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"detailer_pipe": ("DETAILER_PIPE",), }}

    RETURN_TYPES = ("BASIC_PIPE", "BASIC_PIPE")
    RETURN_NAMES = ("base_basic_pipe", "refiner_basic_pipe")
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Pipe"

    def doit(self, detailer_pipe):
        model, clip, vae, positive, negative, _, _, _, _, _, refiner_model, refiner_clip, refiner_positive, refiner_negative = detailer_pipe
        pipe = model, clip, vae, positive, negative
        refiner_pipe = refiner_model, refiner_clip, vae, refiner_positive, refiner_negative
        return (pipe, refiner_pipe)

```
