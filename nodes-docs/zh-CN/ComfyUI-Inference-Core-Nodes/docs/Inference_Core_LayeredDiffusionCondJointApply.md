
# Documentation
- Class name: Inference_Core_LayeredDiffusionCondJointApply
- Category: layer_diffuse
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点专门用于应用条件和联合分层扩散过程，以基于一组条件和联合配置生成或操作图像。它集成了多个扩散模型，以实现复杂的图像合成或转换任务，利用条件输入和联合模型动态。

# Input types
## Required
- model
    - 用于应用分层扩散技术的模型修补器，对于与扩散过程的集成至关重要。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher
- image
    - 扩散过程的目标图像，作为转换或合成的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- config
    - 决定使用特定分层扩散模型和设置的配置字符串。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- cond
    - 扩散过程的可选条件输入，允许进行有针对性的图像操作或生成。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[List[List[torch.Tensor]]]
- blended_cond
    - 可选的混合条件输入，通过组合条件实现更复杂的图像合成。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[List[List[torch.Tensor]]]

# Output types
- model
    - 输出应用分层扩散过程后的模型，配备了用于图像合成或转换的修改。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher


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
