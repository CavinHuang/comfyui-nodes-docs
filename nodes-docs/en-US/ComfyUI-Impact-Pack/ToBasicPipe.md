---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# ToBasicPipe
## Documentation
- Class name: `ToBasicPipe`
- Category: `ImpactPack/Pipe`
- Output node: `False`

The ToBasicPipe node is designed to aggregate essential components for a generative pipeline into a single, basic pipeline structure. It combines models, clips, VAEs, and conditioning information into a unified format, facilitating easier manipulation and use in subsequent processes.
## Input types
### Required
- **`model`**
    - The model parameter represents the core generative model to be included in the basic pipeline. It is crucial for the generation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `object`
- **`clip`**
    - The clip parameter is included to provide additional context or constraints for the generation process, enhancing the output's relevance or quality.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`vae`**
    - The vae parameter is a variational autoencoder used for processing or transforming the input data, playing a significant role in the pipeline's functionality.
    - Comfy dtype: `VAE`
    - Python dtype: `object`
- **`positive`**
    - The positive conditioning information guides the generation towards desired attributes or characteristics.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `object`
- **`negative`**
    - The negative conditioning information steers the generation away from undesired attributes or characteristics, refining the output.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `object`
## Output types
- **`basic_pipe`**
    - Comfy dtype: `BASIC_PIPE`
    - The basic_pipe output encapsulates the combined model, clip, VAE, and conditioning information into a single, manageable structure for further processing.
    - Python dtype: `Tuple[object, object, object, object, object]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [FromBasicPipe](../../ComfyUI-Impact-Pack/Nodes/FromBasicPipe.md)
    - [ImpactKSamplerBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ImpactKSamplerBasicPipe.md)
    - Reroute
    - [DetailerForEachDebugPipe](../../ComfyUI-Impact-Pack/Nodes/DetailerForEachDebugPipe.md)
    - [DetailerForEachPipeForAnimateDiff](../../ComfyUI-Impact-Pack/Nodes/DetailerForEachPipeForAnimateDiff.md)
    - [SEGSDetailerForAnimateDiff](../../ComfyUI-Impact-Pack/Nodes/SEGSDetailerForAnimateDiff.md)
    - [PixelKSampleUpscalerProviderPipe](../../ComfyUI-Impact-Pack/Nodes/PixelKSampleUpscalerProviderPipe.md)



## Source code
```python
class ToBasicPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
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

    def doit(self, model, clip, vae, positive, negative):
        pipe = (model, clip, vae, positive, negative)
        return (pipe, )

```
