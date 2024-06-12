---
tags:
- DepthMap
- DepthMapEstimation
- Image
---

# [Inference.Core] LeReS Depth Map (enable boost for leres++)
## Documentation
- Class name: `Inference_Core_LeReS-DepthMapPreprocessor`
- Category: `ControlNet Preprocessors/Normal and Depth Estimators`
- Output node: `False`

The Inference_Core_LeReS-DepthMapPreprocessor node is designed for preprocessing images to generate depth maps using the LeReS algorithm. It enhances image depth perception by optionally boosting the depth estimation process and applying specific adjustments to remove nearest objects or background, aiming to improve the depth quality for further processing or visualization.
## Input types
### Required
- **`image`**
    - The input image to be processed for depth map generation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
### Optional
- **`rm_nearest`**
    - Specifies the threshold for removing the nearest objects in the depth map, enhancing the focus on more distant elements.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rm_background`**
    - Defines the threshold for background removal in the depth map, helping to isolate the main subjects from their surroundings.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`boost`**
    - Enables or disables the boost mode for depth estimation, where 'enable' significantly enhances the depth map details.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - The resolution at which the depth map should be generated, affecting the detail level of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed depth map image, optimized for further computational tasks or visualization.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LERES_Depth_Map_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            rm_nearest=("FLOAT", {"default": 0.0, "min": 0.0, "max": 100, "step": 0.1}),
            rm_background=("FLOAT", {"default": 0.0, "min": 0.0, "max": 100, "step": 0.1}),
            boost=(["enable", "disable"], {"default": "disable"})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Normal and Depth Estimators"

    def execute(self, image, rm_nearest, rm_background, resolution=512, **kwargs):
        from controlnet_aux.leres import LeresDetector

        model = LeresDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution, thr_a=rm_nearest, thr_b=rm_background, boost=kwargs["boost"] == "enable")
        del model
        return (out, )

```
