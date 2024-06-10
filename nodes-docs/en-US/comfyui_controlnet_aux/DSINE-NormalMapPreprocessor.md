---
tags:
- DepthMap
- DepthMapEstimation
- Image
- NormalMap
---

# DSINE Normal Map
## Documentation
- Class name: `DSINE-NormalMapPreprocessor`
- Category: `ControlNet Preprocessors/Normal and Depth Estimators`
- Output node: `False`

The DSINE Normal Map Preprocessor node is designed to preprocess images for normal map generation using the DSINE model. It adjusts the field of view and iteration parameters to optimize the model's performance for generating detailed normal maps from input images.
## Input types
### Required
- **`image`**
    - The image input is the target for normal map generation, serving as the base for the model to apply its processing and generate the normal map.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`fov`**
    - The field of view parameter adjusts the perspective from which the normal map is generated, affecting the depth perception and detail in the resulting image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`iterations`**
    - The iterations parameter controls the number of refinement steps the model performs, impacting the accuracy and detail of the generated normal map.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resolution`**
    - The resolution parameter specifies the output resolution of the generated normal map, affecting the level of detail and clarity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a normal map image, which visually represents surface normals as colors, providing detailed information about the surface geometry of the input image.
    - Python dtype: `Tuple[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DSINE_Normal_Map_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            fov=("FLOAT", {"min": 0.0, "max": 365.0, "step": 0.05, "default": 60.0}),
            iterations=("INT", {"min": 1, "max": 20, "step": 1, "default": 5})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Normal and Depth Estimators"

    def execute(self, image, fov, iterations, resolution=512, **kwargs):
        from controlnet_aux.dsine import DsineDetector

        model = DsineDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, fov=fov, iterations=iterations, resolution=resolution)
        del model
        return (out,)

```
