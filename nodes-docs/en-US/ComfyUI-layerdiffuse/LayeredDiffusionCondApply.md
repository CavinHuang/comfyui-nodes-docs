---
tags:
- LayeredDiffusion
---

# Layer Diffuse Cond Apply
## Documentation
- Class name: `LayeredDiffusionCondApply`
- Category: `layer_diffuse`
- Output node: `False`

This node specializes in applying conditional layered diffusion processes to models, leveraging specific conditions to guide the diffusion process. It integrates conditional inputs with the model's latent space, facilitating targeted modifications and enhancements in the generated outputs.
## Input types
### Required
- **`model`**
    - The model to which the layered diffusion process will be applied, encapsulating the necessary architecture and parameters for the diffusion to take place.
    - Comfy dtype: `MODEL`
    - Python dtype: `ModelPatcher`
- **`cond`**
    - The conditional input that guides the diffusion process, influencing the direction and characteristics of the generated output.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[List[List[torch.TensorType]]]`
- **`uncond`**
    - An unconditional input that serves as a baseline or reference for the diffusion process, providing a contrast to the conditional input.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[List[List[torch.TensorType]]]`
- **`latent`**
    - The latent representation of the input, which is processed and integrated with the conditional and unconditional inputs during the diffusion process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, Any]`
- **`config`**
    - A configuration string that specifies the particular layered diffusion model to use, aligning with the model's version and capabilities.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`weight`**
    - A weight factor that influences the extent to which the conditional input affects the diffusion process, allowing for fine-tuning of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model after the layered diffusion process, incorporating the conditional and unconditional inputs.
    - Python dtype: `ModelPatcher`
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The conditioning information used during the diffusion process, reflecting how the conditional inputs were integrated.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LayeredDiffusionCond:
    """Generate foreground + background given background / foreground.
    - FG => Blended
    - BG => Blended
    """

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "cond": ("CONDITIONING",),
                "uncond": ("CONDITIONING",),
                "latent": ("LATENT",),
                "config": ([c.config_string for c in s.MODELS],),
                "weight": (
                    "FLOAT",
                    {"default": 1.0, "min": -1, "max": 3, "step": 0.05},
                ),
            },
        }

    RETURN_TYPES = ("MODEL", "CONDITIONING", "CONDITIONING")
    FUNCTION = "apply_layered_diffusion"
    CATEGORY = "layer_diffuse"
    MODELS = (
        LayeredDiffusionBase(
            model_file_name="layer_xl_fg2ble.safetensors",
            model_url="https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_xl_fg2ble.safetensors",
            sd_version=StableDiffusionVersion.SDXL,
            cond_type=LayerType.FG,
        ),
        LayeredDiffusionBase(
            model_file_name="layer_xl_bg2ble.safetensors",
            model_url="https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_xl_bg2ble.safetensors",
            sd_version=StableDiffusionVersion.SDXL,
            cond_type=LayerType.BG,
        ),
    )

    def apply_layered_diffusion(
        self,
        model: ModelPatcher,
        cond,
        uncond,
        latent,
        config: str,
        weight: float,
    ):
        ld_model = [m for m in self.MODELS if m.config_string == config][0]
        assert get_model_sd_version(model) == ld_model.sd_version
        c_concat = model.model.latent_format.process_in(latent["samples"])
        return ld_model.apply_layered_diffusion(
            model, weight
        ) + ld_model.apply_c_concat(cond, uncond, c_concat)

```
