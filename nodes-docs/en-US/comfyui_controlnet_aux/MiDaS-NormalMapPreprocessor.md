---
tags:
- DepthMap
- DepthMapEstimation
- Image
---

# MiDaS Normal Map
## Documentation
- Class name: `MiDaS-NormalMapPreprocessor`
- Category: `ControlNet Preprocessors/Normal and Depth Estimators`
- Output node: `False`

The MiDaS-NormalMapPreprocessor node is designed for generating normal maps from images using the MiDaS model. It preprocesses images to enhance depth estimation, facilitating the creation of detailed normal maps that can be used for various applications such as 3D modeling and augmented reality.
## Input types
### Required
- **`image`**
    - The 'image' parameter is the input image for which the normal map will be generated, serving as the basis for depth estimation and normal map creation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
### Optional
- **`a`**
    - The 'a' parameter adjusts the intensity of the depth estimation, influencing the contrast and detail in the generated normal map.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bg_threshold`**
    - The 'bg_threshold' parameter sets the threshold for background separation, helping to isolate the subject from the background in the depth estimation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resolution`**
    - The 'resolution' parameter specifies the resolution at which the depth estimation and normal map generation will be performed, affecting the detail level of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image representing the normal map generated from the input image, providing detailed surface orientation information.
    - Python dtype: `numpy.ndarray`
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
