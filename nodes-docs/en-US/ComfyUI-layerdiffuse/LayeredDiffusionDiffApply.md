---
tags:
- LayeredDiffusion
---

# Layer Diffuse Diff Apply
## Documentation
- Class name: `LayeredDiffusionDiffApply`
- Category: `layer_diffuse`
- Output node: `False`

This node applies a layered diffusion process to an input, leveraging a specific configuration and weight to modify the diffusion behavior. It is designed to integrate with a model patcher, facilitating the application of diffusion techniques in a controlled and customizable manner.
## Input types
### Required
- **`model`**
    - The model patcher instance used to apply the layered diffusion. It serves as the primary interface for modifying the model's behavior based on the specified configuration and weight.
    - Comfy dtype: `MODEL`
    - Python dtype: `ModelPatcher`
- **`cond`**
    - The conditional input used to guide the diffusion process, providing context or constraints.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[List[List[torch.TensorType]]]`
- **`uncond`**
    - The unconditional input that represents the baseline or default state for the diffusion process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[List[List[torch.TensorType]]]`
- **`blended_latent`**
    - A latent representation that combines elements of both conditional and unconditional inputs, used to influence the diffusion outcome.
    - Comfy dtype: `LATENT`
    - Python dtype: `Optional[Dict[str, torch.Tensor]]`
- **`latent`**
    - The initial latent representation of the input, serving as the starting point for the diffusion process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`config`**
    - A string identifier for the layered diffusion configuration to be applied. This determines the specific diffusion process and parameters to be used.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`weight`**
    - A float value that adjusts the intensity of the diffusion effect. Higher values result in more pronounced diffusion effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model after the layered diffusion process has been applied, reflecting the changes made.
    - Python dtype: `ModelPatcher`
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The conditioning information used during the diffusion process, which may include modified or additional context.
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
