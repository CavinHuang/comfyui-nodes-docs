---
tags:
- DepthMap
- DepthMapEstimation
- Image
---

# [Inference.Core] Zoe Depth Map
## Documentation
- Class name: `Inference_Core_Zoe-DepthMapPreprocessor`
- Category: `ControlNet Preprocessors/Normal and Depth Estimators`
- Output node: `False`

The Zoe Depth Map Preprocessor node is designed to process images to estimate depth maps using the ZoeDepth model. It leverages pretrained models to generate depth estimations, enhancing the understanding of spatial relationships in images for various applications.
## Input types
### Required
- **`image`**
    - The input image for which the depth map is to be estimated. This image is processed by the ZoeDepth model to generate a depth estimation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - The resolution parameter specifies the desired output resolution of the depth map. It allows for adjusting the detail level of the depth estimation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a depth map of the input image, providing a pixel-wise depth estimation.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


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
