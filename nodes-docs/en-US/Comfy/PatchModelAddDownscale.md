---
tags:
- ImageScaling
---

# PatchModelAddDownscale (Kohya Deep Shrink)
## Documentation
- Class name: `PatchModelAddDownscale`
- Category: `_for_testing`
- Output node: `False`

The PatchModelAddDownscale node is designed to modify a given model by introducing downscaling and upscaling operations at specified points within the model's architecture. This process aims to adjust the model's internal representations by altering the resolution of feature maps, potentially enhancing the model's efficiency or performance on certain tasks.
## Input types
### Required
- **`model`**
    - The model to be patched with downscaling and upscaling operations. This parameter is crucial as it defines the base model that will undergo modifications.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`block_number`**
    - Specifies the block number within the model where the downscaling operation should be applied. This parameter allows for targeted modification of the model's architecture.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`downscale_factor`**
    - The factor by which the feature map's resolution is reduced during the downscaling operation. A higher downscale factor leads to a more significant reduction in resolution.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_percent`**
    - Defines the starting point of the sigma range for applying the downscaling operation, based on the model's internal noise levels.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent`**
    - Defines the ending point of the sigma range for applying the downscaling operation, allowing for precise control over when the operation is performed.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`downscale_after_skip`**
    - A boolean flag indicating whether the downscaling operation should be applied after skip connections within the model. This choice can affect the flow of information through the model.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`downscale_method`**
    - Specifies the method used for downscaling the feature maps. Different methods can affect the quality and characteristics of the downscaled representations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_method`**
    - Specifies the method used for upscaling the feature maps back to their original resolution. This parameter complements the downscale_method by restoring the feature map size.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with downscaling and upscaling operations applied at specified points. This output reflects the adjustments made to the model's architecture.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - KRestartSamplerAdv
    - [ModelSamplingDiscrete](../../Comfy/Nodes/ModelSamplingDiscrete.md)
    - [LoraLoader](../../Comfy/Nodes/LoraLoader.md)
    - IPAdapterApply



## Source code
```python
class PatchModelAddDownscale:
    upscale_methods = ["bicubic", "nearest-exact", "bilinear", "area", "bislerp"]
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "block_number": ("INT", {"default": 3, "min": 1, "max": 32, "step": 1}),
                              "downscale_factor": ("FLOAT", {"default": 2.0, "min": 0.1, "max": 9.0, "step": 0.001}),
                              "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                              "end_percent": ("FLOAT", {"default": 0.35, "min": 0.0, "max": 1.0, "step": 0.001}),
                              "downscale_after_skip": ("BOOLEAN", {"default": True}),
                              "downscale_method": (s.upscale_methods,),
                              "upscale_method": (s.upscale_methods,),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "_for_testing"

    def patch(self, model, block_number, downscale_factor, start_percent, end_percent, downscale_after_skip, downscale_method, upscale_method):
        sigma_start = model.model.model_sampling.percent_to_sigma(start_percent)
        sigma_end = model.model.model_sampling.percent_to_sigma(end_percent)

        def input_block_patch(h, transformer_options):
            if transformer_options["block"][1] == block_number:
                sigma = transformer_options["sigmas"][0].item()
                if sigma <= sigma_start and sigma >= sigma_end:
                    h = comfy.utils.common_upscale(h, round(h.shape[-1] * (1.0 / downscale_factor)), round(h.shape[-2] * (1.0 / downscale_factor)), downscale_method, "disabled")
            return h

        def output_block_patch(h, hsp, transformer_options):
            if h.shape[2] != hsp.shape[2]:
                h = comfy.utils.common_upscale(h, hsp.shape[-1], hsp.shape[-2], upscale_method, "disabled")
            return h, hsp

        m = model.clone()
        if downscale_after_skip:
            m.set_model_input_block_patch_after_skip(input_block_patch)
        else:
            m.set_model_input_block_patch(input_block_patch)
        m.set_model_output_block_patch(output_block_patch)
        return (m, )

```
