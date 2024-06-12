---
tags:
- Sampling
---

# Asymmetric Tiled KSampler
## Documentation
- Class name: `Asymmetric Tiled KSampler`
- Category: `Sampling/Tiled`
- Output node: `False`

This node specializes in generating samples through a tiling approach that allows for asymmetric adjustments to the tiling pattern. It modifies the convolutional layers of a model to use circular or constant padding based on the tiling configuration, enabling more flexible and potentially more aesthetically pleasing image generation.
## Input types
### Required
- **`model`**
    - The model parameter represents the generative model to be used for sampling. It is crucial as it defines the architecture and parameters that will be adjusted for asymmetric tiling during the sampling process.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`seed`**
    - The seed parameter ensures reproducibility of the sampling process by initializing the random number generator to a specific state.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tileX`**
    - The tileX parameter controls the horizontal tiling behavior, allowing for circular or constant padding to be applied asymmetrically.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tileY`**
    - The tileY parameter controls the vertical tiling behavior, complementing tileX by enabling asymmetric padding adjustments in the vertical direction.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - The steps parameter determines the number of iterations the sampling process will undergo, affecting the detail and quality of the generated sample.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - The cfg parameter adjusts the conditioning factor, influencing the strength of the conditioning signal during the sampling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The sampler_name parameter specifies the sampling algorithm to be used, impacting the characteristics of the generated sample.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - The scheduler parameter selects the scheduling algorithm for controlling the sampling process, affecting the progression of sampling steps.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - The positive parameter provides positive conditioning information, guiding the sampling process towards desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - The negative parameter provides negative conditioning information, steering the sampling process away from undesired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - The latent_image parameter represents the initial state in the latent space from which the sampling process begins.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`denoise`**
    - The denoise parameter controls the level of denoising applied during the sampling process, affecting the clarity and smoothness of the generated sample.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a modified latent representation, reflecting the asymmetric tiling adjustments and sampling process.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Asymmetric_Tiled_KSampler:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                {"model": ("MODEL", ),
                 "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                 "tileX": ("INT", {"default": 1, "min": 0, "max": 1}),
                 "tileY": ("INT", {"default": 1, "min": 0, "max": 1}),
                 "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                 "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                 "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                 "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                 "positive": ("CONDITIONING", ),
                 "negative": ("CONDITIONING", ),
                 "latent_image": ("LATENT", ),
                 "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                 }}

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "sample"
    CATEGORY = "Sampling/Tiled"

    def apply_asymmetric_tiling(self, model, tileX, tileY):
        for layer in [layer for layer in model.modules() if isinstance(layer, torch.nn.Conv2d)]:
            layer.padding_modeX = 'circular' if tileX else 'constant'
            layer.padding_modeY = 'circular' if tileY else 'constant'
            layer.paddingX = (layer._reversed_padding_repeated_twice[0], layer._reversed_padding_repeated_twice[1], 0, 0)
            layer.paddingY = (0, 0, layer._reversed_padding_repeated_twice[2], layer._reversed_padding_repeated_twice[3])
            print(layer.paddingX, layer.paddingY)

    def __hijackConv2DMethods(self, model, tileX: bool, tileY: bool):
        for layer in [l for l in model.modules() if isinstance(l, torch.nn.Conv2d)]:
            layer.padding_modeX = 'circular' if tileX else 'constant'
            layer.padding_modeY = 'circular' if tileY else 'constant'
            layer.paddingX = (layer._reversed_padding_repeated_twice[0], layer._reversed_padding_repeated_twice[1], 0, 0)
            layer.paddingY = (0, 0, layer._reversed_padding_repeated_twice[2], layer._reversed_padding_repeated_twice[3])
            
            def make_bound_method(method, current_layer):
                def bound_method(self, *args, **kwargs):  # Add 'self' here
                    return method(current_layer, *args, **kwargs)
                return bound_method
                
            bound_method = make_bound_method(self.__replacementConv2DConvForward, layer)
            layer._conv_forward = bound_method.__get__(layer, type(layer))

    def __replacementConv2DConvForward(self, layer, input: torch.Tensor, weight: torch.Tensor, bias: Optional[torch.Tensor]):
        working = torch.nn.functional.pad(input, layer.paddingX, mode=layer.padding_modeX)
        working = torch.nn.functional.pad(working, layer.paddingY, mode=layer.padding_modeY)
        return torch.nn.functional.conv2d(working, weight, bias, layer.stride, (0, 0), layer.dilation, layer.groups)


    def __restoreConv2DMethods(self, model):
        for layer in [l for l in model.modules() if isinstance(l, torch.nn.Conv2d)]:
            layer._conv_forward = torch.nn.Conv2d._conv_forward.__get__(layer, torch.nn.Conv2d)
            

    def sample(self, model, seed, tileX, tileY, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=1.0):
        self.__hijackConv2DMethods(model.model, tileX == 1, tileY == 1)
        result = nodes.common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=denoise)
        self.__restoreConv2DMethods(model.model)
        return result

```
