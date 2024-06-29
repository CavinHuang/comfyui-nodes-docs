---
tags:
- DepthMap
- DepthMapEstimation
- Image
---

# LeReS Depth Map (enable boost for leres++)
## Documentation
- Class name: `LeReS-DepthMapPreprocessor`
- Category: `ControlNet Preprocessors/Normal and Depth Estimators`
- Output node: `False`

The LeReS Depth Map Preprocessor node is designed for enhancing depth map estimations from images. It utilizes the LeReS model to preprocess images, offering options to remove nearest objects and background, and an optional boost mode for improved depth estimation.
## Input types
### Required
- **`image`**
    - The input image for which the depth map will be estimated and enhanced.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
### Optional
- **`rm_nearest`**
    - Specifies the threshold for removing the nearest objects from the depth map, enhancing focus on more distant elements.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rm_background`**
    - Defines the threshold for background removal in the depth map, aiding in the isolation of primary subjects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`boost`**
    - Enables an enhanced depth estimation mode, known as 'boost', for potentially improved depth map quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - Specifies the resolution at which the depth map estimation should be performed. Higher resolutions may improve detail but require more computational resources.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Produces an enhanced depth map image, with options for nearest object and background removal, and an enhanced mode for improved depth estimation.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)



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
