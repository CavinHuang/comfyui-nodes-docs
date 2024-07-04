
# Documentation
- Class name: MergeModels
- Category: Art Venture/Utils
- Output node: False

MergeModels节点旨在根据指定的比率将两个模型融合在一起，有效地合并它们的特征和功能。这个过程允许创建结合了两个输入模型的优势或属性的混合模型。

# Input types
## Required
- model1
    - 要合并的第一个模型。它作为基础模型，第二个模型的关键特征将根据指定的比率应用到这个模型上。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_base.Model
- model2
    - 要合并的第二个模型。这个模型的关键特征将应用到第一个模型上，其影响程度由比率决定。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_base.Model
- ratio
    - 一个浮点值，用于确定合并过程中两个模型之间的平衡。比率越接近1.0，第二个模型的特征在结果中的权重就越大。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 根据指定比率合并两个输入模型后得到的结果模型。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_base.Model


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilModelMerge:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model1": ("MODEL",),
                "model2": ("MODEL",),
                "ratio": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("MODEL",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "merge_models"

    def merge_models(self, model1, model2, ratio=1.0):
        m = model1.clone()
        kp = model2.get_key_patches("diffusion_model.")

        for k in kp:
            k_unet = k[len("diffusion_model.") :]
            if k_unet == "input_blocks.0.0.weight":
                w = kp[k][0]
                if w.shape[1] == 9:
                    w = w[:, 0:4, :, :]
                m.add_patches({k: (w,)}, 1.0 - ratio, ratio)
            else:
                m.add_patches({k: kp[k]}, 1.0 - ratio, ratio)

        return (m,)

```
