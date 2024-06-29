---
tags:
- DepthMap
- DepthMapEstimation
- Image
- NormalMap
---

# BAE Normal Map
## Documentation
- Class name: `BAE-NormalMapPreprocessor`
- Category: `ControlNet Preprocessors/Normal and Depth Estimators`
- Output node: `False`

The BAE-NormalMapPreprocessor node is designed for preprocessing images to generate normal maps using the BAE (Boundary Aware Encoder) model. It enhances images for further processing or visualization by estimating surface normals.
## Input types
### Required
- **`image`**
    - The input image to be processed for normal map generation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - The resolution to which the input image is resized before processing. It affects the detail level of the generated normal map.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output normal map generated from the input image, providing an estimation of surface normals.
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
