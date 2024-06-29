---
tags:
- Sampling
---

# FreeU
## Documentation
- Class name: `FreeU`
- Category: `model_patches`
- Output node: `False`

The FreeU node is designed to enhance and modify the output of generative models by applying a Fourier filter to adjust the frequency components of the generated images. This process aims to improve image quality or introduce specific effects based on the scale and threshold parameters.
## Input types
### Required
- **`model`**
    - The generative model to be enhanced or modified. This parameter is crucial as it determines the base model whose output will be adjusted by the FreeU node.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`b1`**
    - A scale factor applied to the higher frequency components of the image, influencing the intensity of the adjustment.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`b2`**
    - A scale factor applied to the lower frequency components of the image, influencing the intensity of the adjustment.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`s1`**
    - A threshold parameter for the higher frequency components, determining the range of frequencies to be adjusted.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`s2`**
    - A threshold parameter for the lower frequency components, determining the range of frequencies to be adjusted.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified generative model with an output block patched to apply the Fourier filter, enhancing or altering the generated images.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [Bus Node](../../was-node-suite-comfyui/Nodes/Bus Node.md)
    - DynamicThresholdingFull
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)



## Source code
```python
class FreeU:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                             "b1": ("FLOAT", {"default": 1.1, "min": 0.0, "max": 10.0, "step": 0.01}),
                             "b2": ("FLOAT", {"default": 1.2, "min": 0.0, "max": 10.0, "step": 0.01}),
                             "s1": ("FLOAT", {"default": 0.9, "min": 0.0, "max": 10.0, "step": 0.01}),
                             "s2": ("FLOAT", {"default": 0.2, "min": 0.0, "max": 10.0, "step": 0.01}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "model_patches"

    def patch(self, model, b1, b2, s1, s2):
        model_channels = model.model.model_config.unet_config["model_channels"]
        scale_dict = {model_channels * 4: (b1, s1), model_channels * 2: (b2, s2)}
        on_cpu_devices = {}

        def output_block_patch(h, hsp, transformer_options):
            scale = scale_dict.get(h.shape[1], None)
            if scale is not None:
                h[:,:h.shape[1] // 2] = h[:,:h.shape[1] // 2] * scale[0]
                if hsp.device not in on_cpu_devices:
                    try:
                        hsp = Fourier_filter(hsp, threshold=1, scale=scale[1])
                    except:
                        logging.warning("Device {} does not support the torch.fft functions used in the FreeU node, switching to CPU.".format(hsp.device))
                        on_cpu_devices[hsp.device] = True
                        hsp = Fourier_filter(hsp.cpu(), threshold=1, scale=scale[1]).to(hsp.device)
                else:
                    hsp = Fourier_filter(hsp.cpu(), threshold=1, scale=scale[1]).to(hsp.device)

            return h, hsp

        m = model.clone()
        m.set_model_output_block_patch(output_block_patch)
        return (m, )

```
