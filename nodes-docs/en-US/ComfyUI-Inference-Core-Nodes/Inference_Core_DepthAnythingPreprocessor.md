---
tags:
- DepthMap
- DepthMapEstimation
- Image
---

# [Inference.Core] Depth Anything
## Documentation
- Class name: `Inference_Core_DepthAnythingPreprocessor`
- Category: `ControlNet Preprocessors/Normal and Depth Estimators`
- Output node: `False`

The Inference_Core_DepthAnythingPreprocessor node is designed to preprocess images for depth estimation tasks, utilizing different models based on the context (e.g., indoor vs. outdoor environments or specific model checkpoints). It abstracts the complexity of model selection and preprocessing steps, providing a streamlined interface for depth estimation.
## Input types
### Required
- **`image`**
    - The input image to be processed for depth estimation. This image is the primary input on which the depth estimation model operates.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`ckpt_name`**
    - The name of the checkpoint file for the depth estimation model. This parameter allows for the selection of different pretrained models to tailor the depth estimation process to specific requirements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - Specifies the resolution at which the depth estimation should be performed, affecting the quality and detail of the output depth map.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image representing the estimated depth map of the input image, providing a visual representation of depth information.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Depth_Anything_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            ckpt_name=(["depth_anything_vitl14.pth", "depth_anything_vitb14.pth", "depth_anything_vits14.pth"], {"default": "depth_anything_vitl14.pth"})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Normal and Depth Estimators"

    def execute(self, image, ckpt_name, resolution=512, **kwargs):
        from controlnet_aux.depth_anything import DepthAnythingDetector

        model = DepthAnythingDetector.from_pretrained(filename=ckpt_name).to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution)
        del model
        return (out, )

```
