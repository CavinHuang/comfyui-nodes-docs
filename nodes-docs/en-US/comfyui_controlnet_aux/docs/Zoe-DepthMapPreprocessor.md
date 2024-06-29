---
tags:
- DepthMap
- DepthMapEstimation
- Image
---

# Zoe Depth Map
## Documentation
- Class name: `Zoe-DepthMapPreprocessor`
- Category: `ControlNet Preprocessors/Normal and Depth Estimators`
- Output node: `False`

This node is designed to preprocess images for depth map estimation using the Zoe Detector model. It adjusts the input image's resolution and processes it through the model to generate a depth map, which can be utilized for various applications such as 3D modeling and scene understanding.
## Input types
### Required
- **`image`**
    - The input image to be processed for depth map estimation. This image is the primary input for the Zoe Detector model to analyze and generate the corresponding depth map.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution to which the input image should be resized before processing. This parameter allows for standardizing the input size for consistent depth map estimation across different images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output depth map generated from the input image. This depth map provides a per-pixel estimation of depth, useful for understanding the scene's spatial layout.
    - Python dtype: `torch.Tensor`
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
