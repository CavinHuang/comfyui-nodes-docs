---
tags:
- DepthMap
- DepthMapEstimation
- Image
- NormalMap
---

# [Inference.Core] BAE Normal Map
## Documentation
- Class name: `Inference_Core_BAE-NormalMapPreprocessor`
- Category: `ControlNet Preprocessors/Normal and Depth Estimators`
- Output node: `False`

This node is designed to preprocess images for normal map estimation using the BAE (Boundary Aware Estimator) model. It adjusts images to the required resolution and format before passing them through the BAE model to generate normal maps.
## Input types
### Required
- **`image`**
    - The input image to be processed for normal map estimation. It is the primary data that the node operates on, affecting the quality and accuracy of the output normal map.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution to which the input image should be resized before processing. This parameter influences the detail level of the output normal map.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output normal map generated from the input image, providing a detailed representation of surface normals.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BAE_Normal_Map_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types()

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Normal and Depth Estimators"

    def execute(self, image, resolution=512, **kwargs):
        from controlnet_aux.normalbae import NormalBaeDetector

        model = NormalBaeDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution)
        del model
        return (out,)

```
