---
tags:
- LayeredDiffusion
---

# Layer Diffuse Cond Joint Apply
## Documentation
- Class name: `LayeredDiffusionCondJointApply`
- Category: `layer_diffuse`
- Output node: `False`

This node specializes in applying conditional and joint layered diffusion processes to generate or modify images based on specific conditions and joint configurations. It leverages advanced diffusion techniques to blend and refine images, ensuring high-quality outputs tailored to the given conditions.
## Input types
### Required
- **`model`**
    - The model patcher used to apply the layered diffusion process, crucial for adapting the base model to specific configurations and conditions.
    - Comfy dtype: `MODEL`
    - Python dtype: `ModelPatcher`
- **`image`**
    - The image to be processed, serving as a base for the diffusion effects and transformations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Any`
- **`config`**
    - Configuration string specifying the layered diffusion model to use, critical for selecting the appropriate processing approach.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`cond`**
    - The conditional inputs guiding the diffusion process, essential for tailoring the output to specific requirements or contexts.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[List[List[torch.TensorType]]]`
- **`blended_cond`**
    - Blended conditional inputs, combining multiple conditions to enrich the diffusion process and enhance output quality.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[List[List[torch.TensorType]]]`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model after applying the layered diffusion process, reflecting the changes and enhancements made.
    - Python dtype: `Tuple[ModelPatcher]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LayeredDiffusionCondJoint:
    """Generate fg/bg + blended given fg/bg.
    - FG => Blended + BG
    - BG => Blended + FG
    """

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "image": ("IMAGE",),
                "config": ([c.config_string for c in s.MODELS],),
            },
            "optional": {
                "cond": ("CONDITIONING",),
                "blended_cond": ("CONDITIONING",),
            },
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "apply_layered_diffusion"
    CATEGORY = "layer_diffuse"
    MODELS = (
        LayeredDiffusionBase(
            model_file_name="layer_sd15_fg2bg.safetensors",
            model_url="https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_sd15_fg2bg.safetensors",
            sd_version=StableDiffusionVersion.SD1x,
            attn_sharing=True,
            frames=2,
            cond_type=LayerType.FG,
        ),
        LayeredDiffusionBase(
            model_file_name="layer_sd15_bg2fg.safetensors",
            model_url="https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_sd15_bg2fg.safetensors",
            sd_version=StableDiffusionVersion.SD1x,
            attn_sharing=True,
            frames=2,
            cond_type=LayerType.BG,
        ),
    )

    def apply_layered_diffusion(
        self,
        model: ModelPatcher,
        image,
        config: str,
        cond: Optional[List[List[torch.TensorType]]] = None,
        blended_cond: Optional[List[List[torch.TensorType]]] = None,
    ):
        ld_model = [m for m in self.MODELS if m.config_string == config][0]
        assert get_model_sd_version(model) == ld_model.sd_version
        assert ld_model.attn_sharing
        work_model = ld_model.apply_layered_diffusion_attn_sharing(
            model, control_img=image.movedim(-1, 1)
        )[0]
        work_model.model_options.setdefault("transformer_options", {})
        work_model.model_options["transformer_options"]["cond_overwrite"] = [
            cond[0][0] if cond is not None else None
            for cond in (
                cond,
                blended_cond,
            )
        ]
        return (work_model,)

```
