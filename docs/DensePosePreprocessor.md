
# Documentation
- Class name: DensePosePreprocessor
- Category: ControlNet Preprocessors/Faces and Poses Estimators
- Output node: False

DensePosePreprocessor节点旨在从图像中估算出密集的人体姿态。它使用选定的DensePose模型和颜色映射对图像进行预处理，以生成详细的身体姿态估计。

# Input types
## Required
- image
    - 需要进行处理以估算密集姿态的输入图像。这是进行姿态估计的主要输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- model
    - 指定用于姿态估计的DensePose模型。模型的选择可能会影响姿态估计的准确性和性能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- cmap
    - 决定用于可视化姿态估计结果的颜色映射。不同的颜色映射可以提供不同的视觉清晰度和美感。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- resolution
    - 处理前将输入图像调整到的分辨率。更高的分辨率可能会导致更详细的姿态估计，但可能会增加处理时间。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出一个根据所选颜色映射可视化的密集姿态估计图像。
    - Comfy dtype: IMAGE
    - Python dtype: Tuple[torch.Tensor]


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
