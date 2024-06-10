---
tags:
- LayeredDiffusion
---

# [Inference.Core] Layer Diffuse Apply
## Documentation
- Class name: `Inference_Core_LayeredDiffusionApply`
- Category: `layer_diffuse`
- Output node: `False`

This node is designed to apply a layered diffusion process to an input model, leveraging specific configurations and conditions to modify the model's behavior for enhanced image generation or transformation. It abstracts complex diffusion and conditioning logic into a more accessible interface for users, aiming to facilitate the creation of nuanced and high-quality visual content.
## Input types
### Required
- **`model`**
    - Represents the model to which the layered diffusion process will be applied, playing a crucial role in determining the outcome of the diffusion process by influencing the model's behavior and the quality of generated images.
    - Comfy dtype: `MODEL`
    - Python dtype: `ModelPatcher`
- **`config`**
    - The configuration string that specifies the particular settings or parameters for the layered diffusion process, directly impacting how the model is modified and behaves during image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`weight`**
    - A float value that influences the intensity or degree of the applied diffusion process, affecting the final visual output by adjusting how the model's parameters are modified.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model after the application of the layered diffusion process, showcasing the effects of the diffusion and conditioning on the model's ability to generate or transform images.
    - Python dtype: `ModelPatcher`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LayeredDiffusionFG:
    """Generate foreground with transparent background."""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "config": ([c.config_string for c in s.MODELS],),
                "weight": (
                    "FLOAT",
                    {"default": 1.0, "min": -1, "max": 3, "step": 0.05},
                ),
            },
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "apply_layered_diffusion"
    CATEGORY = "layer_diffuse"
    MODELS = (
        LayeredDiffusionBase(
            model_file_name="layer_xl_transparent_attn.safetensors",
            model_url="https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_xl_transparent_attn.safetensors",
            sd_version=StableDiffusionVersion.SDXL,
            injection_method=LayerMethod.ATTN,
        ),
        LayeredDiffusionBase(
            model_file_name="layer_xl_transparent_conv.safetensors",
            model_url="https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_xl_transparent_conv.safetensors",
            sd_version=StableDiffusionVersion.SDXL,
            injection_method=LayerMethod.CONV,
        ),
        LayeredDiffusionBase(
            model_file_name="layer_sd15_transparent_attn.safetensors",
            model_url="https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_sd15_transparent_attn.safetensors",
            sd_version=StableDiffusionVersion.SD1x,
            injection_method=LayerMethod.ATTN,
            attn_sharing=True,
        ),
    )

    def apply_layered_diffusion(
        self,
        model: ModelPatcher,
        config: str,
        weight: float,
    ):
        ld_model = [m for m in self.MODELS if m.config_string == config][0]
        assert get_model_sd_version(model) == ld_model.sd_version
        if ld_model.attn_sharing:
            return ld_model.apply_layered_diffusion_attn_sharing(model)
        else:
            return ld_model.apply_layered_diffusion(model, weight)

```
