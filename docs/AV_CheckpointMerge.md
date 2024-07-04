
# Documentation
- Class name: AV_CheckpointMerge
- Category: Art Venture/Model Merging
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AV_CheckpointMerge节点旨在Art Venture框架内合并模型检查点。它抽象了将不同模型状态组合成统一检查点的复杂过程，以简化的方式促进了各种模型配置的集成或实验。

# Input types
## Required
- model1
    - 第一个要合并的模型，它对创建新的统一模型检查点做出贡献。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- model2
    - 第二个要合并的模型，它与第一个模型结合形成新的统一模型检查点。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- model1_weight
    - 第一个模型的权重因子，影响其对合并后的模型检查点的作用程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- model2_weight
    - 第二个模型的权重因子，影响其对合并后的模型检查点的作用程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 合并后的模型检查点，包含了两个输入模型的元素。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AVCheckpointMerge:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model1": ("MODEL",),
                "model2": ("MODEL",),
                "model1_weight": ("FLOAT", {"default": 1.0, "min": -1.0, "max": 1.0, "step": 0.01}),
                "model2_weight": ("FLOAT", {"default": 1.0, "min": -1.0, "max": 1.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "merge"

    CATEGORY = "Art Venture/Model Merging"

    def merge(self, model1, model2, model1_weight, model2_weight):
        m = model1.clone()
        k1 = model1.get_key_patches("diffusion_model.")
        k2 = model2.get_key_patches("diffusion_model.")
        for k in k1:
            if k in k2:
                a = k1[k][0]
                b = k2[k][0]

                if a.shape != b.shape and a.shape[0:1] + a.shape[2:] == b.shape[0:1] + b.shape[2:]:
                    if a.shape[1] == 4 and b.shape[1] == 9:
                        raise RuntimeError(
                            "When merging inpainting model with a normal one, model1 must be the inpainting model."
                        )
                    if a.shape[1] == 4 and b.shape[1] == 8:
                        raise RuntimeError(
                            "When merging instruct-pix2pix model with a normal one, model1 must be the instruct-pix2pix model."
                        )

                    c = torch.zeros_like(a)
                    c[:, 0:4, :, :] = b
                    b = c

                m.add_patches({k: (b,)}, model2_weight, model1_weight)
            else:
                logger.warn(f"Key {k} not found in model2")
                m.add_patches({k: k1[k]}, -1.0, 1.0)  # zero out

        return (m,)

```
