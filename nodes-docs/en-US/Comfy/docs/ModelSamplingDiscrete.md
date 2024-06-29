---
tags:
- Sampling
---

# ModelSamplingDiscrete
## Documentation
- Class name: `ModelSamplingDiscrete`
- Category: `advanced/model`
- Output node: `False`

This node is designed to modify the sampling behavior of a model by applying a discrete sampling strategy. It allows for the selection of different sampling methods, such as epsilon, v_prediction, lcm, or x0, and optionally adjusts the model's noise reduction strategy based on the zero-shot noise ratio (zsnr) setting.
## Input types
### Required
- **`model`**
    - The model to which the discrete sampling strategy will be applied. This parameter is crucial as it defines the base model that will undergo modification.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`sampling`**
    - Specifies the discrete sampling method to be applied to the model. The choice of method affects how the model generates samples, offering different strategies for sampling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`zsnr`**
    - A boolean flag that, when enabled, adjusts the model's noise reduction strategy based on the zero-shot noise ratio. This can influence the quality and characteristics of the generated samples.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with the applied discrete sampling strategy. This model is now equipped to generate samples using the specified method and adjustments.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - Reroute
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [SamplerCustom](../../Comfy/Nodes/SamplerCustom.md)
    - [CR Module Pipe Loader](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Module Pipe Loader.md)
    - FreeU (Advanced)
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)
    - [ReroutePrimitive|pysssss](../../ComfyUI-Custom-Scripts/Nodes/ReroutePrimitive|pysssss.md)
    - [BasicScheduler](../../Comfy/Nodes/BasicScheduler.md)
    - [KSampler (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler (Efficient).md)



## Source code
```python
class ModelSamplingDiscrete:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "sampling": (["eps", "v_prediction", "lcm", "x0"],),
                              "zsnr": ("BOOLEAN", {"default": False}),
                              }}

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "advanced/model"

    def patch(self, model, sampling, zsnr):
        m = model.clone()

        sampling_base = comfy.model_sampling.ModelSamplingDiscrete
        if sampling == "eps":
            sampling_type = comfy.model_sampling.EPS
        elif sampling == "v_prediction":
            sampling_type = comfy.model_sampling.V_PREDICTION
        elif sampling == "lcm":
            sampling_type = LCM
            sampling_base = ModelSamplingDiscreteDistilled
        elif sampling == "x0":
            sampling_type = X0

        class ModelSamplingAdvanced(sampling_base, sampling_type):
            pass

        model_sampling = ModelSamplingAdvanced(model.model.model_config)
        if zsnr:
            model_sampling.set_sigmas(rescale_zero_terminal_snr_sigmas(model_sampling.sigmas))

        m.add_object_patch("model_sampling", model_sampling)
        return (m, )

```
