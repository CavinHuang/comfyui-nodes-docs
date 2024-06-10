---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# Diffusion Edge (batch size ↑ => speed ↑, VRAM ↑)
## Documentation
- Class name: `DiffusionEdge_Preprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The DiffusionEdge_Preprocessor node is designed for preprocessing images to extract edge maps using a diffusion-based edge detection model. It supports environment-specific model loading and adjustable patch processing for optimized performance.
## Input types
### Required
- **`image`**
    - The input image to be processed for edge detection.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
### Optional
- **`environment`**
    - Specifies the environment context ('indoor', 'urban', 'natural') for the edge detection model, influencing the model's behavior and output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`patch_batch_size`**
    - Determines the batch size for processing image patches, affecting the speed and VRAM usage of the edge detection operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resolution`**
    - The resolution to which the input image is resized before edge detection, affecting the detail level of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image representing the detected edges within the input image, suitable for further processing or visualization.
    - Python dtype: `PIL.Image`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DiffusionEdge_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            environment=(["indoor", "urban", "natrual"], {"default": "indoor"}),
            patch_batch_size=("INT", {"default": 4, "min": 1, "max": 16})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, environment="indoor", patch_batch_size=4, resolution=512, **kwargs):
        install_deps()
        from controlnet_aux.diffusion_edge import DiffusionEdgeDetector

        model = DiffusionEdgeDetector \
            .from_pretrained(filename = f"diffusion_edge_{environment}.pt") \
            .to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution, patch_batch_size=patch_batch_size)
        del model
        return (out, )

```
