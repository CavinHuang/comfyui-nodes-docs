---
tags:
- DepthMap
- DepthMapEstimation
- Image
---

# [Inference.Core] MiDaS Normal Map
## Documentation
- Class name: `Inference_Core_MiDaS-NormalMapPreprocessor`
- Category: `ControlNet Preprocessors/Normal and Depth Estimators`
- Output node: `False`

This node is designed to preprocess images for normal map estimation using the MiDaS model. It adjusts images based on specified parameters to enhance the quality of normal map generation, facilitating improved depth perception in visual content.
## Input types
### Required
- **`image`**
    - The input image to be processed for normal map estimation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`a`**
    - The 'a' parameter influences the intensity of the normal map effect, allowing for fine-tuning of the depth estimation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bg_threshold`**
    - The 'bg_threshold' parameter sets the sensitivity for background detection, aiding in distinguishing foreground elements from the background in the depth estimation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resolution`**
    - Specifies the resolution for the output normal map, affecting the level of detail in the depth estimation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Produces an image that represents the estimated normal map, enhancing depth perception in visual content.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MIDAS_Normal_Map_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            a =  ("FLOAT", {"default": np.pi * 2.0, "min": 0.0, "max": np.pi * 5.0, "step": 0.05}),
            bg_threshold = ("FLOAT", {"default": 0.1, "min": 0, "max": 1, "step": 0.05})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Normal and Depth Estimators"

    def execute(self, image, a, bg_threshold, resolution=512, **kwargs):
        from controlnet_aux.midas import MidasDetector

        model = MidasDetector.from_pretrained().to(model_management.get_torch_device())
        #Dirty hack :))
        cb = lambda image, **kargs: model(image, **kargs)[1]
        out = common_annotator_call(cb, image, resolution=resolution, a=a, bg_th=bg_threshold, depth_and_normal=True)
        del model
        return (out, )

```
