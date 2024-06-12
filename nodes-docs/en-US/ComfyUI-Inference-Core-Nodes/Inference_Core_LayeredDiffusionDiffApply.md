---
tags:
- LayeredDiffusion
---

# [Inference.Core] Layer Diffuse Diff Apply
## Documentation
- Class name: `Inference_Core_LayeredDiffusionDiffApply`
- Category: `layer_diffuse`
- Output node: `False`

This node specializes in applying a layered diffusion process to a given model, leveraging specific configurations and weights to modify the model's behavior. It is designed to enhance or alter the model's output by integrating diffusion techniques, which can include attention sharing mechanisms if supported by the model configuration.
## Input types
### Required
- **`model`**
    - The model to which the layered diffusion process will be applied. This parameter is crucial as it determines the base model that will undergo the diffusion process, affecting the final output.
    - Comfy dtype: `MODEL`
    - Python dtype: `ModelPatcher`
- **`cond`**
    - The conditional input for the diffusion process, which guides the diffusion direction and outcome.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[List[List[torch.TensorType]]]`
- **`uncond`**
    - The unconditional input for the diffusion process, providing a baseline for the diffusion effect.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[List[List[torch.TensorType]]]`
- **`blended_latent`**
    - A latent representation that combines aspects of both conditional and unconditional inputs, used to influence the diffusion process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Optional[torch.TensorType]`
- **`latent`**
    - The original latent representation of the model before the diffusion process is applied.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.TensorType`
- **`config`**
    - A string specifying the configuration to use for the layered diffusion process. This configuration determines how the diffusion is applied, including any model-specific adjustments or optimizations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`weight`**
    - A float value that influences the intensity of the diffusion process applied to the model. It adjusts how significantly the diffusion alters the model's behavior or output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model after the layered diffusion process has been applied, reflecting changes in behavior or output.
    - Python dtype: `ModelPatcher`
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The conditioning information used or generated during the diffusion process, which can influence the model's output.
    - Python dtype: `Optional[List[List[torch.TensorType]]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LayeredDiffusionDiff:
    """Extract FG/BG from blended image.
    - Blended + FG => BG
    - Blended + BG => FG
    """

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "cond": ("CONDITIONING",),
                "uncond": ("CONDITIONING",),
                "blended_latent": ("LATENT",),
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
            model_file_name="layer_xl_fgble2bg.safetensors",
            model_url="https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_xl_fgble2bg.safetensors",
            sd_version=StableDiffusionVersion.SDXL,
            cond_type=LayerType.FG,
        ),
        LayeredDiffusionBase(
            model_file_name="layer_xl_bgble2fg.safetensors",
            model_url="https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_xl_bgble2fg.safetensors",
            sd_version=StableDiffusionVersion.SDXL,
            cond_type=LayerType.BG,
        ),
    )

    def apply_layered_diffusion(
        self,
        model: ModelPatcher,
        cond,
        uncond,
        blended_latent,
        latent,
        config: str,
        weight: float,
    ):
        ld_model = [m for m in self.MODELS if m.config_string == config][0]
        assert get_model_sd_version(model) == ld_model.sd_version
        c_concat = model.model.latent_format.process_in(
            torch.cat([latent["samples"], blended_latent["samples"]], dim=1)
        )
        return ld_model.apply_layered_diffusion(
            model, weight
        ) + ld_model.apply_c_concat(cond, uncond, c_concat)

```
