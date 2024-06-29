---
tags:
- LayeredDiffusion
---

# [Inference.Core] Layer Diffuse Joint Apply
## Documentation
- Class name: `Inference_Core_LayeredDiffusionJointApply`
- Category: `layer_diffuse`
- Output node: `False`

This node is designed to apply a layered diffusion process to joint models, integrating multiple diffusion models or layers to generate or manipulate images in a cohesive manner. It leverages the strengths of each individual model layer to produce enhanced, high-quality outputs.
## Input types
### Required
- **`model`**
    - The model parameter represents the diffusion model to be applied. It is crucial for defining the specific diffusion process and its configuration, directly influencing the quality and characteristics of the output.
    - Comfy dtype: `MODEL`
    - Python dtype: `ModelPatcher`
- **`config`**
    - Config defines the configuration settings for the layered diffusion process, including model specifics and operational parameters, crucial for tailoring the diffusion to desired outcomes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`fg_cond`**
    - Foreground conditions specify the conditional inputs for the foreground of the diffusion process, guiding the generation or transformation of the output in the foreground areas.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[List[List[torch.Tensor]]]`
- **`bg_cond`**
    - Background conditions specify the conditional inputs for the background of the diffusion process, influencing the generation or transformation of the output in the background areas.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[List[List[torch.Tensor]]]`
- **`blended_cond`**
    - Blended conditions combine foreground and background conditions, providing a unified conditional input for the diffusion process across both areas.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[List[List[torch.Tensor]]]`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The output is a modified version of the input model, enhanced through the layered diffusion process to produce or transform images based on the provided conditions and configurations.
    - Python dtype: `ModelPatcher`
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
