---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# FromBasicPipe
## Documentation
- Class name: `FromBasicPipe`
- Category: `ImpactPack/Pipe`
- Output node: `False`

The FromBasicPipe node is designed to decompose a basic pipe structure into its constituent components, facilitating access to individual elements such as models, clips, and VAEs for further processing or analysis.
## Input types
### Required
- **`basic_pipe`**
    - Represents the basic pipe structure encapsulating a model, clip, VAE, and positive and negative conditioning elements. It serves as the input for decomposition into its constituent components.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[torch.nn.Module, torch.nn.Module, torch.nn.Module, torch.Tensor, torch.Tensor]`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The model component extracted from the basic pipe.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The clip component extracted from the basic pipe.
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - Comfy dtype: `VAE`
    - The VAE component extracted from the basic pipe.
    - Python dtype: `torch.nn.Module`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The positive conditioning element extracted from the basic pipe.
    - Python dtype: `torch.Tensor`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The negative conditioning element extracted from the basic pipe.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [ToBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ToBasicPipe.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)
    - [IterativeImageUpscale](../../ComfyUI-Impact-Pack/Nodes/IterativeImageUpscale.md)



## Source code
```python
class FromBasicPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"basic_pipe": ("BASIC_PIPE",), }, }

    RETURN_TYPES = ("MODEL", "CLIP", "VAE", "CONDITIONING", "CONDITIONING")
    RETURN_NAMES = ("model", "clip", "vae", "positive", "negative")
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Pipe"

    def doit(self, basic_pipe):
        model, clip, vae, positive, negative = basic_pipe
        return model, clip, vae, positive, negative

```
