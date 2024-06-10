---
tags:
- DepthMap
- DepthMapEstimation
- Image
---

# Zoe Depth Anything
## Documentation
- Class name: `Zoe_DepthAnythingPreprocessor`
- Category: `ControlNet Preprocessors/Normal and Depth Estimators`
- Output node: `False`

This node preprocesses images for depth estimation by selecting and applying a depth estimation model based on the specified environment (indoor or outdoor). It leverages the ZoeDepthAnythingDetector model to generate depth maps, enhancing the understanding of spatial relationships in images.
## Input types
### Required
- **`image`**
    - The input image to be processed for depth estimation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`environment`**
    - Determines the choice of pretrained model for depth estimation, selecting between indoor and outdoor environments to optimize depth map accuracy.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - Specifies the resolution at which the depth estimation should be performed. Affects the output depth map's resolution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a depth map of the input image, providing a pixel-wise estimation of depth values.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Zoe_Depth_Anything_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            environment=(["indoor", "outdoor"], {"default": "indoor"})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Normal and Depth Estimators"

    def execute(self, image, environment, resolution=512, **kwargs):
        from controlnet_aux.zoe import ZoeDepthAnythingDetector
        ckpt_name = "depth_anything_metric_depth_indoor.pt" if environment == "indoor" else "depth_anything_metric_depth_outdoor.pt"
        model = ZoeDepthAnythingDetector.from_pretrained(filename=ckpt_name).to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution)
        del model
        return (out, )

```
