---
tags:
- LayeredDiffusion
---

# [Inference.Core] Layer Diffuse Cond Apply
## Documentation
- Class name: `Inference_Core_LayeredDiffusionCondApply`
- Category: `layer_diffuse`
- Output node: `False`

This node specializes in applying conditional layered diffusion processes to input data, leveraging specific configurations and weights to modulate the diffusion effect. It integrates conditional inputs to guide the diffusion process, enhancing the generation or transformation of data with nuanced control.
## Input types
### Required
- **`model`**
    - The model to which the layered diffusion process will be applied, serving as the foundation for the diffusion modifications.
    - Comfy dtype: `MODEL`
    - Python dtype: `ModelPatcher`
- **`cond`**
    - The conditional inputs for the foreground, guiding the diffusion process to achieve specific visual effects or characteristics.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[List[List[torch.TensorType]]]`
- **`uncond`**
    - The unconditional inputs for the background, providing a baseline for the diffusion process and influencing the overall output.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[List[List[torch.TensorType]]]`
- **`latent`**
    - Latent representations used in the diffusion process, contributing to the generation or transformation of the output.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`config`**
    - Configuration string specifying the diffusion model and settings, crucial for determining the behavior of the diffusion process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`weight`**
    - A weight factor that influences the strength and characteristics of the diffusion effect applied to the model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Outputs a modified model that has undergone the conditional layered diffusion process, reflecting the applied conditions and adjustments.
    - Python dtype: `ModelPatcher`
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The conditioning information used during the diffusion process, indicating how the conditional inputs have influenced the output.
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
