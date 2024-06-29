---
tags:
- DepthMap
- DepthMapEstimation
- Image
---

# MiDaS Depth Map
## Documentation
- Class name: `MiDaS-DepthMapPreprocessor`
- Category: `ControlNet Preprocessors/Normal and Depth Estimators`
- Output node: `False`

This node preprocesses images to generate depth maps using the MiDaS model, enhancing the perception of depth in images for further processing or visualization.
## Input types
### Required
- **`image`**
    - The 'image' parameter is the input image to be processed for depth map generation, serving as the primary data for depth estimation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
### Optional
- **`a`**
    - The 'a' parameter adjusts the depth estimation sensitivity, influencing the depth map's perception of distance and depth.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bg_threshold`**
    - The 'bg_threshold' parameter sets the threshold for background separation, aiding in distinguishing between foreground and background elements in the depth map.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resolution`**
    - The 'resolution' parameter specifies the resolution at which the depth map should be generated, affecting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image representing the depth map, where pixel intensity corresponds to the estimated depth from the camera perspective.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [CR Multi-ControlNet Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Multi-ControlNet Stack.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - Reroute
    - [Control Net Stacker](../../efficiency-nodes-comfyui/Nodes/Control Net Stacker.md)



## Source code
```python
class MIDAS_Depth_Map_Preprocessor:
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

        # Ref: https://github.com/lllyasviel/ControlNet/blob/main/gradio_depth2image.py
        model = MidasDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution, a=a, bg_th=bg_threshold)
        del model
        return (out, )

```
