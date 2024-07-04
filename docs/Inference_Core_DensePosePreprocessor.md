
# Documentation
- Class name: Inference_Core_DensePosePreprocessor
- Category: ControlNet Preprocessors/Faces and Poses Estimators
- Output node: False

DensePose预处理器节点旨在使用DensePose模型估计人体姿势并将其叠加在图像上。它支持不同的模型和颜色映射进行可视化，为姿势估计和可视化提供了灵活的方法。

# Input types
## Required
- image
    - 将在其上估计和可视化人体姿势的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- model
    - 指定用于姿势估计的DensePose模型。模型的选择可能会影响姿势估计的准确性和性能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- cmap
    - 决定用于可视化姿势估计结果的颜色映射。可以使用不同的颜色映射来增强姿势估计的视觉区分度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 在进行姿势估计之前将输入图像调整到的分辨率。影响姿势估计的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个估计并可视化了人体姿势的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DensePose_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            model=(["densepose_r50_fpn_dl.torchscript", "densepose_r101_fpn_dl.torchscript"], {"default": "densepose_r50_fpn_dl.torchscript"}),
            cmap=(["Viridis (MagicAnimate)", "Parula (CivitAI)"], {"default": "Viridis (MagicAnimate)"})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Faces and Poses Estimators"

    def execute(self, image, model, cmap, resolution=512):
        from controlnet_aux.densepose import DenseposeDetector
        model = DenseposeDetector \
                    .from_pretrained(filename=model) \
                    .to(model_management.get_torch_device())
        return (common_annotator_call(model, image, cmap="viridis" if "Viridis" in cmap else "parula", resolution=resolution), )

```
