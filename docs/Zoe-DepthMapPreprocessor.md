
# Documentation
- Class name: Zoe-DepthMapPreprocessor
- Category: ControlNet Preprocessors/Normal and Depth Estimators
- Output node: False

Zoe-DepthMapPreprocessor节点用于利用Zoe Detector模型对图像进行深度图估计的预处理。它会调整输入图像的分辨率，并通过模型处理以生成深度图。生成的深度图可用于3D建模和场景理解等多种应用。

# Input types
## Required
- image
    - 用于深度图估计的输入图像。这是Zoe Detector模型分析并生成相应深度图的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- resolution
    - 指定处理前将输入图像调整至的分辨率。此参数允许标准化输入大小，以便在不同图像间进行一致的深度图估计。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 从输入图像生成的深度图。这个深度图提供了每个像素的深度估计，有助于理解场景的空间布局。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)



## Source code
```python
class Zoe_Depth_Map_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types()

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Normal and Depth Estimators"

    def execute(self, image, resolution=512, **kwargs):
        from controlnet_aux.zoe import ZoeDetector

        model = ZoeDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution)
        del model
        return (out, )

```
