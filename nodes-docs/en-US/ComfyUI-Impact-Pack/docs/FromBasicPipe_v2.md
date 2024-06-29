---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# FromBasicPipe_v2
## Documentation
- Class name: `FromBasicPipe_v2`
- Category: `ImpactPack/Pipe`
- Output node: `False`

The `FromBasicPipe_v2` node is designed to decompose a basic pipeline into its constituent components, facilitating access to individual elements such as models, clips, and conditioning parameters for further processing or analysis.
## Input types
### Required
- **`basic_pipe`**
    - Represents the basic pipeline to be decomposed into its individual components, enabling detailed examination and manipulation of each element.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[torch.nn.Module, Any, Any, Any, Any]`
## Output types
- **`basic_pipe`**
    - Comfy dtype: `BASIC_PIPE`
    - Returns the original basic pipeline as received in the input, allowing for its reuse or further manipulation.
    - Python dtype: `Tuple[torch.nn.Module, Any, Any, Any, Any]`
- **`model`**
    - Comfy dtype: `MODEL`
    - Extracts the model component from the basic pipeline for independent use or analysis.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - Retrieves the CLIP model from the basic pipeline, making it available for separate operations.
    - Python dtype: `Any`
- **`vae`**
    - Comfy dtype: `VAE`
    - Isolates the VAE model from the basic pipeline for individual application or study.
    - Python dtype: `Any`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - Separates the positive conditioning parameter from the basic pipeline, providing it for distinct processing or examination.
    - Python dtype: `Any`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - Separates the negative conditioning parameter from the basic pipeline, offering it for individual utilization or analysis.
    - Python dtype: `Any`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - ToIPAdapterPipe //Inspire
    - [EditBasicPipe](../../ComfyUI-Impact-Pack/Nodes/EditBasicPipe.md)



## Source code
```python
class FromBasicPipe_v2:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"basic_pipe": ("BASIC_PIPE",), }, }

    RETURN_TYPES = ("BASIC_PIPE", "MODEL", "CLIP", "VAE", "CONDITIONING", "CONDITIONING")
    RETURN_NAMES = ("basic_pipe", "model", "clip", "vae", "positive", "negative")
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Pipe"

    def doit(self, basic_pipe):
        model, clip, vae, positive, negative = basic_pipe
        return basic_pipe, model, clip, vae, positive, negative

```
