---
tags:
- Animation
- PoseEstimation
---

# DensePose Estimator
## Documentation
- Class name: `DensePosePreprocessor`
- Category: `ControlNet Preprocessors/Faces and Poses Estimators`
- Output node: `False`

The DensePosePreprocessor node is designed to estimate dense human body poses from images. It preprocesses images using a selected DensePose model and color map to generate detailed body pose estimations.
## Input types
### Required
- **`image`**
    - The input image to be processed for dense pose estimation. This image is the primary input on which the pose estimation is performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`model`**
    - Specifies the DensePose model to be used for pose estimation. The choice of model can affect the accuracy and performance of the pose estimation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`cmap`**
    - Determines the color map used for visualizing the pose estimation results. Different color maps can provide varying visual clarity and aesthetic appeal.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`resolution`**
    - The resolution to which the input image is resized before processing. A higher resolution can lead to more detailed pose estimations but may increase processing time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Produces an image with the dense pose estimation visualized according to the selected color map.
    - Python dtype: `Tuple[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DensePose_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            model=(["densepose_r50_fpn_dl.torchscript", "densepose_r101_fpn_dl.torchscript"], {"default": "densepose_r50_fpn_dl.torchscript"}),
            cmap=(["Viridis (MagicAnimate)", "Parula (CivitAI)"], {"default": "Viridis (MagicAnimate)"})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Faces and Poses Estimators"

    def execute(self, image, model, cmap, resolution=512):
        from controlnet_aux.densepose import DenseposeDetector
        model = DenseposeDetector \
                    .from_pretrained(filename=model) \
                    .to(model_management.get_torch_device())
        return (common_annotator_call(model, image, cmap="viridis" if "Viridis" in cmap else "parula", resolution=resolution), )

```
