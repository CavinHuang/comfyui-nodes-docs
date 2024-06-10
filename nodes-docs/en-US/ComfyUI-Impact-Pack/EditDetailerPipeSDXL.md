---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# Edit DetailerPipe (SDXL)
## Documentation
- Class name: `EditDetailerPipeSDXL`
- Category: `ImpactPack/Pipe`
- Output node: `False`

The EditDetailerPipeSDXL node is designed to enhance and refine the details of inputs through a sophisticated editing pipeline. It allows for the integration of various models and techniques, including LoRA and Wildcards, to achieve more precise and impactful modifications.
## Input types
### Required
- **`detailer_pipe`**
    - Represents the initial detailer pipeline to be enhanced or modified. It serves as the foundation for further refinements.
    - Comfy dtype: `DETAILER_PIPE`
    - Python dtype: `tuple`
- **`wildcard`**
    - Allows for dynamic text input that can be used to modify or influence the detailer pipeline in a flexible manner.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Select to add LoRA`**
    - Provides a selection mechanism for integrating LoRA (Low-Rank Adaptation) techniques into the text, enhancing its detail and specificity.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`Select to add Wildcard`**
    - Enables the selection of predefined Wildcards to be added to the text, offering additional customization and detail enhancement.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
### Optional
- **`model`**
    - Specifies the model to be used in the detailer pipeline, contributing to the enhancement process.
    - Comfy dtype: `MODEL`
    - Python dtype: `MODEL`
- **`clip`**
    - Defines the CLIP model to be integrated into the pipeline for improved content understanding and manipulation.
    - Comfy dtype: `CLIP`
    - Python dtype: `CLIP`
- **`vae`**
    - Specifies the VAE model to be used for generating or modifying content within the pipeline.
    - Comfy dtype: `VAE`
    - Python dtype: `VAE`
- **`positive`**
    - Defines positive conditioning to guide the generation or modification process towards desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `CONDITIONING`
- **`negative`**
    - Specifies negative conditioning to steer the generation or modification process away from undesired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `CONDITIONING`
- **`refiner_model`**
    - Specifies an additional model for refining the details further in the pipeline.
    - Comfy dtype: `MODEL`
    - Python dtype: `MODEL`
- **`refiner_clip`**
    - Defines an additional CLIP model for enhanced content understanding and manipulation in the refinement process.
    - Comfy dtype: `CLIP`
    - Python dtype: `CLIP`
- **`refiner_positive`**
    - Defines additional positive conditioning for the refinement process, enhancing desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `CONDITIONING`
- **`refiner_negative`**
    - Specifies additional negative conditioning for the refinement process, avoiding undesired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `CONDITIONING`
- **`bbox_detector`**
    - Specifies a bounding box detector to be used for object detection and localization within the pipeline.
    - Comfy dtype: `BBOX_DETECTOR`
    - Python dtype: `BBOX_DETECTOR`
- **`sam_model`**
    - Specifies a SAM model to be integrated for semantic adjustment or manipulation within the pipeline.
    - Comfy dtype: `SAM_MODEL`
    - Python dtype: `SAM_MODEL`
- **`segm_detector`**
    - Defines a segmentation detector to be used for segmenting different parts or objects within the content.
    - Comfy dtype: `SEGM_DETECTOR`
    - Python dtype: `SEGM_DETECTOR`
- **`detailer_hook`**
    - Provides a hook for custom detailer functions or modifications to be applied within the pipeline.
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `DETAILER_HOOK`
## Output types
- **`detailer_pipe`**
    - Comfy dtype: `DETAILER_PIPE`
    - Outputs the enhanced detailer pipeline, incorporating all specified models, techniques, and modifications.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class EditDetailerPipeSDXL(EditDetailerPipe):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "detailer_pipe": ("DETAILER_PIPE",),
                "wildcard": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                "Select to add LoRA": (["Select the LoRA to add to the text"] + folder_paths.get_filename_list("loras"),),
                "Select to add Wildcard": (["Select the Wildcard to add to the text"],),
            },
            "optional": {
                "model": ("MODEL",),
                "clip": ("CLIP",),
                "vae": ("VAE",),
                "positive": ("CONDITIONING",),
                "negative": ("CONDITIONING",),
                "refiner_model": ("MODEL",),
                "refiner_clip": ("CLIP",),
                "refiner_positive": ("CONDITIONING",),
                "refiner_negative": ("CONDITIONING",),
                "bbox_detector": ("BBOX_DETECTOR",),
                "sam_model": ("SAM_MODEL",),
                "segm_detector": ("SEGM_DETECTOR",),
                "detailer_hook": ("DETAILER_HOOK",),
            },
        }

```
