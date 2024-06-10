---
tags:
- LayeredDiffusion
---

# Layer Diffuse Joint Apply
## Documentation
- Class name: `LayeredDiffusionJointApply`
- Category: `layer_diffuse`
- Output node: `False`

This node applies a joint layered diffusion process to generate or modify images, leveraging a combination of conditional and unconditional inputs to enhance the quality and relevance of the output. It integrates multiple diffusion models to process and blend latent representations, facilitating nuanced image synthesis or transformation.
## Input types
### Required
- **`model`**
    - The model patcher that configures and applies the diffusion models, acting as the intermediary for executing the layered diffusion process.
    - Comfy dtype: `MODEL`
    - Python dtype: `ModelPatcher`
- **`config`**
    - Configuration string that specifies the particular diffusion model to be used, ensuring compatibility and optimal performance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`fg_cond`**
    - Foreground conditional inputs that guide the diffusion process towards generating images with specific foreground characteristics.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[List[List[torch.TensorType]]]`
- **`bg_cond`**
    - Background conditional inputs that influence the diffusion process to generate images with specific background characteristics.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[List[List[torch.TensorType]]]`
- **`blended_cond`**
    - Blended conditional inputs that combine foreground and background characteristics, enriching the diffusion process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[List[List[torch.TensorType]]]`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model after applying the layered diffusion process, ready for further image generation or transformation tasks.
    - Python dtype: `Tuple[ModelPatcher]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LayeredDiffusionJoint:
    """Generate FG + BG + Blended in one inference batch. Batch size = 3N."""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "config": ([c.config_string for c in s.MODELS],),
            },
            "optional": {
                "fg_cond": ("CONDITIONING",),
                "bg_cond": ("CONDITIONING",),
                "blended_cond": ("CONDITIONING",),
            },
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "apply_layered_diffusion"
    CATEGORY = "layer_diffuse"
    MODELS = (
        LayeredDiffusionBase(
            model_file_name="layer_sd15_joint.safetensors",
            model_url="https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_sd15_joint.safetensors",
            sd_version=StableDiffusionVersion.SD1x,
            attn_sharing=True,
            frames=3,
        ),
    )

    def apply_layered_diffusion(
        self,
        model: ModelPatcher,
        config: str,
        fg_cond: Optional[List[List[torch.TensorType]]] = None,
        bg_cond: Optional[List[List[torch.TensorType]]] = None,
        blended_cond: Optional[List[List[torch.TensorType]]] = None,
    ):
        ld_model = [m for m in self.MODELS if m.config_string == config][0]
        assert get_model_sd_version(model) == ld_model.sd_version
        assert ld_model.attn_sharing
        work_model = ld_model.apply_layered_diffusion_attn_sharing(model)[0]
        work_model.model_options.setdefault("transformer_options", {})
        work_model.model_options["transformer_options"]["cond_overwrite"] = [
            cond[0][0] if cond is not None else None
            for cond in (
                fg_cond,
                bg_cond,
                blended_cond,
            )
        ]
        return (work_model,)

```
