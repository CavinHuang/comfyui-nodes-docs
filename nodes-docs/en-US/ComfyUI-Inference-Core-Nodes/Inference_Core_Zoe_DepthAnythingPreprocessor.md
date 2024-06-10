---
tags:
- DepthMap
- DepthMapEstimation
- Image
---

# [Inference.Core] Zoe Depth Anything
## Documentation
- Class name: `Inference_Core_Zoe_DepthAnythingPreprocessor`
- Category: `ControlNet Preprocessors/Normal and Depth Estimators`
- Output node: `False`

This node preprocesses images for depth estimation by adapting them based on the specified environment (indoor or outdoor) using the Zoe Depth Anything Detector model. It aims to enhance depth estimation tasks by preprocessing images with a model specifically trained for different environments.
## Input types
### Required
- **`image`**
    - The image to be processed for depth estimation. It serves as the primary input for the depth estimation preprocessing task.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`environment`**
    - Specifies the environment context (indoor or outdoor) for the image, which influences the choice of pretrained model for depth estimation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - The target resolution for the output image, affecting the detail level of the depth estimation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with enhanced features for depth estimation, ready for further analysis or use.
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
