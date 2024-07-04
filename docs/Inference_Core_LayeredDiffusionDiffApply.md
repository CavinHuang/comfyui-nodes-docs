
# Documentation
- Class name: Inference_Core_LayeredDiffusionDiffApply
- Category: layer_diffuse
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Inference_Core_LayeredDiffusionDiffApply 节点专门用于将分层扩散过程应用于给定的模型，利用特定的配置和权重来修改模型的行为。它旨在通过集成扩散技术来增强或改变模型的输出，如果模型配置支持，还可以包括注意力共享机制。

# Input types
## Required
- model
    - 将要应用分层扩散过程的模型。这个参数至关重要，因为它决定了将要进行扩散过程的基础模型，从而影响最终输出。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher
- cond
    - 扩散过程的条件输入，用于指导扩散的方向和结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[List[List[torch.TensorType]]]
- uncond
    - 扩散过程的无条件输入，为扩散效果提供基准。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[List[List[torch.TensorType]]]
- blended_latent
    - 融合了条件和无条件输入特征的潜在表示，用于影响扩散过程。
    - Comfy dtype: LATENT
    - Python dtype: Optional[torch.TensorType]
- latent
    - 在应用扩散过程之前的模型原始潜在表示。
    - Comfy dtype: LATENT
    - Python dtype: torch.TensorType
- config
    - 指定用于分层扩散过程的配置字符串。这个配置决定了如何应用扩散，包括任何特定于模型的调整或优化。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- weight
    - 影响应用于模型的扩散过程强度的浮点值。它调整扩散对模型行为或输出的改变程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 应用分层扩散过程后的修改模型，反映了行为或输出的变化。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher
- conditioning
    - 在扩散过程中使用或生成的条件信息，可能影响模型的输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[List[List[torch.TensorType]]]


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
