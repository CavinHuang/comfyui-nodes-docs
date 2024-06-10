---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# ToDetailerPipe
## Documentation
- Class name: `ToDetailerPipe`
- Category: `ImpactPack/Pipe`
- Output node: `False`

The ToDetailerPipe node is designed to transform various model components and configurations into a detailed pipeline format. It focuses on enhancing the specificity and impact of model outputs by incorporating additional conditioning and refinement processes.
## Input types
### Required
- **`model`**
    - The 'model' parameter represents the core model to be included in the detailer pipeline, serving as the foundation for further enhancements and conditioning.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`clip`**
    - The 'clip' parameter specifies the CLIP model to be used in conjunction with the main model for enhanced content understanding and generation.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`vae`**
    - The 'vae' parameter involves a Variational Autoencoder (VAE) model, which is used for generating or modifying content within the pipeline.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`positive`**
    - The 'positive' parameter is used for positive conditioning, influencing the model to generate content that aligns with specified positive attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - The 'negative' parameter is used for negative conditioning, guiding the model to avoid generating content with specified negative attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`bbox_detector`**
    - The 'bbox_detector' parameter specifies the bounding box detector model used for identifying specific areas within images for focused processing or analysis.
    - Comfy dtype: `BBOX_DETECTOR`
    - Python dtype: `str`
- **`wildcard`**
    - The 'wildcard' parameter allows for the inclusion of dynamic, user-defined text inputs that can influence the pipeline's processing and output generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Select to add LoRA`**
    - This parameter enables the selection of LoRA (Low-Rank Adaptation) techniques to be added to the text, enhancing the model's adaptability and performance on specific tasks.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`Select to add Wildcard`**
    - This parameter allows for the selection of predefined wildcard options to be added to the text, introducing variability and customization into the pipeline's output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
### Optional
- **`sam_model_opt`**
    - The 'sam_model_opt' parameter specifies an optional SAM (Sharpness-Aware Minimization) model to enhance the detailer pipeline's ability to generate sharp and clear images.
    - Comfy dtype: `SAM_MODEL`
    - Python dtype: `str`
- **`segm_detector_opt`**
    - The 'segm_detector_opt' parameter specifies an optional segmentation detector model used for identifying and segmenting specific parts of images for detailed processing.
    - Comfy dtype: `SEGM_DETECTOR`
    - Python dtype: `str`
- **`detailer_hook`**
    - The 'detailer_hook' parameter allows for the inclusion of custom processing hooks within the detailer pipeline, enabling tailored modifications or enhancements to the pipeline's operation.
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `str`
## Output types
- **`detailer_pipe`**
    - Comfy dtype: `DETAILER_PIPE`
    - The output 'detailer_pipe' represents the comprehensive pipeline configuration, including all model components and settings specified through the input parameters.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [FaceDetailerPipe](../../ComfyUI-Impact-Pack/Nodes/FaceDetailerPipe.md)
    - [FromDetailerPipe](../../ComfyUI-Impact-Pack/Nodes/FromDetailerPipe.md)



## Source code
```python
class ToDetailerPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "model": ("MODEL",),
                     "clip": ("CLIP",),
                     "vae": ("VAE",),
                     "positive": ("CONDITIONING",),
                     "negative": ("CONDITIONING",),
                     "bbox_detector": ("BBOX_DETECTOR", ),
                     "wildcard": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                     "Select to add LoRA": (["Select the LoRA to add to the text"] + folder_paths.get_filename_list("loras"),),
                     "Select to add Wildcard": (["Select the Wildcard to add to the text"], ),
                     },
                "optional": {
                    "sam_model_opt": ("SAM_MODEL",),
                    "segm_detector_opt": ("SEGM_DETECTOR",),
                    "detailer_hook": ("DETAILER_HOOK",),
                }}

    RETURN_TYPES = ("DETAILER_PIPE", )
    RETURN_NAMES = ("detailer_pipe", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Pipe"

    def doit(self, *args, **kwargs):
        pipe = (kwargs['model'], kwargs['clip'], kwargs['vae'], kwargs['positive'], kwargs['negative'], kwargs['wildcard'], kwargs['bbox_detector'],
                kwargs.get('segm_detector_opt', None), kwargs.get('sam_model_opt', None), kwargs.get('detailer_hook', None),
                kwargs.get('refiner_model', None), kwargs.get('refiner_clip', None),
                kwargs.get('refiner_positive', None), kwargs.get('refiner_negative', None))
        return (pipe, )

```
