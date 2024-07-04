
# Documentation
- Class name: Inference_Core_LayeredDiffusionJointApply
- Category: layer_diffuse
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Inference_Core_LayeredDiffusionJointApply节点旨在将分层扩散过程应用于联合模型，整合多个扩散模型或层以协调一致的方式生成或操作图像。它利用每个单独模型层的优势来产生增强的、高质量的输出。

# Input types
## Required
- model
    - model参数代表要应用的扩散模型。它对于定义特定的扩散过程及其配置至关重要，直接影响输出的质量和特征。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher
- config
    - config定义了分层扩散过程的配置设置，包括模型细节和操作参数，对于根据所需结果定制扩散过程至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- fg_cond
    - 前景条件指定扩散过程前景的条件输入，指导输出在前景区域的生成或转换。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[List[List[torch.Tensor]]]
- bg_cond
    - 背景条件指定扩散过程背景的条件输入，影响输出在背景区域的生成或转换。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[List[List[torch.Tensor]]]
- blended_cond
    - 混合条件将前景和背景条件结合，为扩散过程提供跨两个区域的统一条件输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[List[List[torch.Tensor]]]

# Output types
- model
    - 输出是输入模型的修改版本，通过分层扩散过程得到增强，以根据提供的条件和配置生成或转换图像。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher


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
